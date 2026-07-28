package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.BookingRequest;
import com.globalco.propertyrental.dto.BookingResponse;
import com.globalco.propertyrental.dto.BookingStatusRequest;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.entity.Booking;
import com.globalco.propertyrental.entity.BookingStatus;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ForbiddenActionException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.BookingMapper;
import com.globalco.propertyrental.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final PropertyService propertyService;
    private final UserService userService;
    private final BookingMapper bookingMapper;
    private final NotificationService notificationService;

    @Transactional
    public BookingResponse requestVisit(BookingRequest request, String tenantEmail) {
        User tenant = userService.findByEmail(tenantEmail);
        Property property = propertyService.findProperty(request.propertyId());
        if (property.getOwner().getEmail().equals(tenantEmail)) {
            throw new BadRequestException("Owners cannot book visits for their own properties");
        }
        Booking booking = bookingRepository.save(Booking.builder()
                .tenant(tenant)
                .property(property)
                .preferredDate(request.preferredDate())
                .preferredTime(request.preferredTime())
                .status(BookingStatus.PENDING)
                .build());
        notificationService.create(property.getOwner(), "New visit request", tenant.getFullName() + " requested a visit for " + property.getTitle(), "NEW_BOOKING");
        return bookingMapper.toResponse(booking);
    }

    @Transactional(readOnly = true)
    public PageResponse<BookingResponse> tenantHistory(String tenantEmail, Pageable pageable) {
        return toPageResponse(bookingRepository.findByTenant_EmailOrderByCreatedAtDesc(tenantEmail, pageable));
    }

    @Transactional(readOnly = true)
    public PageResponse<BookingResponse> ownerRequests(String ownerEmail, Pageable pageable) {
        return toPageResponse(bookingRepository.findByProperty_Owner_EmailOrderByCreatedAtDesc(ownerEmail, pageable));
    }

    @Transactional(readOnly = true)
    public PageResponse<BookingResponse> allBookings(Pageable pageable) {
        return toPageResponse(bookingRepository.findAll(pageable));
    }

    @Transactional
    public BookingResponse cancel(Long id, String tenantEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getTenant().getEmail().equals(tenantEmail)) {
            throw new ForbiddenActionException("You can only cancel your own booking");
        }
        if (booking.getStatus() == BookingStatus.COMPLETED || booking.getStatus() == BookingStatus.REJECTED) {
            throw new BadRequestException("This booking can no longer be cancelled");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        notificationService.create(booking.getProperty().getOwner(), "Visit cancelled", tenantEmail + " cancelled a visit request.", "BOOKING_CANCELLED");
        return bookingMapper.toResponse(booking);
    }

    @Transactional
    public BookingResponse updateStatus(Long id, BookingStatusRequest request, String actorEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        User actor = userService.findByEmail(actorEmail);
        ensureCanUpdate(booking, actor);
        BookingStatus status = BookingStatus.valueOf(request.status().trim().toUpperCase(Locale.ROOT));
        if (status == BookingStatus.CANCELLED) {
            throw new BadRequestException("Use the cancel endpoint for tenant cancellations");
        }
        booking.setStatus(status);
        booking.setOwnerNote(request.ownerNote());
        String type = "BOOKING_" + status.name();
        notificationService.create(booking.getTenant(), "Booking " + status.name().toLowerCase(Locale.ROOT), "Your visit request for " + booking.getProperty().getTitle() + " is now " + status.name().toLowerCase(Locale.ROOT) + ".", type);
        return bookingMapper.toResponse(booking);
    }

    private void ensureCanUpdate(Booking booking, User actor) {
        boolean admin = actor.getRoles().stream().anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN);
        if (!admin && !booking.getProperty().getOwner().getId().equals(actor.getId())) {
            throw new ForbiddenActionException("Only the property owner or an admin can update this booking");
        }
    }

    private PageResponse<BookingResponse> toPageResponse(Page<Booking> page) {
        return new PageResponse<>(
                page.getContent().stream().map(bookingMapper::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}

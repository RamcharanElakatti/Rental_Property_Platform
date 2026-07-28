package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.OwnerStatsResponse;
import com.globalco.propertyrental.entity.BookingStatus;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyStatus;
import com.globalco.propertyrental.repository.BookingRepository;
import com.globalco.propertyrental.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OwnerService {

    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;

    @Transactional(readOnly = true)
    public OwnerStatsResponse dashboard(String ownerEmail) {
        long totalViews = propertyRepository.findByOwner_Email(ownerEmail, Pageable.unpaged())
                .stream()
                .mapToLong(Property::getViewCount)
                .sum();
        long favouriteCount = propertyRepository.findByOwner_Email(ownerEmail, Pageable.unpaged())
                .stream()
                .mapToLong(Property::getFavouriteCount)
                .sum();
        return new OwnerStatsResponse(
                propertyRepository.countByOwner_Email(ownerEmail),
                propertyRepository.countByOwner_EmailAndStatus(ownerEmail, PropertyStatus.AVAILABLE),
                bookingRepository.countByProperty_Owner_EmailAndStatus(ownerEmail, BookingStatus.PENDING),
                bookingRepository.countByProperty_Owner_EmailAndStatus(ownerEmail, BookingStatus.APPROVED),
                bookingRepository.countByProperty_Owner_EmailAndStatus(ownerEmail, BookingStatus.REJECTED),
                totalViews,
                favouriteCount,
                ownerBookingStatusMap(ownerEmail)
        );
    }

    private Map<String, Long> ownerBookingStatusMap(String ownerEmail) {
        Map<String, Long> result = new LinkedHashMap<>();
        bookingRepository.countBookingsByOwnerAndStatus(ownerEmail)
                .forEach(row -> result.put(String.valueOf(row[0]), (Long) row[1]));
        return result;
    }
}

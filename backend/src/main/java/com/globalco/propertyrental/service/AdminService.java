package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.AdminReportResponse;
import com.globalco.propertyrental.dto.DashboardStatsResponse;
import com.globalco.propertyrental.entity.BookingStatus;
import com.globalco.propertyrental.entity.PropertyStatus;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.repository.BookingRepository;
import com.globalco.propertyrental.repository.FavouriteRepository;
import com.globalco.propertyrental.repository.PropertyRepository;
import com.globalco.propertyrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final FavouriteRepository favouriteRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse dashboard() {
        return new DashboardStatsResponse(
                userRepository.count(),
                userRepository.countByRoles_Name(RoleName.ROLE_OWNER),
                userRepository.countByRoles_Name(RoleName.ROLE_TENANT),
                propertyRepository.count(),
                propertyRepository.countByStatus(PropertyStatus.AVAILABLE),
                bookingRepository.countByStatus(BookingStatus.PENDING),
                bookingRepository.countByStatus(BookingStatus.APPROVED),
                bookingRepository.countByStatus(BookingStatus.REJECTED),
                favouriteRepository.count(),
                toStringLongMap(propertyRepository.countPropertiesByCity()),
                toEnumLongMap(bookingRepository.countBookingsByStatus())
        );
    }

    @Transactional(readOnly = true)
    public AdminReportResponse reports() {
        long totalOwners = userRepository.countByRoles_Name(RoleName.ROLE_OWNER);
        long totalTenants = userRepository.countByRoles_Name(RoleName.ROLE_TENANT);
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long approvedBookings = bookingRepository.countByStatus(BookingStatus.APPROVED);
        long rejectedBookings = bookingRepository.countByStatus(BookingStatus.REJECTED);
        long completedBookings = bookingRepository.countByStatus(BookingStatus.COMPLETED);
        long cancelledBookings = bookingRepository.countByStatus(BookingStatus.CANCELLED);

        return new AdminReportResponse(
                userRepository.count(),
                totalOwners,
                totalTenants,
                propertyRepository.count(),
                propertyRepository.countByStatus(PropertyStatus.AVAILABLE),
                propertyRepository.countByStatus(PropertyStatus.OCCUPIED),
                propertyRepository.countByStatus(PropertyStatus.MAINTENANCE),
                bookingRepository.count(),
                pendingBookings,
                approvedBookings,
                rejectedBookings,
                completedBookings,
                cancelledBookings,
                favouriteRepository.count(),
                usersByRole(),
                propertiesByStatus(),
                toStringLongMap(propertyRepository.countPropertiesByCity()),
                bookingsByStatus()
        );
    }

    private Map<String, Long> usersByRole() {
        Map<String, Long> result = new LinkedHashMap<>();
        for (RoleName roleName : RoleName.values()) {
            result.put(roleName.name(), userRepository.countByRoles_Name(roleName));
        }
        return result;
    }

    private Map<String, Long> propertiesByStatus() {
        Map<String, Long> result = new LinkedHashMap<>();
        for (PropertyStatus status : PropertyStatus.values()) {
            result.put(status.name(), propertyRepository.countByStatus(status));
        }
        return result;
    }

    private Map<String, Long> bookingsByStatus() {
        Map<String, Long> result = new LinkedHashMap<>();
        for (BookingStatus status : BookingStatus.values()) {
            result.put(status.name(), bookingRepository.countByStatus(status));
        }
        return result;
    }

    private Map<String, Long> toStringLongMap(Iterable<Object[]> rows) {
        Map<String, Long> result = new LinkedHashMap<>();
        for (Object[] row : rows) {
            result.put(String.valueOf(row[0]), (Long) row[1]);
        }
        return result;
    }

    private Map<String, Long> toEnumLongMap(Iterable<Object[]> rows) {
        Map<String, Long> result = new LinkedHashMap<>();
        for (Object[] row : rows) {
            result.put(String.valueOf(row[0]), (Long) row[1]);
        }
        return result;
    }
}

package com.globalco.propertyrental.dto;

import java.util.Map;

public record AdminReportResponse(
        long totalUsers,
        long totalOwners,
        long totalTenants,
        long totalProperties,
        long activeListings,
        long occupiedProperties,
        long maintenanceProperties,
        long totalBookings,
        long pendingBookings,
        long approvedBookings,
        long rejectedBookings,
        long completedBookings,
        long cancelledBookings,
        long favourites,
        Map<String, Long> usersByRole,
        Map<String, Long> propertiesByStatus,
        Map<String, Long> propertiesByCity,
        Map<String, Long> bookingsByStatus
) {
}

package com.globalco.propertyrental.dto;

import java.util.Map;

public record DashboardStatsResponse(
        long totalUsers,
        long totalOwners,
        long totalTenants,
        long totalProperties,
        long activeListings,
        long pendingBookings,
        long approvedBookings,
        long rejectedBookings,
        long favourites,
        Map<String, Long> propertiesByCity,
        Map<String, Long> bookingsByStatus
) {
}

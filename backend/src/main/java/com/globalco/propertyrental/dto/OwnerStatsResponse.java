package com.globalco.propertyrental.dto;

import java.util.Map;

public record OwnerStatsResponse(
        long totalProperties,
        long activeListings,
        long pendingBookings,
        long approvedBookings,
        long rejectedBookings,
        long totalViews,
        long favouriteCount,
        Map<String, Long> bookingsByStatus
) {
}

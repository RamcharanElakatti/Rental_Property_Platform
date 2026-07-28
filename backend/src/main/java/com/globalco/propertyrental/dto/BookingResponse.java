package com.globalco.propertyrental.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

public record BookingResponse(
        Long id,
        PropertyResponse property,
        UserResponse tenant,
        LocalDate preferredDate,
        LocalTime preferredTime,
        String status,
        String ownerNote,
        Instant createdAt
) {
}

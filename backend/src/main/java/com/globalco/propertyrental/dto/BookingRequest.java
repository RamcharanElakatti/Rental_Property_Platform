package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingRequest(
        @NotNull(message = "Property id is required")
        Long propertyId,

        @FutureOrPresent(message = "Preferred date cannot be in the past")
        @NotNull(message = "Preferred date is required")
        LocalDate preferredDate,

        @NotNull(message = "Preferred time is required")
        LocalTime preferredTime
) {
}

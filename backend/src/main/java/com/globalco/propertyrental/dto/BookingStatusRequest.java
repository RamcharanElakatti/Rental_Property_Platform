package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.NotBlank;

public record BookingStatusRequest(
        @NotBlank(message = "Status is required")
        String status,
        String ownerNote
) {
}

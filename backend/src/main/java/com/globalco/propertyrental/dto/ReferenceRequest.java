package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.NotBlank;

public record ReferenceRequest(
        @NotBlank(message = "Name is required")
        String name,
        String description,
        String icon
) {
}

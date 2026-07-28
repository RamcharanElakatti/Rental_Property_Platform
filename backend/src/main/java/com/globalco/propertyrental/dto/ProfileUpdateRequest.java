package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ProfileUpdateRequest(
        @NotBlank(message = "Full name is required")
        String fullName,

        @Email(message = "Enter a valid email address")
        @NotBlank(message = "Email is required")
        String email,

        String phone,
        String avatarUrl
) {
}

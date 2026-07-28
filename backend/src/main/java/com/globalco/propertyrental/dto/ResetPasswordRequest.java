package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = "Reset token is required")
        String token,

        @Size(min = 6, message = "Password must be at least 6 characters")
        @NotBlank(message = "New password is required")
        String newPassword
) {
}

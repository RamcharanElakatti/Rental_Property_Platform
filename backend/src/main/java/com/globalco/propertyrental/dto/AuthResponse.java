package com.globalco.propertyrental.dto;

public record AuthResponse(
        String token,
        String tokenType,
        UserResponse user
) {
}

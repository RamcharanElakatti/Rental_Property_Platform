package com.globalco.propertyrental.dto;

import java.time.Instant;
import java.util.Set;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String avatarUrl,
        boolean enabled,
        Set<String> roles,
        Instant createdAt
) {
}

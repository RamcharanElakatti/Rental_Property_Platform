package com.globalco.propertyrental.dto;

import java.time.Instant;

public record NotificationResponse(
        Long id,
        String title,
        String message,
        String type,
        boolean read,
        Instant createdAt
) {
}

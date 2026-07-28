package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.NotificationResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    ApiResponse<PageResponse<NotificationResponse>> list(Authentication authentication, @PageableDefault(size = 20) Pageable pageable) {
        return ApiResponse.success("Notifications loaded", notificationService.list(authentication.getName(), pageable));
    }

    @GetMapping("/unread-count")
    ApiResponse<Long> unreadCount(Authentication authentication) {
        return ApiResponse.success("Unread count loaded", notificationService.unreadCount(authentication.getName()));
    }

    @PatchMapping("/{id}/read")
    ApiResponse<NotificationResponse> markRead(Authentication authentication, @PathVariable Long id) {
        return ApiResponse.success("Notification marked as read", notificationService.markRead(id, authentication.getName()));
    }
}

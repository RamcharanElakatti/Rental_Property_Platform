package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.NotificationResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.entity.Notification;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.ForbiddenActionException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.NotificationMapper;
import com.globalco.propertyrental.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @Transactional
    public void create(User user, String title, String message, String type) {
        notificationRepository.save(Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .read(false)
                .build());
    }

    @Transactional(readOnly = true)
    public PageResponse<NotificationResponse> list(String email, Pageable pageable) {
        Page<Notification> page = notificationRepository.findByUser_EmailOrderByCreatedAtDesc(email, pageable);
        return new PageResponse<>(
                page.getContent().stream().map(notificationMapper::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    @Transactional
    public NotificationResponse markRead(Long id, String email) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if (!notification.getUser().getEmail().equals(email)) {
            throw new ForbiddenActionException("You can only update your own notifications");
        }
        notification.setRead(true);
        return notificationMapper.toResponse(notification);
    }

    @Transactional(readOnly = true)
    public long unreadCount(String email) {
        return notificationRepository.countByUser_EmailAndReadFalse(email);
    }
}

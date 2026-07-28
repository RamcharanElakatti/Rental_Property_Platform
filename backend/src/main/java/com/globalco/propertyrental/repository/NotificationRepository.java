package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Page<Notification> findByUser_EmailOrderByCreatedAtDesc(String email, Pageable pageable);

    long countByUser_EmailAndReadFalse(String email);
}

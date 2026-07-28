package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPasswordResetToken(String token);

    boolean existsByEmail(String email);

    long countByRoles_Name(RoleName name);

    Page<User> findByRoles_Name(RoleName name, Pageable pageable);
}

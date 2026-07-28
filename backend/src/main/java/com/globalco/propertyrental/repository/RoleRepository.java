package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Role;
import com.globalco.propertyrental.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}

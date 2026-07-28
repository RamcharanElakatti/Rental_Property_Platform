package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropertyTypeRepository extends JpaRepository<PropertyType, Long> {
    Optional<PropertyType> findByNameIgnoreCase(String name);
}

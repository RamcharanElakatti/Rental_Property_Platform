package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    Optional<Amenity> findByNameIgnoreCase(String name);
}

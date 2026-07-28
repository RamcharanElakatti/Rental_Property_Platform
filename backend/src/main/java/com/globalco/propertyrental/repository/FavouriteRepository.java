package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Favourite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    Page<Favourite> findByTenant_EmailOrderByCreatedAtDesc(String email, Pageable pageable);

    Optional<Favourite> findByTenant_EmailAndProperty_Id(String email, Long propertyId);

    boolean existsByTenant_EmailAndProperty_Id(String email, Long propertyId);
}

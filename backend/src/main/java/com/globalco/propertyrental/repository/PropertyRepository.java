package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    Page<Property> findByOwner_Email(String email, Pageable pageable);

    long countByOwner_Email(String email);

    long countByOwner_EmailAndStatus(String email, PropertyStatus status);

    long countByStatus(PropertyStatus status);

    List<Property> findTop6ByStatusOrderByCreatedAtDesc(PropertyStatus status);

    @Query("select p.city, count(p) from Property p group by p.city order by count(p) desc")
    List<Object[]> countPropertiesByCity();
}

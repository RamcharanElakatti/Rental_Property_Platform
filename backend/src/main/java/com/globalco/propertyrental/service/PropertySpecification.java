package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.PropertySearchCriteria;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyStatus;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class PropertySpecification {

    private PropertySpecification() {
    }

    public static Specification<Property> byCriteria(PropertySearchCriteria criteria) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (hasText(criteria.keyword())) {
                String like = "%" + criteria.keyword().trim().toLowerCase(Locale.ROOT) + "%";
                predicates.add(builder.or(
                        builder.like(builder.lower(root.get("title")), like),
                        builder.like(builder.lower(root.get("description")), like),
                        builder.like(builder.lower(root.get("city")), like),
                        builder.like(builder.lower(root.get("state")), like)
                ));
            }
            if (hasText(criteria.city())) {
                predicates.add(builder.equal(builder.lower(root.get("city")), criteria.city().trim().toLowerCase(Locale.ROOT)));
            }
            if (hasText(criteria.state())) {
                predicates.add(builder.equal(builder.lower(root.get("state")), criteria.state().trim().toLowerCase(Locale.ROOT)));
            }
            if (criteria.minRent() != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("rent"), criteria.minRent()));
            }
            if (criteria.maxRent() != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("rent"), criteria.maxRent()));
            }
            if (criteria.bedrooms() != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("bedrooms"), criteria.bedrooms()));
            }
            if (criteria.bathrooms() != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("bathrooms"), criteria.bathrooms()));
            }
            if (criteria.propertyTypeId() != null) {
                predicates.add(builder.equal(root.get("propertyType").get("id"), criteria.propertyTypeId()));
            }
            if (hasText(criteria.availability())) {
                predicates.add(builder.equal(root.get("status"), PropertyStatus.valueOf(criteria.availability().trim().toUpperCase(Locale.ROOT))));
            }
            return builder.and(predicates.toArray(Predicate[]::new));
        };
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}

package com.globalco.propertyrental.dto;

import java.math.BigDecimal;

public record PropertySearchCriteria(
        String keyword,
        String city,
        String state,
        BigDecimal minRent,
        BigDecimal maxRent,
        Integer bedrooms,
        Integer bathrooms,
        Long propertyTypeId,
        String availability
) {
}

package com.globalco.propertyrental.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record PropertyResponse(
        Long id,
        String title,
        String description,
        BigDecimal rent,
        BigDecimal deposit,
        Integer bedrooms,
        Integer bathrooms,
        Integer area,
        Integer floor,
        Boolean parking,
        Boolean balcony,
        ReferenceResponse propertyType,
        ReferenceResponse category,
        String city,
        String state,
        String address,
        String zipCode,
        Double latitude,
        Double longitude,
        UserResponse owner,
        List<String> images,
        List<ReferenceResponse> amenities,
        String status,
        Long viewCount,
        Long favouriteCount,
        Instant createdAt,
        Instant updatedAt
) {
}

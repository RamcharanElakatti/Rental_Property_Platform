package com.globalco.propertyrental.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.util.List;

public record PropertyRequest(
        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        @NotNull(message = "Rent is required")
        @Positive(message = "Rent must be positive")
        BigDecimal rent,

        @NotNull(message = "Deposit is required")
        @PositiveOrZero(message = "Deposit cannot be negative")
        BigDecimal deposit,

        @NotNull(message = "Bedrooms are required")
        @Min(value = 0, message = "Bedrooms cannot be negative")
        Integer bedrooms,

        @NotNull(message = "Bathrooms are required")
        @Min(value = 1, message = "Bathrooms must be at least 1")
        Integer bathrooms,

        @NotNull(message = "Area is required")
        @Positive(message = "Area must be positive")
        Integer area,

        Integer floor,
        Boolean parking,
        Boolean balcony,

        @NotNull(message = "Property type is required")
        Long propertyTypeId,

        @NotNull(message = "Category is required")
        Long categoryId,

        @NotBlank(message = "City is required")
        String city,

        @NotBlank(message = "State is required")
        String state,

        @NotBlank(message = "Address is required")
        String address,

        String zipCode,
        Double latitude,
        Double longitude,
        List<String> imageUrls,
        List<Long> amenityIds,
        String status
) {
}

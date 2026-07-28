package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.ReferenceRequest;
import com.globalco.propertyrental.dto.ReferenceResponse;
import com.globalco.propertyrental.service.ReferenceDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReferenceController {

    private final ReferenceDataService referenceDataService;

    @GetMapping("/api/categories")
    ApiResponse<List<ReferenceResponse>> categories() {
        return ApiResponse.success("Categories loaded", referenceDataService.categories());
    }

    @PostMapping("/api/categories")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> createCategory(@Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Category created", referenceDataService.createCategory(request));
    }

    @PutMapping("/api/categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> updateCategory(@PathVariable Long id, @Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Category updated", referenceDataService.updateCategory(id, request));
    }

    @DeleteMapping("/api/categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<Void> deleteCategory(@PathVariable Long id) {
        referenceDataService.deleteCategory(id);
        return ApiResponse.success("Category deleted", null);
    }

    @GetMapping("/api/property-types")
    ApiResponse<List<ReferenceResponse>> propertyTypes() {
        return ApiResponse.success("Property types loaded", referenceDataService.propertyTypes());
    }

    @PostMapping("/api/property-types")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> createPropertyType(@Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Property type created", referenceDataService.createPropertyType(request));
    }

    @PutMapping("/api/property-types/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> updatePropertyType(@PathVariable Long id, @Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Property type updated", referenceDataService.updatePropertyType(id, request));
    }

    @DeleteMapping("/api/property-types/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<Void> deletePropertyType(@PathVariable Long id) {
        referenceDataService.deletePropertyType(id);
        return ApiResponse.success("Property type deleted", null);
    }

    @GetMapping("/api/amenities")
    ApiResponse<List<ReferenceResponse>> amenities() {
        return ApiResponse.success("Amenities loaded", referenceDataService.amenities());
    }

    @PostMapping("/api/amenities")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> createAmenity(@Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Amenity created", referenceDataService.createAmenity(request));
    }

    @PutMapping("/api/amenities/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<ReferenceResponse> updateAmenity(@PathVariable Long id, @Valid @RequestBody ReferenceRequest request) {
        return ApiResponse.success("Amenity updated", referenceDataService.updateAmenity(id, request));
    }

    @DeleteMapping("/api/amenities/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<Void> deleteAmenity(@PathVariable Long id) {
        referenceDataService.deleteAmenity(id);
        return ApiResponse.success("Amenity deleted", null);
    }
}

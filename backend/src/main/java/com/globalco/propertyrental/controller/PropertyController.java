package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyRequest;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.dto.PropertySearchCriteria;
import com.globalco.propertyrental.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    ApiResponse<PageResponse<PropertyResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms,
            @RequestParam(required = false) Long propertyTypeId,
            @RequestParam(required = false) String availability,
            @PageableDefault(size = 12, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        PropertySearchCriteria criteria = new PropertySearchCriteria(keyword, city, state, minRent, maxRent, bedrooms, bathrooms, propertyTypeId, availability);
        return ApiResponse.success("Properties loaded", propertyService.search(criteria, pageable));
    }

    @GetMapping("/{id}")
    ApiResponse<PropertyResponse> details(@PathVariable Long id) {
        return ApiResponse.success("Property loaded", propertyService.details(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    ApiResponse<PropertyResponse> create(Authentication authentication, @Valid @RequestBody PropertyRequest request) {
        return ApiResponse.success("Property created", propertyService.create(request, authentication.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    ApiResponse<PropertyResponse> update(Authentication authentication, @PathVariable Long id, @Valid @RequestBody PropertyRequest request) {
        return ApiResponse.success("Property updated", propertyService.update(id, request, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    ApiResponse<Void> delete(Authentication authentication, @PathVariable Long id) {
        propertyService.delete(id, authentication.getName());
        return ApiResponse.success("Property deleted", null);
    }

    @PostMapping("/{id}/images")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    ApiResponse<PropertyResponse> uploadImages(Authentication authentication, @PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        return ApiResponse.success("Property images uploaded", propertyService.uploadImages(id, files, authentication.getName()));
    }
}

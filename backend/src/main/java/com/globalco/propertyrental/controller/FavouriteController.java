package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.service.FavouriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/favourites")
@RequiredArgsConstructor
public class FavouriteController {

    private final FavouriteService favouriteService;

    @GetMapping
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<PageResponse<PropertyResponse>> list(Authentication authentication, @PageableDefault(size = 12) Pageable pageable) {
        return ApiResponse.success("Favourites loaded", favouriteService.list(authentication.getName(), pageable));
    }

    @PostMapping("/{propertyId}")
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<PropertyResponse> add(Authentication authentication, @PathVariable Long propertyId) {
        return ApiResponse.success("Favourite added", favouriteService.add(propertyId, authentication.getName()));
    }

    @DeleteMapping("/{propertyId}")
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<Void> remove(Authentication authentication, @PathVariable Long propertyId) {
        favouriteService.remove(propertyId, authentication.getName());
        return ApiResponse.success("Favourite removed", null);
    }
}

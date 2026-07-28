package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.BookingResponse;
import com.globalco.propertyrental.dto.OwnerStatsResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.service.BookingService;
import com.globalco.propertyrental.service.OwnerService;
import com.globalco.propertyrental.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owner")
@PreAuthorize("hasRole('OWNER')")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;
    private final PropertyService propertyService;
    private final BookingService bookingService;

    @GetMapping("/dashboard")
    ApiResponse<OwnerStatsResponse> dashboard(Authentication authentication) {
        return ApiResponse.success("Owner dashboard loaded", ownerService.dashboard(authentication.getName()));
    }

    @GetMapping("/properties")
    ApiResponse<PageResponse<PropertyResponse>> properties(Authentication authentication, @PageableDefault(size = 10) Pageable pageable) {
        return ApiResponse.success("Owner properties loaded", propertyService.ownerProperties(authentication.getName(), pageable));
    }

    @GetMapping("/bookings")
    ApiResponse<PageResponse<BookingResponse>> bookings(Authentication authentication, @PageableDefault(size = 10) Pageable pageable) {
        return ApiResponse.success("Owner booking requests loaded", bookingService.ownerRequests(authentication.getName(), pageable));
    }
}

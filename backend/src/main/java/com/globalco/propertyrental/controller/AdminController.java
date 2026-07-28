package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.AdminReportResponse;
import com.globalco.propertyrental.dto.BookingResponse;
import com.globalco.propertyrental.dto.DashboardStatsResponse;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.dto.PropertySearchCriteria;
import com.globalco.propertyrental.dto.UserResponse;
import com.globalco.propertyrental.service.AdminService;
import com.globalco.propertyrental.service.BookingService;
import com.globalco.propertyrental.service.PropertyService;
import com.globalco.propertyrental.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;
    private final PropertyService propertyService;
    private final BookingService bookingService;

    @GetMapping("/dashboard")
    ApiResponse<DashboardStatsResponse> dashboard() {
        return ApiResponse.success("Admin dashboard loaded", adminService.dashboard());
    }

    @GetMapping("/reports")
    ApiResponse<AdminReportResponse> reports() {
        return ApiResponse.success("Admin reports loaded", adminService.reports());
    }

    @GetMapping("/users")
    ApiResponse<PageResponse<UserResponse>> users(@RequestParam(required = false) String role, @PageableDefault(size = 20) Pageable pageable) {
        return ApiResponse.success("Users loaded", userService.listUsers(role, pageable));
    }

    @PatchMapping("/users/{id}/status")
    ApiResponse<UserResponse> setUserStatus(@PathVariable Long id, @RequestParam boolean enabled) {
        return ApiResponse.success("User status updated", userService.setEnabled(id, enabled));
    }

    @GetMapping("/properties")
    ApiResponse<PageResponse<PropertyResponse>> properties(@PageableDefault(size = 20) Pageable pageable) {
        return ApiResponse.success("Properties loaded", propertyService.search(new PropertySearchCriteria(null, null, null, null, null, null, null, null, null), pageable));
    }

    @GetMapping("/bookings")
    ApiResponse<PageResponse<BookingResponse>> bookings(@PageableDefault(size = 20) Pageable pageable) {
        return ApiResponse.success("Bookings loaded", bookingService.allBookings(pageable));
    }
}

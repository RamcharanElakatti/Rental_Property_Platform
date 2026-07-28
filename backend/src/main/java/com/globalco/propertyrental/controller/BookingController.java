package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.BookingRequest;
import com.globalco.propertyrental.dto.BookingResponse;
import com.globalco.propertyrental.dto.BookingStatusRequest;
import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<BookingResponse> requestVisit(Authentication authentication, @Valid @RequestBody BookingRequest request) {
        return ApiResponse.success("Visit requested", bookingService.requestVisit(request, authentication.getName()));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<PageResponse<BookingResponse>> myBookings(Authentication authentication, @PageableDefault(size = 10) Pageable pageable) {
        return ApiResponse.success("Booking history loaded", bookingService.tenantHistory(authentication.getName(), pageable));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<PageResponse<BookingResponse>> allBookings(@PageableDefault(size = 20) Pageable pageable) {
        return ApiResponse.success("Bookings loaded", bookingService.allBookings(pageable));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<BookingResponse> cancel(Authentication authentication, @PathVariable Long id) {
        return ApiResponse.success("Booking cancelled", bookingService.cancel(id, authentication.getName()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    ApiResponse<BookingResponse> updateStatus(Authentication authentication, @PathVariable Long id, @Valid @RequestBody BookingStatusRequest request) {
        return ApiResponse.success("Booking status updated", bookingService.updateStatus(id, request, authentication.getName()));
    }
}

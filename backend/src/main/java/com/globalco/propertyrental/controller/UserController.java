package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.ProfileUpdateRequest;
import com.globalco.propertyrental.dto.UserResponse;
import com.globalco.propertyrental.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    ApiResponse<UserResponse> me(Authentication authentication) {
        return ApiResponse.success("Profile loaded", userService.me(authentication.getName()));
    }

    @PutMapping("/me")
    ApiResponse<UserResponse> updateProfile(Authentication authentication, @Valid @RequestBody ProfileUpdateRequest request) {
        return ApiResponse.success("Profile updated", userService.updateProfile(authentication.getName(), request));
    }

    @PostMapping("/me/avatar")
    ApiResponse<UserResponse> uploadAvatar(Authentication authentication, @RequestParam("file") MultipartFile file) {
        return ApiResponse.success("Profile image uploaded", userService.uploadAvatar(authentication.getName(), file));
    }

    @GetMapping("/tenant-only-check")
    @PreAuthorize("hasRole('TENANT')")
    ApiResponse<Void> tenantOnlyCheck() {
        return ApiResponse.success("Tenant route is accessible", null);
    }
}

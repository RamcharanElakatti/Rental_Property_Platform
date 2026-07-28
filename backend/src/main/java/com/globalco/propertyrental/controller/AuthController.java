package com.globalco.propertyrental.controller;

import com.globalco.propertyrental.dto.ApiResponse;
import com.globalco.propertyrental.dto.AuthResponse;
import com.globalco.propertyrental.dto.ForgotPasswordRequest;
import com.globalco.propertyrental.dto.LoginRequest;
import com.globalco.propertyrental.dto.RegisterRequest;
import com.globalco.propertyrental.dto.ResetPasswordRequest;
import com.globalco.propertyrental.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful", authService.register(request)));
    }

    @PostMapping("/login")
    ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login successful", authService.login(request));
    }

    @PostMapping("/forgot-password")
    ApiResponse<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ApiResponse.success("Password reset token generated", authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    ApiResponse<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ApiResponse.success("Password has been reset", null);
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout() {
        return ApiResponse.success("Logout successful. Remove the JWT token on the client.", null);
    }
}

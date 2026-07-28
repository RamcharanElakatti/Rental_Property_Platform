package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.AuthResponse;
import com.globalco.propertyrental.dto.ForgotPasswordRequest;
import com.globalco.propertyrental.dto.LoginRequest;
import com.globalco.propertyrental.dto.RegisterRequest;
import com.globalco.propertyrental.dto.ResetPasswordRequest;
import com.globalco.propertyrental.entity.Role;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.UserMapper;
import com.globalco.propertyrental.repository.RoleRepository;
import com.globalco.propertyrental.repository.UserRepository;
import com.globalco.propertyrental.security.JwtService;
import com.globalco.propertyrental.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered");
        }
        RoleName roleName = parsePublicRole(request.role());
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not configured: " + roleName));
        User user = User.builder()
                .fullName(request.fullName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .phone(request.phone())
                .enabled(true)
                .roles(Set.of(role))
                .build();
        User saved = userRepository.save(user);
        String token = jwtService.generateToken(UserPrincipal.from(saved), false);
        return new AuthResponse(token, "Bearer", userMapper.toResponse(saved));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        String token = jwtService.generateToken(UserPrincipal.from(user), request.rememberMe());
        return new AuthResponse(token, "Bearer", userMapper.toResponse(user));
    }

    @Transactional
    public String forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.email().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new ResourceNotFoundException("No account found for this email"));
        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiresAt(Instant.now().plus(30, ChronoUnit.MINUTES));
        return token;
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByPasswordResetToken(request.token())
                .orElseThrow(() -> new ResourceNotFoundException("Reset token is invalid"));
        if (user.getPasswordResetTokenExpiresAt() == null || user.getPasswordResetTokenExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException("Reset token has expired");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiresAt(null);
    }

    private RoleName parsePublicRole(String role) {
        String normalized = role.trim().toUpperCase(Locale.ROOT);
        if (!normalized.startsWith("ROLE_")) {
            normalized = "ROLE_" + normalized;
        }
        RoleName roleName = RoleName.valueOf(normalized);
        if (roleName == RoleName.ROLE_ADMIN) {
            throw new BadRequestException("Admin accounts must be provisioned by an existing administrator");
        }
        return roleName;
    }
}

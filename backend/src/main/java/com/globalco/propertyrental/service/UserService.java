package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.ProfileUpdateRequest;
import com.globalco.propertyrental.dto.UserResponse;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.UserMapper;
import com.globalco.propertyrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FileStorageService fileStorageService;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public UserResponse me(String email) {
        return userMapper.toResponse(findByEmail(email));
    }

    @Transactional
    public UserResponse updateProfile(String currentEmail, ProfileUpdateRequest request) {
        User user = findByEmail(currentEmail);
        String newEmail = request.email().trim().toLowerCase(Locale.ROOT);
        if (!user.getEmail().equals(newEmail) && userRepository.existsByEmail(newEmail)) {
            throw new BadRequestException("Email is already registered");
        }
        user.setFullName(request.fullName().trim());
        user.setEmail(newEmail);
        user.setPhone(request.phone());
        user.setAvatarUrl(request.avatarUrl());
        notificationService.create(user, "Profile updated", "Your profile changes were saved.", "PROFILE_UPDATED");
        return userMapper.toResponse(user);
    }

    @Transactional
    public UserResponse uploadAvatar(String email, MultipartFile file) {
        User user = findByEmail(email);
        String avatarUrl = fileStorageService.store(file, "profiles");
        user.setAvatarUrl(avatarUrl);
        notificationService.create(user, "Profile image updated", "Your profile image was uploaded.", "PROFILE_UPDATED");
        return userMapper.toResponse(user);
    }

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> listUsers(String role, Pageable pageable) {
        Page<User> page;
        if (role == null || role.isBlank()) {
            page = userRepository.findAll(pageable);
        } else {
            String normalized = role.trim().toUpperCase(Locale.ROOT);
            if (!normalized.startsWith("ROLE_")) {
                normalized = "ROLE_" + normalized;
            }
            page = userRepository.findByRoles_Name(RoleName.valueOf(normalized), pageable);
        }
        return new PageResponse<>(
                page.getContent().stream().map(userMapper::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    @Transactional
    public UserResponse setEnabled(Long id, boolean enabled) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(enabled);
        return userMapper.toResponse(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

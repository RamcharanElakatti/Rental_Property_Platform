package com.globalco.propertyrental.mapper;

import com.globalco.propertyrental.dto.UserResponse;
import com.globalco.propertyrental.entity.Role;
import com.globalco.propertyrental.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getAvatarUrl(),
                user.isEnabled(),
                user.getRoles().stream().map(Role::getName).map(Enum::name).collect(Collectors.toSet()),
                user.getCreatedAt()
        );
    }
}

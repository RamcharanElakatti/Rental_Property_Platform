package com.globalco.propertyrental.security;

import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .map(UserPrincipal::from)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

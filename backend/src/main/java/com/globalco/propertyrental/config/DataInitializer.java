package com.globalco.propertyrental.config;

import com.globalco.propertyrental.entity.Amenity;
import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyStatus;
import com.globalco.propertyrental.entity.PropertyType;
import com.globalco.propertyrental.entity.Role;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.repository.AmenityRepository;
import com.globalco.propertyrental.repository.CategoryRepository;
import com.globalco.propertyrental.repository.PropertyRepository;
import com.globalco.propertyrental.repository.PropertyTypeRepository;
import com.globalco.propertyrental.repository.RoleRepository;
import com.globalco.propertyrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PropertyTypeRepository propertyTypeRepository;
    private final AmenityRepository amenityRepository;
    private final PropertyRepository propertyRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedReferenceData() {
        return args -> {
            for (RoleName roleName : RoleName.values()) {
                roleRepository.findByName(roleName).orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));
            }
            seedCategories();
            seedPropertyTypes();
            seedAmenities();
            seedUsersAndProperties();
        };
    }

    private void seedCategories() {
        List.of("Apartment", "Villa", "Studio", "Independent House", "Co-Living")
                .forEach(name -> categoryRepository.findByNameIgnoreCase(name)
                        .orElseGet(() -> categoryRepository.save(Category.builder().name(name).description(name + " rentals").build())));
    }

    private void seedPropertyTypes() {
        List.of("Residential", "Commercial", "Luxury", "Budget")
                .forEach(name -> propertyTypeRepository.findByNameIgnoreCase(name)
                        .orElseGet(() -> propertyTypeRepository.save(PropertyType.builder().name(name).description(name + " property").build())));
    }

    private void seedAmenities() {
        List.of("WiFi", "Parking", "Power Backup", "Lift", "Swimming Pool", "Gym", "Security", "Garden", "Pet Friendly", "Air Conditioning")
                .forEach(name -> amenityRepository.findByNameIgnoreCase(name)
                        .orElseGet(() -> amenityRepository.save(Amenity.builder().name(name).icon("amenity").build())));
    }

    private void seedUsersAndProperties() {
        Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow();
        Role ownerRole = roleRepository.findByName(RoleName.ROLE_OWNER).orElseThrow();
        Role tenantRole = roleRepository.findByName(RoleName.ROLE_TENANT).orElseThrow();
        userRepository.findByEmail("admin@globalco.test").orElseGet(() -> userRepository.save(User.builder()
                .fullName("GlobalCo Admin")
                .email("admin@globalco.test")
                .password(passwordEncoder.encode("password"))
                .phone("+1 555 0100")
                .enabled(true)
                .roles(Set.of(adminRole))
                .build()));
        User owner = userRepository.findByEmail("owner@globalco.test").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Avery Stone")
                .email("owner@globalco.test")
                .password(passwordEncoder.encode("password"))
                .phone("+1 555 0188")
                .enabled(true)
                .roles(Set.of(ownerRole))
                .build()));
        userRepository.findByEmail("tenant@globalco.test").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Maya Chen")
                .email("tenant@globalco.test")
                .password(passwordEncoder.encode("password"))
                .phone("+1 555 0199")
                .enabled(true)
                .roles(Set.of(tenantRole))
                .build()));
        if (propertyRepository.count() == 0) {
            Category apartment = categoryRepository.findByNameIgnoreCase("Apartment").orElseThrow();
            PropertyType residential = propertyTypeRepository.findByNameIgnoreCase("Residential").orElseThrow();
            Set<Amenity> amenities = Set.copyOf(amenityRepository.findAll());
            Property property = Property.builder()
                    .title("Sunlit Downtown Apartment")
                    .description("A bright, walkable rental with secure parking, balcony views, and a dedicated work nook.")
                    .rent(BigDecimal.valueOf(2450))
                    .deposit(BigDecimal.valueOf(2450))
                    .bedrooms(2)
                    .bathrooms(2)
                    .area(1180)
                    .floor(9)
                    .parking(true)
                    .balcony(true)
                    .propertyType(residential)
                    .category(apartment)
                    .city("Austin")
                    .state("Texas")
                    .address("400 Congress Ave")
                    .zipCode("78701")
                    .latitude(30.2672)
                    .longitude(-97.7431)
                    .owner(owner)
                    .amenities(amenities)
                    .status(PropertyStatus.AVAILABLE)
                    .viewCount(428L)
                    .favouriteCount(34L)
                    .build();
            property.replaceImages(List.of(
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
            ));
            propertyRepository.save(property);
        }
    }
}

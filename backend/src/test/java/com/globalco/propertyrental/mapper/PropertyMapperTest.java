package com.globalco.propertyrental.mapper;

import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyStatus;
import com.globalco.propertyrental.entity.PropertyType;
import com.globalco.propertyrental.entity.Role;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class PropertyMapperTest {

    private final PropertyMapper mapper = new PropertyMapper(new UserMapper(), new ReferenceMapper());

    @Test
    void mapsPropertyToResponse() {
        User owner = User.builder()
                .id(1L)
                .fullName("Owner")
                .email("owner@test.com")
                .enabled(true)
                .roles(Set.of(Role.builder().name(RoleName.ROLE_OWNER).build()))
                .build();
        Category category = Category.builder().id(1L).name("Apartment").description("Apartment rentals").build();
        PropertyType propertyType = PropertyType.builder().id(1L).name("Residential").description("Homes").build();
        Property property = Property.builder()
                .id(10L)
                .title("City Loft")
                .description("Modern loft")
                .rent(BigDecimal.valueOf(2200))
                .deposit(BigDecimal.valueOf(2200))
                .bedrooms(2)
                .bathrooms(2)
                .area(900)
                .floor(4)
                .parking(true)
                .balcony(false)
                .category(category)
                .propertyType(propertyType)
                .city("Austin")
                .state("Texas")
                .address("1 Main St")
                .owner(owner)
                .status(PropertyStatus.AVAILABLE)
                .viewCount(12L)
                .favouriteCount(3L)
                .build();

        assertThat(mapper.toResponse(property).title()).isEqualTo("City Loft");
        assertThat(mapper.toResponse(property).owner().email()).isEqualTo("owner@test.com");
    }
}

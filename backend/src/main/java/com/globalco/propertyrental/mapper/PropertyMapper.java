package com.globalco.propertyrental.mapper;

import com.globalco.propertyrental.dto.PropertyRequest;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.entity.Amenity;
import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyImage;
import com.globalco.propertyrental.entity.PropertyStatus;
import com.globalco.propertyrental.entity.PropertyType;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.Set;

@Component
public class PropertyMapper {

    private final UserMapper userMapper;
    private final ReferenceMapper referenceMapper;

    public PropertyMapper(UserMapper userMapper, ReferenceMapper referenceMapper) {
        this.userMapper = userMapper;
        this.referenceMapper = referenceMapper;
    }

    public PropertyResponse toResponse(Property property) {
        return new PropertyResponse(
                property.getId(),
                property.getTitle(),
                property.getDescription(),
                property.getRent(),
                property.getDeposit(),
                property.getBedrooms(),
                property.getBathrooms(),
                property.getArea(),
                property.getFloor(),
                property.getParking(),
                property.getBalcony(),
                referenceMapper.toResponse(property.getPropertyType()),
                referenceMapper.toResponse(property.getCategory()),
                property.getCity(),
                property.getState(),
                property.getAddress(),
                property.getZipCode(),
                property.getLatitude(),
                property.getLongitude(),
                userMapper.toResponse(property.getOwner()),
                property.getImages().stream()
                        .sorted(Comparator.comparing(PropertyImage::isPrimaryImage).reversed())
                        .map(PropertyImage::getImageUrl)
                        .toList(),
                property.getAmenities().stream().map(referenceMapper::toResponse).toList(),
                property.getStatus().name(),
                property.getViewCount(),
                property.getFavouriteCount(),
                property.getCreatedAt(),
                property.getUpdatedAt()
        );
    }

    public void apply(Property property, PropertyRequest request, Category category, PropertyType propertyType, Set<Amenity> amenities) {
        property.setTitle(request.title());
        property.setDescription(request.description());
        property.setRent(request.rent());
        property.setDeposit(request.deposit());
        property.setBedrooms(request.bedrooms());
        property.setBathrooms(request.bathrooms());
        property.setArea(request.area());
        property.setFloor(request.floor());
        property.setParking(Boolean.TRUE.equals(request.parking()));
        property.setBalcony(Boolean.TRUE.equals(request.balcony()));
        property.setPropertyType(propertyType);
        property.setCategory(category);
        property.setCity(request.city());
        property.setState(request.state());
        property.setAddress(request.address());
        property.setZipCode(request.zipCode());
        property.setLatitude(request.latitude());
        property.setLongitude(request.longitude());
        property.setAmenities(amenities);
        property.setStatus(parseStatus(request.status()));
        property.replaceImages(request.imageUrls());
    }

    private PropertyStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            return PropertyStatus.AVAILABLE;
        }
        return PropertyStatus.valueOf(status.trim().toUpperCase());
    }
}

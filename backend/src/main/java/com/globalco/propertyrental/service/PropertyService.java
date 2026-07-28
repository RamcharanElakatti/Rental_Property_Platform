package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyRequest;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.dto.PropertySearchCriteria;
import com.globalco.propertyrental.entity.Amenity;
import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.PropertyImage;
import com.globalco.propertyrental.entity.PropertyType;
import com.globalco.propertyrental.entity.RoleName;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ForbiddenActionException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.PropertyMapper;
import com.globalco.propertyrental.repository.AmenityRepository;
import com.globalco.propertyrental.repository.CategoryRepository;
import com.globalco.propertyrental.repository.PropertyRepository;
import com.globalco.propertyrental.repository.PropertyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final CategoryRepository categoryRepository;
    private final PropertyTypeRepository propertyTypeRepository;
    private final AmenityRepository amenityRepository;
    private final PropertyMapper propertyMapper;
    private final UserService userService;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public PageResponse<PropertyResponse> search(PropertySearchCriteria criteria, Pageable pageable) {
        Page<Property> page = propertyRepository.findAll(PropertySpecification.byCriteria(criteria), pageable);
        return toPageResponse(page);
    }

    @Transactional
    public PropertyResponse details(Long id) {
        Property property = findProperty(id);
        property.setViewCount(property.getViewCount() + 1);
        return propertyMapper.toResponse(property);
    }

    @Transactional(readOnly = true)
    public PageResponse<PropertyResponse> ownerProperties(String email, Pageable pageable) {
        return toPageResponse(propertyRepository.findByOwner_Email(email, pageable));
    }

    @Transactional
    public PropertyResponse create(PropertyRequest request, String ownerEmail) {
        User owner = userService.findByEmail(ownerEmail);
        ensureOwnerOrAdmin(owner);
        Property property = Property.builder()
                .owner(owner)
                .viewCount(0L)
                .favouriteCount(0L)
                .build();
        propertyMapper.apply(property, request, resolveCategory(request.categoryId()), resolvePropertyType(request.propertyTypeId()), resolveAmenities(request.amenityIds()));
        return propertyMapper.toResponse(propertyRepository.save(property));
    }

    @Transactional
    public PropertyResponse update(Long id, PropertyRequest request, String actorEmail) {
        Property property = findProperty(id);
        ensureCanManage(property, userService.findByEmail(actorEmail));
        propertyMapper.apply(property, request, resolveCategory(request.categoryId()), resolvePropertyType(request.propertyTypeId()), resolveAmenities(request.amenityIds()));
        return propertyMapper.toResponse(property);
    }

    @Transactional
    public void delete(Long id, String actorEmail) {
        Property property = findProperty(id);
        ensureCanManage(property, userService.findByEmail(actorEmail));
        propertyRepository.delete(property);
    }

    @Transactional
    public PropertyResponse uploadImages(Long id, List<MultipartFile> files, String actorEmail) {
        Property property = findProperty(id);
        ensureCanManage(property, userService.findByEmail(actorEmail));
        if (files == null || files.isEmpty()) {
            throw new BadRequestException("At least one property image is required");
        }
        for (MultipartFile file : files) {
            String url = fileStorageService.store(file, "properties");
            property.getImages().add(PropertyImage.builder()
                    .property(property)
                    .imageUrl(url)
                    .primaryImage(property.getImages().isEmpty())
                    .build());
        }
        return propertyMapper.toResponse(property);
    }

    public Property findProperty(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
    }

    private Category resolveCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    private PropertyType resolvePropertyType(Long id) {
        return propertyTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property type not found"));
    }

    private Set<Amenity> resolveAmenities(List<Long> amenityIds) {
        if (amenityIds == null || amenityIds.isEmpty()) {
            return new HashSet<>();
        }
        List<Amenity> amenities = amenityRepository.findAllById(amenityIds);
        if (amenities.size() != amenityIds.size()) {
            throw new ResourceNotFoundException("One or more amenities were not found");
        }
        return new HashSet<>(amenities);
    }

    private void ensureOwnerOrAdmin(User user) {
        boolean allowed = user.getRoles().stream()
                .anyMatch(role -> role.getName() == RoleName.ROLE_OWNER || role.getName() == RoleName.ROLE_ADMIN);
        if (!allowed) {
            throw new ForbiddenActionException("Only owners and admins can manage properties");
        }
    }

    private void ensureCanManage(Property property, User actor) {
        boolean admin = actor.getRoles().stream().anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN);
        if (!admin && !property.getOwner().getId().equals(actor.getId())) {
            throw new ForbiddenActionException("You can only manage your own properties");
        }
    }

    private PageResponse<PropertyResponse> toPageResponse(Page<Property> page) {
        return new PageResponse<>(
                page.getContent().stream().map(propertyMapper::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}

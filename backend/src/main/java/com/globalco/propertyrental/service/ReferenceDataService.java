package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.ReferenceRequest;
import com.globalco.propertyrental.dto.ReferenceResponse;
import com.globalco.propertyrental.entity.Amenity;
import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.PropertyType;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.ReferenceMapper;
import com.globalco.propertyrental.repository.AmenityRepository;
import com.globalco.propertyrental.repository.CategoryRepository;
import com.globalco.propertyrental.repository.PropertyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReferenceDataService {

    private final CategoryRepository categoryRepository;
    private final PropertyTypeRepository propertyTypeRepository;
    private final AmenityRepository amenityRepository;
    private final ReferenceMapper referenceMapper;

    @Transactional(readOnly = true)
    public List<ReferenceResponse> categories() {
        return categoryRepository.findAll().stream().map(referenceMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceResponse> propertyTypes() {
        return propertyTypeRepository.findAll().stream().map(referenceMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceResponse> amenities() {
        return amenityRepository.findAll().stream().map(referenceMapper::toResponse).toList();
    }

    @Transactional
    public ReferenceResponse createCategory(ReferenceRequest request) {
        categoryRepository.findByNameIgnoreCase(request.name()).ifPresent(existing -> {
            throw new BadRequestException("Category already exists");
        });
        Category category = categoryRepository.save(Category.builder().name(request.name()).description(request.description()).build());
        return referenceMapper.toResponse(category);
    }

    @Transactional
    public ReferenceResponse updateCategory(Long id, ReferenceRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(request.name());
        category.setDescription(request.description());
        return referenceMapper.toResponse(category);
    }

    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Transactional
    public ReferenceResponse createPropertyType(ReferenceRequest request) {
        propertyTypeRepository.findByNameIgnoreCase(request.name()).ifPresent(existing -> {
            throw new BadRequestException("Property type already exists");
        });
        PropertyType propertyType = propertyTypeRepository.save(PropertyType.builder().name(request.name()).description(request.description()).build());
        return referenceMapper.toResponse(propertyType);
    }

    @Transactional
    public ReferenceResponse updatePropertyType(Long id, ReferenceRequest request) {
        PropertyType propertyType = propertyTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property type not found"));
        propertyType.setName(request.name());
        propertyType.setDescription(request.description());
        return referenceMapper.toResponse(propertyType);
    }

    @Transactional
    public void deletePropertyType(Long id) {
        propertyTypeRepository.deleteById(id);
    }

    @Transactional
    public ReferenceResponse createAmenity(ReferenceRequest request) {
        amenityRepository.findByNameIgnoreCase(request.name()).ifPresent(existing -> {
            throw new BadRequestException("Amenity already exists");
        });
        Amenity amenity = amenityRepository.save(Amenity.builder().name(request.name()).icon(request.icon()).build());
        return referenceMapper.toResponse(amenity);
    }

    @Transactional
    public ReferenceResponse updateAmenity(Long id, ReferenceRequest request) {
        Amenity amenity = amenityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found"));
        amenity.setName(request.name());
        amenity.setIcon(request.icon());
        return referenceMapper.toResponse(amenity);
    }

    @Transactional
    public void deleteAmenity(Long id) {
        amenityRepository.deleteById(id);
    }
}

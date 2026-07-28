package com.globalco.propertyrental.service;

import com.globalco.propertyrental.dto.PageResponse;
import com.globalco.propertyrental.dto.PropertyResponse;
import com.globalco.propertyrental.entity.Favourite;
import com.globalco.propertyrental.entity.Property;
import com.globalco.propertyrental.entity.User;
import com.globalco.propertyrental.exception.BadRequestException;
import com.globalco.propertyrental.exception.ResourceNotFoundException;
import com.globalco.propertyrental.mapper.PropertyMapper;
import com.globalco.propertyrental.repository.FavouriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FavouriteService {

    private final FavouriteRepository favouriteRepository;
    private final UserService userService;
    private final PropertyService propertyService;
    private final PropertyMapper propertyMapper;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public PageResponse<PropertyResponse> list(String tenantEmail, Pageable pageable) {
        Page<Favourite> page = favouriteRepository.findByTenant_EmailOrderByCreatedAtDesc(tenantEmail, pageable);
        return new PageResponse<>(
                page.getContent().stream().map(Favourite::getProperty).map(propertyMapper::toResponse).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    @Transactional
    public PropertyResponse add(Long propertyId, String tenantEmail) {
        User tenant = userService.findByEmail(tenantEmail);
        Property property = propertyService.findProperty(propertyId);
        favouriteRepository.findByTenant_EmailAndProperty_Id(tenantEmail, propertyId)
                .ifPresent(existing -> {
                    throw new BadRequestException("Property is already in favourites");
                });
        favouriteRepository.save(Favourite.builder().tenant(tenant).property(property).build());
        property.setFavouriteCount(property.getFavouriteCount() + 1);
        notificationService.create(tenant, "Favourite added", property.getTitle() + " was added to your favourites.", "FAVOURITE_ADDED");
        return propertyMapper.toResponse(property);
    }

    @Transactional
    public void remove(Long propertyId, String tenantEmail) {
        Favourite favourite = favouriteRepository.findByTenant_EmailAndProperty_Id(tenantEmail, propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Favourite not found"));
        Property property = favourite.getProperty();
        favouriteRepository.delete(favourite);
        property.setFavouriteCount(Math.max(0, property.getFavouriteCount() - 1));
    }

    @Transactional(readOnly = true)
    public boolean exists(Long propertyId, String tenantEmail) {
        return favouriteRepository.existsByTenant_EmailAndProperty_Id(tenantEmail, propertyId);
    }
}

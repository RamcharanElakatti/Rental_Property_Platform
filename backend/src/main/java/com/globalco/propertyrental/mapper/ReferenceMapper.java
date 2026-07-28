package com.globalco.propertyrental.mapper;

import com.globalco.propertyrental.dto.ReferenceResponse;
import com.globalco.propertyrental.entity.Amenity;
import com.globalco.propertyrental.entity.Category;
import com.globalco.propertyrental.entity.PropertyType;
import org.springframework.stereotype.Component;

@Component
public class ReferenceMapper {

    public ReferenceResponse toResponse(Category category) {
        return new ReferenceResponse(category.getId(), category.getName(), category.getDescription(), null);
    }

    public ReferenceResponse toResponse(PropertyType propertyType) {
        return new ReferenceResponse(propertyType.getId(), propertyType.getName(), propertyType.getDescription(), null);
    }

    public ReferenceResponse toResponse(Amenity amenity) {
        return new ReferenceResponse(amenity.getId(), amenity.getName(), null, amenity.getIcon());
    }
}

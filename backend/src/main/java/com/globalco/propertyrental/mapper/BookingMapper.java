package com.globalco.propertyrental.mapper;

import com.globalco.propertyrental.dto.BookingResponse;
import com.globalco.propertyrental.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    private final PropertyMapper propertyMapper;
    private final UserMapper userMapper;

    public BookingMapper(PropertyMapper propertyMapper, UserMapper userMapper) {
        this.propertyMapper = propertyMapper;
        this.userMapper = userMapper;
    }

    public BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                propertyMapper.toResponse(booking.getProperty()),
                userMapper.toResponse(booking.getTenant()),
                booking.getPreferredDate(),
                booking.getPreferredTime(),
                booking.getStatus().name(),
                booking.getOwnerNote(),
                booking.getCreatedAt()
        );
    }
}

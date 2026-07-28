package com.globalco.propertyrental.repository;

import com.globalco.propertyrental.entity.Booking;
import com.globalco.propertyrental.entity.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByTenant_EmailOrderByCreatedAtDesc(String email, Pageable pageable);

    Page<Booking> findByProperty_Owner_EmailOrderByCreatedAtDesc(String email, Pageable pageable);

    long countByStatus(BookingStatus status);

    long countByProperty_Owner_EmailAndStatus(String email, BookingStatus status);

    @Query("select b.status, count(b) from Booking b group by b.status")
    List<Object[]> countBookingsByStatus();

    @Query("select b.status, count(b) from Booking b where b.property.owner.email = :email group by b.status")
    List<Object[]> countBookingsByOwnerAndStatus(String email);
}

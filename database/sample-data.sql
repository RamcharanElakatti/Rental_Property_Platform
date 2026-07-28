USE property_rental_marketplace;

INSERT IGNORE INTO roles (id, name) VALUES
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_OWNER'),
  (3, 'ROLE_TENANT');

INSERT IGNORE INTO categories (id, name, description) VALUES
  (1, 'Apartment', 'Urban rental apartments'),
  (2, 'Villa', 'Private premium homes'),
  (3, 'Studio', 'Compact single-room rentals'),
  (4, 'Independent House', 'Standalone family homes'),
  (5, 'Co-Living', 'Managed shared rentals');

INSERT IGNORE INTO property_types (id, name, description) VALUES
  (1, 'Residential', 'Homes and apartments'),
  (2, 'Commercial', 'Office and retail rentals'),
  (3, 'Luxury', 'Premium properties'),
  (4, 'Budget', 'Affordable rentals');

INSERT IGNORE INTO amenities (id, name, icon) VALUES
  (1, 'WiFi', 'wifi'),
  (2, 'Parking', 'parking'),
  (3, 'Power Backup', 'power'),
  (4, 'Lift', 'lift'),
  (5, 'Swimming Pool', 'pool'),
  (6, 'Gym', 'gym'),
  (7, 'Security', 'security'),
  (8, 'Garden', 'garden'),
  (9, 'Pet Friendly', 'pet'),
  (10, 'Air Conditioning', 'ac');

-- Demo password for all sample users: password. Rotate before using imported SQL data outside local demos.
INSERT IGNORE INTO users (id, full_name, email, password, phone, avatar_url, enabled) VALUES
  (1, 'GlobalCo Admin', 'admin@globalco.test', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+1 555 0100', NULL, TRUE),
  (2, 'Avery Stone', 'owner@globalco.test', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+1 555 0188', NULL, TRUE),
  (3, 'Maya Chen', 'tenant@globalco.test', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+1 555 0199', NULL, TRUE);

INSERT IGNORE INTO user_roles (user_id, role_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

INSERT IGNORE INTO properties (
  id, title, description, rent, deposit, bedrooms, bathrooms, area, floor, parking, balcony,
  property_type_id, category_id, city, state, address, zip_code, latitude, longitude, owner_id,
  status, view_count, favourite_count
) VALUES
  (101, 'Sunlit Downtown Apartment', 'Bright walkable rental with secure parking, balcony views, and a dedicated work nook.', 2450.00, 2450.00, 2, 2, 1180, 9, TRUE, TRUE, 1, 1, 'Austin', 'Texas', '400 Congress Ave', '78701', 30.2672, -97.7431, 2, 'AVAILABLE', 428, 34),
  (102, 'Garden Villa Near Tech Park', 'Private villa with a quiet garden, flexible study rooms, and full-time security.', 4200.00, 6000.00, 4, 3, 2650, 1, TRUE, TRUE, 3, 2, 'San Jose', 'California', '88 Willow Glen Way', '95125', 37.3382, -121.8863, 2, 'AVAILABLE', 682, 52),
  (103, 'Compact Studio by Transit', 'Low-maintenance studio close to transit, cafes, and co-working spaces.', 1550.00, 1550.00, 0, 1, 520, 6, FALSE, FALSE, 4, 3, 'Chicago', 'Illinois', '25 Lake St', '60601', 41.8781, -87.6298, 2, 'MAINTENANCE', 239, 18);

INSERT IGNORE INTO property_images (id, property_id, image_url, primary_image) VALUES
  (1001, 101, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', TRUE),
  (1002, 101, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80', FALSE),
  (1003, 102, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80', TRUE),
  (1004, 103, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80', TRUE);

INSERT IGNORE INTO property_amenities (property_id, amenity_id) VALUES
  (101, 1), (101, 2), (101, 4), (101, 6), (101, 7), (101, 10),
  (102, 2), (102, 3), (102, 5), (102, 6), (102, 7), (102, 8), (102, 9), (102, 10),
  (103, 1), (103, 4), (103, 7), (103, 10);

INSERT IGNORE INTO bookings (id, tenant_id, property_id, preferred_date, preferred_time, status, owner_note) VALUES
  (501, 3, 101, '2026-08-02', '10:30:00', 'PENDING', NULL),
  (502, 3, 102, '2026-08-04', '15:00:00', 'APPROVED', 'Gate pass will be shared before the visit.'),
  (503, 3, 103, '2026-07-30', '12:00:00', 'REJECTED', 'Property is currently in maintenance.');

INSERT IGNORE INTO favourites (id, tenant_id, property_id) VALUES
  (601, 3, 101),
  (602, 3, 102);

INSERT IGNORE INTO notifications (id, user_id, title, message, type, is_read) VALUES
  (701, 3, 'Booking approved', 'Your Garden Villa visit is approved.', 'BOOKING_APPROVED', FALSE),
  (702, 2, 'New visit request', 'Maya Chen requested a visit for Sunlit Downtown Apartment.', 'NEW_BOOKING', FALSE),
  (703, 3, 'Profile updated', 'Your profile changes were saved.', 'PROFILE_UPDATED', TRUE);

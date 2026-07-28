CREATE DATABASE IF NOT EXISTS property_rental_marketplace;
USE property_rental_marketplace;

CREATE TABLE IF NOT EXISTS roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  avatar_url VARCHAR(500),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  password_reset_token VARCHAR(80),
  password_reset_token_expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS property_types (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS amenities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  icon VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS properties (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  rent DECIMAL(12,2) NOT NULL,
  deposit DECIMAL(12,2) NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  area INT NOT NULL,
  floor INT,
  parking BOOLEAN DEFAULT FALSE,
  balcony BOOLEAN DEFAULT FALSE,
  property_type_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  address VARCHAR(300) NOT NULL,
  zip_code VARCHAR(20),
  latitude DOUBLE,
  longitude DOUBLE,
  owner_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
  view_count BIGINT NOT NULL DEFAULT 0,
  favourite_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_properties_type FOREIGN KEY (property_type_id) REFERENCES property_types(id),
  CONSTRAINT fk_properties_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_properties_owner FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_state ON properties(state);
CREATE INDEX idx_properties_rent ON properties(rent);
CREATE INDEX idx_properties_status ON properties(status);

CREATE TABLE IF NOT EXISTS property_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(700) NOT NULL,
  primary_image BOOLEAN NOT NULL DEFAULT FALSE,
  property_id BIGINT NOT NULL,
  CONSTRAINT fk_property_images_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS property_amenities (
  property_id BIGINT NOT NULL,
  amenity_id BIGINT NOT NULL,
  PRIMARY KEY (property_id, amenity_id),
  CONSTRAINT fk_property_amenities_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  CONSTRAINT fk_property_amenities_amenity FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  property_id BIGINT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  owner_note VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_tenant FOREIGN KEY (tenant_id) REFERENCES users(id),
  CONSTRAINT fk_bookings_property FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_tenant ON bookings(tenant_id);

CREATE TABLE IF NOT EXISTS favourites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  property_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_favourites_tenant_property (tenant_id, property_id),
  CONSTRAINT fk_favourites_tenant FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favourites_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(140) NOT NULL,
  message VARCHAR(700) NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

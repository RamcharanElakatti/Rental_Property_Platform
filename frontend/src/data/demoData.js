export const imageFor = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
  profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
};

export const demoUsers = [
  {
    id: 1,
    fullName: 'GlobalCo Admin',
    email: 'admin@globalco.test',
    phone: '+1 555 0100',
    avatarUrl: imageFor.profile,
    enabled: true,
    roles: ['ROLE_ADMIN'],
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 2,
    fullName: 'Avery Stone',
    email: 'owner@globalco.test',
    phone: '+1 555 0188',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    enabled: true,
    roles: ['ROLE_OWNER'],
    createdAt: '2026-07-04T10:00:00Z'
  },
  {
    id: 3,
    fullName: 'Maya Chen',
    email: 'tenant@globalco.test',
    phone: '+1 555 0199',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    enabled: true,
    roles: ['ROLE_TENANT'],
    createdAt: '2026-07-08T10:00:00Z'
  }
];

export const categories = [
  { id: 1, name: 'Apartment', description: 'Urban homes', icon: 'apartment' },
  { id: 2, name: 'Villa', description: 'Private premium homes', icon: 'villa' },
  { id: 3, name: 'Studio', description: 'Compact rentals', icon: 'studio' },
  { id: 4, name: 'Independent House', description: 'Standalone homes', icon: 'house' },
  { id: 5, name: 'Co-Living', description: 'Managed shared homes', icon: 'coliving' }
];

export const propertyTypes = [
  { id: 1, name: 'Residential', description: 'Homes and apartments' },
  { id: 2, name: 'Commercial', description: 'Office and retail spaces' },
  { id: 3, name: 'Luxury', description: 'Premium rentals' },
  { id: 4, name: 'Budget', description: 'Affordable rentals' }
];

export const amenities = [
  { id: 1, name: 'WiFi', icon: 'wifi' },
  { id: 2, name: 'Parking', icon: 'parking' },
  { id: 3, name: 'Power Backup', icon: 'power' },
  { id: 4, name: 'Lift', icon: 'lift' },
  { id: 5, name: 'Swimming Pool', icon: 'pool' },
  { id: 6, name: 'Gym', icon: 'gym' },
  { id: 7, name: 'Security', icon: 'security' },
  { id: 8, name: 'Garden', icon: 'garden' },
  { id: 9, name: 'Pet Friendly', icon: 'pet' },
  { id: 10, name: 'Air Conditioning', icon: 'ac' }
];

export const properties = [
  {
    id: 101,
    title: 'Sunlit Downtown Apartment',
    description: 'A bright, walkable rental with secure parking, balcony views, and a dedicated work nook.',
    rent: 2450,
    deposit: 2450,
    bedrooms: 2,
    bathrooms: 2,
    area: 1180,
    floor: 9,
    parking: true,
    balcony: true,
    propertyType: propertyTypes[0],
    category: categories[0],
    city: 'Austin',
    state: 'Texas',
    address: '400 Congress Ave',
    zipCode: '78701',
    latitude: 30.2672,
    longitude: -97.7431,
    owner: demoUsers[1],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80'
    ],
    amenities: amenities.slice(0, 6),
    status: 'AVAILABLE',
    viewCount: 428,
    favouriteCount: 34,
    createdAt: '2026-07-24T09:30:00Z',
    updatedAt: '2026-07-24T09:30:00Z'
  },
  {
    id: 102,
    title: 'Garden Villa Near Tech Park',
    description: 'Private villa with a quiet garden, flexible study rooms, and full-time security.',
    rent: 4200,
    deposit: 6000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2650,
    floor: 1,
    parking: true,
    balcony: true,
    propertyType: propertyTypes[2],
    category: categories[1],
    city: 'San Jose',
    state: 'California',
    address: '88 Willow Glen Way',
    zipCode: '95125',
    latitude: 37.3382,
    longitude: -121.8863,
    owner: demoUsers[1],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80'
    ],
    amenities: amenities.slice(1, 10),
    status: 'AVAILABLE',
    viewCount: 682,
    favouriteCount: 52,
    createdAt: '2026-07-20T09:30:00Z',
    updatedAt: '2026-07-20T09:30:00Z'
  },
  {
    id: 103,
    title: 'Compact Studio by Transit',
    description: 'Low-maintenance studio close to transit, cafes, and co-working spaces.',
    rent: 1550,
    deposit: 1550,
    bedrooms: 0,
    bathrooms: 1,
    area: 520,
    floor: 6,
    parking: false,
    balcony: false,
    propertyType: propertyTypes[3],
    category: categories[2],
    city: 'Chicago',
    state: 'Illinois',
    address: '25 Lake St',
    zipCode: '60601',
    latitude: 41.8781,
    longitude: -87.6298,
    owner: demoUsers[1],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'
    ],
    amenities: [amenities[0], amenities[3], amenities[6], amenities[9]],
    status: 'MAINTENANCE',
    viewCount: 239,
    favouriteCount: 18,
    createdAt: '2026-07-18T09:30:00Z',
    updatedAt: '2026-07-22T09:30:00Z'
  },
  {
    id: 104,
    title: 'Family Home With Courtyard',
    description: 'Three-bedroom home with covered parking, a courtyard, and easy school access.',
    rent: 3100,
    deposit: 4000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    floor: 1,
    parking: true,
    balcony: false,
    propertyType: propertyTypes[0],
    category: categories[3],
    city: 'Charlotte',
    state: 'North Carolina',
    address: '710 Park Road',
    zipCode: '28209',
    latitude: 35.2271,
    longitude: -80.8431,
    owner: demoUsers[1],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80'
    ],
    amenities: [amenities[1], amenities[2], amenities[6], amenities[7], amenities[8]],
    status: 'OCCUPIED',
    viewCount: 371,
    favouriteCount: 27,
    createdAt: '2026-07-16T09:30:00Z',
    updatedAt: '2026-07-22T09:30:00Z'
  }
];

export const bookings = [
  { id: 501, property: properties[0], tenant: demoUsers[2], preferredDate: '2026-08-02', preferredTime: '10:30', status: 'PENDING', ownerNote: '', createdAt: '2026-07-27T12:00:00Z' },
  { id: 502, property: properties[1], tenant: demoUsers[2], preferredDate: '2026-08-04', preferredTime: '15:00', status: 'APPROVED', ownerNote: 'Gate pass will be shared before the visit.', createdAt: '2026-07-26T12:00:00Z' },
  { id: 503, property: properties[3], tenant: demoUsers[2], preferredDate: '2026-07-30', preferredTime: '12:00', status: 'REJECTED', ownerNote: 'Property is currently occupied.', createdAt: '2026-07-25T12:00:00Z' }
];

export const notifications = [
  { id: 701, title: 'Booking approved', message: 'Your Garden Villa visit is approved.', type: 'BOOKING_APPROVED', read: false, createdAt: '2026-07-27T10:00:00Z' },
  { id: 702, title: 'New property', message: 'A new Austin apartment matches your saved filters.', type: 'NEW_PROPERTY', read: false, createdAt: '2026-07-26T10:00:00Z' },
  { id: 703, title: 'Profile updated', message: 'Your profile changes were saved.', type: 'PROFILE_UPDATED', read: true, createdAt: '2026-07-25T10:00:00Z' }
];

export const adminStats = {
  totalUsers: 1284,
  totalOwners: 184,
  totalTenants: 1100,
  totalProperties: 642,
  activeListings: 508,
  pendingBookings: 42,
  approvedBookings: 218,
  rejectedBookings: 31,
  favourites: 3904,
  propertiesByCity: { Austin: 132, Chicago: 118, Charlotte: 94, 'San Jose': 81 },
  bookingsByStatus: { PENDING: 42, APPROVED: 218, REJECTED: 31, COMPLETED: 129 }
};

export const ownerStats = {
  totalProperties: 18,
  activeListings: 14,
  pendingBookings: 7,
  approvedBookings: 21,
  rejectedBookings: 4,
  totalViews: 12840,
  favouriteCount: 734,
  bookingsByStatus: { PENDING: 7, APPROVED: 21, REJECTED: 4, COMPLETED: 12 }
};

const countBy = (items, selector) => items.reduce((result, item) => {
  const key = selector(item);
  result[key] = (result[key] || 0) + 1;
  return result;
}, {});

export const adminReports = {
  totalUsers: adminStats.totalUsers,
  totalOwners: adminStats.totalOwners,
  totalTenants: adminStats.totalTenants,
  totalProperties: adminStats.totalProperties,
  activeListings: adminStats.activeListings,
  occupiedProperties: properties.filter((property) => property.status === 'OCCUPIED').length,
  maintenanceProperties: properties.filter((property) => property.status === 'MAINTENANCE').length,
  totalBookings: bookings.length,
  pendingBookings: adminStats.pendingBookings,
  approvedBookings: adminStats.approvedBookings,
  rejectedBookings: adminStats.rejectedBookings,
  completedBookings: adminStats.bookingsByStatus.COMPLETED,
  cancelledBookings: 0,
  favourites: adminStats.favourites,
  usersByRole: countBy(demoUsers, (user) => user.roles[0]),
  propertiesByStatus: countBy(properties, (property) => property.status),
  propertiesByCity: adminStats.propertiesByCity,
  bookingsByStatus: adminStats.bookingsByStatus
};

export function paged(content, page = 0, size = 12) {
  return {
    content,
    page,
    size,
    totalElements: content.length,
    totalPages: Math.max(1, Math.ceil(content.length / size)),
    last: true
  };
}

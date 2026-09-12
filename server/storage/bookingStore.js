import { db } from './database.js';

/**
 * Map database row (snake_case) to domain object (camelCase)
 */
const mapRowToBooking = (row) => {
  if (!row) return null;
  
  let parsedServices = [];
  try {
    parsedServices = typeof row.services === 'string' ? JSON.parse(row.services) : row.services;
  } catch (_e) {
    parsedServices = [];
  }

  return {
    id: row.id,
    bookingId: row.booking_id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email || undefined,
    preferredPickupTime: row.preferred_pickup_time,
    services: parsedServices,
    otherServices: row.other_services || undefined,
    pickupAddress: row.pickup_address,
    area: row.area || undefined,
    latitude: row.latitude !== null && row.latitude !== undefined ? Number(row.latitude) : undefined,
    longitude: row.longitude !== null && row.longitude !== undefined ? Number(row.longitude) : undefined,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

/**
 * Get all stored bookings from SQLite
 * @returns {Array}
 */
export const getAllBookings = () => {
  const stmt = db.prepare('SELECT * FROM pickup_bookings ORDER BY id DESC');
  const rows = stmt.all();
  return rows.map(mapRowToBooking);
};

/**
 * Find booking by Booking ID
 * @param {string} bookingId 
 * @returns {Object|null}
 */
export const findBookingById = (bookingId) => {
  const stmt = db.prepare('SELECT * FROM pickup_bookings WHERE booking_id = ?');
  const row = stmt.get(bookingId);
  return mapRowToBooking(row);
};

/**
 * Save a new booking record to SQLite
 * @param {Object} booking 
 * @returns {Object}
 */
export const saveBooking = (booking) => {
  const {
    bookingId,
    fullName,
    phone,
    email,
    preferredPickupTime,
    services,
    otherServices,
    pickupAddress,
    area,
    latitude,
    longitude,
    source = 'website',
    status = 'NEW',
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  } = booking;

  const servicesJson = typeof services === 'string' ? services : JSON.stringify(services || []);

  const stmt = db.prepare(`
    INSERT INTO pickup_bookings (
      booking_id,
      full_name,
      phone,
      email,
      preferred_pickup_time,
      services,
      other_services,
      pickup_address,
      area,
      latitude,
      longitude,
      source,
      status,
      created_at,
      updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  stmt.run(
    bookingId,
    fullName,
    phone,
    email || null,
    preferredPickupTime,
    servicesJson,
    otherServices || null,
    pickupAddress,
    area || null,
    latitude !== undefined ? latitude : null,
    longitude !== undefined ? longitude : null,
    source,
    status,
    createdAt,
    updatedAt
  );

  return findBookingById(bookingId);
};

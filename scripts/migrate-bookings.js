import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { saveBooking, findBookingById } from '../server/storage/bookingStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKINGS_JSON_FILE = path.join(__dirname, '../server/data/bookings.json');

function runMigration() {
  console.log('[Migration] Checking for legacy bookings.json...');

  if (!fs.existsSync(BOOKINGS_JSON_FILE)) {
    console.log('[Migration] No bookings.json file found. Nothing to migrate.');
    return;
  }

  let rawData = '';
  try {
    rawData = fs.readFileSync(BOOKINGS_JSON_FILE, 'utf-8');
  } catch (err) {
    console.error('[Migration] Failed to read bookings.json:', err.message);
    return;
  }

  let jsonBookings = [];
  try {
    jsonBookings = JSON.parse(rawData || '[]');
  } catch (err) {
    console.error('[Migration] Failed to parse bookings.json:', err.message);
    return;
  }

  if (!Array.isArray(jsonBookings) || jsonBookings.length === 0) {
    console.log('[Migration] bookings.json is empty. 0 records to migrate.');
    return;
  }

  let migratedCount = 0;
  let skippedCount = 0;

  for (const record of jsonBookings) {
    if (!record.bookingId) continue;

    const existing = findBookingById(record.bookingId);
    if (existing) {
      skippedCount++;
    } else {
      saveBooking(record);
      migratedCount++;
    }
  }

  console.log(`[Migration] Completed: ${migratedCount} bookings migrated into SQLite, ${skippedCount} skipped (already present).`);
  console.log(`[Note] server/data/bookings.json has been preserved as a backup source.`);
}

runMigration();

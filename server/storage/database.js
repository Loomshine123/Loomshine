import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get SQLite Database Instance
 */
const getDbPath = () => {
  if (process.env.DATABASE_PATH) {
    return path.resolve(process.cwd(), process.env.DATABASE_PATH);
  }
  return path.join(__dirname, '../data/loomshine.sqlite');
};

const dbPath = getDbPath();
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);

// Enable WAL mode for performance & concurrency
db.pragma('journal_mode = WAL');

/**
 * Initialize Database Schema
 */
export const initDatabase = () => {
  const schema = `
    CREATE TABLE IF NOT EXISTS pickup_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      preferred_pickup_time TEXT NOT NULL,
      services TEXT NOT NULL,
      other_services TEXT,
      pickup_address TEXT NOT NULL,
      area TEXT,
      latitude REAL,
      longitude REAL,
      source TEXT NOT NULL DEFAULT 'website',
      status TEXT NOT NULL DEFAULT 'NEW',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `;
  db.exec(schema);
};

// Initialize schema immediately upon module load
initDatabase();

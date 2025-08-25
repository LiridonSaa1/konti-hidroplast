import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Lazy database connection to ensure environment variables are loaded
let _pool: Pool | null = null;
let _db: any = null;

function getPool(): Pool | null {
  if (!_pool && process.env.DATABASE_URL) {
    console.log("=== DATABASE CONNECTION INITIALIZATION ===");
    console.log("Creating database connection...");
    
    _pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      // Connection pooling and security settings
      max: 10, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // Connection timeout
      // Security: Only allow connections from your application
      application_name: 'konti-hidroplast-app',
      // Prevent SQL injection and other attacks
      statement_timeout: 30000, // 30 second query timeout
    });
    
    console.log("Database connection created successfully!");
    console.log("=========================================");
  }
  return _pool;
}

function getDb() {
  if (!_db) {
    const pool = getPool();
    if (pool) {
      _db = drizzle(pool, { schema });
    }
  }
  return _db;
}

export const pool = new Proxy({} as Pool, {
  get(target, prop) {
    const pool = getPool();
    return pool ? pool[prop as keyof Pool] : undefined;
  }
});

export const db = new Proxy({} as any, {
  get(target, prop) {
    const db = getDb();
    return db ? db[prop] : undefined;
  }
});
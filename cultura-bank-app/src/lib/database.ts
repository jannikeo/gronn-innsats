import { Pool } from 'pg';

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connected successfully:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Execute a query
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Get a single row
export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}

// Transaction support
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Graceful shutdown
export async function closePool() {
  await pool.end();
  console.log('Database pool closed');
}

// Types for our main entities
export interface User {
  id: string;
  agent_id: number;
  email: string;
  full_name: string;
  display_name: string;
  password_hash: string;
  is_cultura_customer: boolean;
  monthly_bonus_points: number;
  created_at: Date;
  updated_at: Date;
}

export interface Mission {
  id: string;
  user_id: string;
  type: 'veggie' | 'tips' | 'repair' | 'shopping';
  status: 'completed' | 'pending' | 'rejected';
  points_earned: number;
  points_breakdown: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tip {
  id: string;
  mission_id: string;
  user_id: string;
  category: string;
  content: string;
  background?: string;
  has_photo: boolean;
  photo_url?: string;
  tested_self: boolean;
  measurable: boolean;
  share_consent: boolean;
  marketing_consent: boolean;
  photo_consent: boolean;
  status: 'published' | 'pending' | 'rejected';
  views: number;
  created_at: Date;
  updated_at: Date;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  requirement_type: string;
  requirement_value?: number;
  created_at: Date;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: Date;
  achievement?: Achievement;
}

export default pool;
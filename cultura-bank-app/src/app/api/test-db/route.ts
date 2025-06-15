import { NextResponse } from 'next/server';
import { testConnection, query } from '@/lib/database';

export async function GET() {
  try {
    // Test basic connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Test a simple query
    const users = await query('SELECT agent_id, display_name, is_cultura_customer FROM users LIMIT 5');
    const achievements = await query('SELECT code, name, icon FROM achievements LIMIT 3');
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        users,
        achievements,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
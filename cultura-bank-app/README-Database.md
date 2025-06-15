# Database Setup for Operasjon Grønn Innsats

## Overview
This document describes the PostgreSQL database structure for the Cultura Bank environmental competition app.

## Database Structure

### Core Tables

#### Users (`users`)
- Primary user accounts with authentication
- Agent ID system for user identification
- Cultura Bank customer integration
- Role-based access control

#### User Profiles (`user_profiles`)
- Extended user information (bio, city, preferences)
- Avatar and personal customization

#### Missions (`missions`)
- User-submitted environmental tasks
- Four types: food, tips, repair, shopping
- Point calculation and moderation workflow
- JSON storage for flexible form data

#### Monthly Competitions (`monthly_competitions`)
- Monthly contest periods with themes
- Qualification thresholds and bonus multipliers
- Drawing dates and active period management

#### User Monthly Stats (`user_monthly_stats`)
- Leaderboard rankings and statistics
- Point totals and mission counts
- Qualification status tracking

### Gamification Tables

#### Achievements (`achievements`)
- System-defined accomplishments
- Different types: monthly winners, streaks, mission masters

#### Badges (`badges`)
- User profile badges with requirements
- Visual indicators of expertise areas

#### Notifications (`notifications`)
- In-app messaging system
- Achievement alerts and status updates

### Supporting Tables

#### Mission Tips (`mission_tips`)
- User-generated environmental tips
- Content moderation workflow

#### Activity Log (`activity_log`)
- User action tracking for analytics

#### System Settings (`system_settings`)
- Configurable app parameters

## Setup Instructions

### 1. Environment Setup
Copy the environment template:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials.

### 2. Start Database
Using Docker Compose:
```bash
docker-compose up -d postgres
```

This will:
- Start PostgreSQL 15 with Alpine Linux
- Create the database `cultura_bank_app`
- Run initialization scripts from `database/init/`
- Set up sample data for testing

### 3. Database Access
- **Direct connection**: `localhost:5432`
- **Web admin**: http://localhost:8080 (Adminer)
  - Server: `postgres`
  - Username: `cultura_user`
  - Password: `cultura_password_2025`
  - Database: `cultura_bank_app`

### 4. Application Integration
The app uses the database utilities in `src/lib/`:
- `database.ts` - Connection pool and basic queries
- `database-types.ts` - TypeScript interfaces
- `database-queries.ts` - Specific query functions

## Sample Data

The database includes realistic test data:
- 9 sample users with Agent IDs 1001-1078 and 1247
- Current January 2025 competition
- Completed missions and points
- Leaderboard rankings
- Badges and achievements
- User notifications

### Key Test Users
- **Agent #1247** (Kari Johansen) - Current user in app
- **Agent #1001** (Maria Nordahl) - Rank 1, 320 points
- **Agent #1002** (Lars Hansen) - Rank 2, 285 points
- **Agent #1003** (Kari Solberg) - Rank 3, 270 points

## Database Features

### Performance
- Comprehensive indexing on frequently queried columns
- Connection pooling for concurrent requests
- Optimized queries for leaderboard and statistics

### Data Integrity
- Foreign key constraints
- Enum types for controlled values
- UUID primary keys for security
- Automatic timestamp triggers

### Scalability
- Modular table design
- JSON fields for flexible data storage
- Efficient ranking calculations
- Archive-ready structure for historical data

### Security
- Role-based access control
- Password hashing (ready for bcrypt)
- Session management tables
- Activity logging for audit trails

## Development Workflows

### Adding New Mission Types
1. Update `mission_type` enum in schema
2. Add type handling in application logic
3. Update scoring algorithms

### Monthly Competition Management
1. Create new competition record
2. Set previous month as inactive
3. Reset user statistics for new period
4. Update qualification thresholds

### User Management
- User registration flow
- Email verification system
- Password reset functionality
- Profile customization

## Monitoring and Maintenance

### Health Checks
The database includes health check endpoints and connection testing utilities.

### Backup Strategy
- Regular automated backups recommended
- Point-in-time recovery capability
- Development data refresh procedures

### Analytics
- User activity tracking
- Mission completion statistics
- Engagement metrics
- Cultura Bank integration analytics

## Integration Points

### Cultura Bank API
- Customer status verification
- Bonus point calculations
- Marketing consent management

### File Upload System
- Mission photos and evidence
- User avatars
- Content moderation images

### Email System
- Verification emails
- Achievement notifications
- Monthly summary reports

This database structure supports the full functionality of the Operasjon Grønn Innsats application while maintaining flexibility for future enhancements.
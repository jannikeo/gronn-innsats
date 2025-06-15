// Database query functions for Operasjon Grønn Innsats
import { query, queryOne } from './database';
import type {
  User,
  UserProfile,
  Mission,
  MonthlyCompetition,
  UserMonthlyStats,
  Achievement,
  Badge,
  Notification,
  UserBadge,
  UserAchievement
} from './database-types';

// User queries
export async function getCurrentCompetition(): Promise<MonthlyCompetition | null> {
  return await queryOne<MonthlyCompetition>(
    'SELECT * FROM monthly_competitions WHERE is_active = true LIMIT 1'
  );
}

export async function getUserByAgentId(agentId: number): Promise<User | null> {
  return await queryOne<User>(
    'SELECT * FROM users WHERE agent_id = $1 AND is_active = true',
    [agentId]
  );
}

export async function getUserById(userId: string): Promise<User | null> {
  return await queryOne<User>(
    'SELECT * FROM users WHERE id = $1 AND is_active = true',
    [userId]
  );
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  return await queryOne<UserProfile>(
    'SELECT * FROM user_profiles WHERE user_id = $1',
    [userId]
  );
}

// Stats and leaderboard queries
export async function getUserStats(userId: string, competitionId: string): Promise<UserMonthlyStats | null> {
  return await queryOne<UserMonthlyStats>(
    'SELECT * FROM user_monthly_stats WHERE user_id = $1 AND competition_id = $2',
    [userId, competitionId]
  );
}

export async function getLeaderboard(competitionId: string, limit: number = 100): Promise<any[]> {
  return await query(
    `SELECT 
      ums.rank, 
      ums.total_points, 
      ums.missions_completed,
      ums.is_qualified,
      u.agent_id, 
      u.full_name,
      u.is_cultura_customer,
      COALESCE(
        ARRAY_AGG(b.display_name ORDER BY ub.earned_at) FILTER (WHERE b.display_name IS NOT NULL), 
        ARRAY[]::text[]
      ) as badges
    FROM user_monthly_stats ums
    JOIN users u ON ums.user_id = u.id
    LEFT JOIN user_badges ub ON u.id = ub.user_id AND (ub.expires_at IS NULL OR ub.expires_at > NOW())
    LEFT JOIN badges b ON ub.badge_id = b.id AND b.is_active = true
    WHERE ums.competition_id = $1 AND ums.rank IS NOT NULL
    GROUP BY ums.rank, ums.total_points, ums.missions_completed, ums.is_qualified, u.agent_id, u.full_name, u.is_cultura_customer
    ORDER BY ums.rank ASC
    LIMIT $2`,
    [competitionId, limit]
  );
}

export async function getTopThreeLeaderboard(competitionId: string): Promise<any[]> {
  return await query(
    `SELECT 
      ums.rank, 
      ums.total_points, 
      u.agent_id, 
      u.full_name,
      SUBSTRING(u.full_name FROM 1 FOR 1) || SUBSTRING(u.full_name FROM POSITION(' ' IN u.full_name) + 1 FOR 1) as display_name,
      COALESCE(
        ARRAY_AGG(b.display_name ORDER BY ub.earned_at) FILTER (WHERE b.display_name IS NOT NULL), 
        ARRAY[]::text[]
      ) as badges
    FROM user_monthly_stats ums
    JOIN users u ON ums.user_id = u.id
    LEFT JOIN user_badges ub ON u.id = ub.user_id AND (ub.expires_at IS NULL OR ub.expires_at > NOW())
    LEFT JOIN badges b ON ub.badge_id = b.id AND b.is_active = true
    WHERE ums.competition_id = $1 AND ums.rank <= 3
    GROUP BY ums.rank, ums.total_points, u.agent_id, u.full_name
    ORDER BY ums.rank ASC`,
    [competitionId]
  );
}

export async function getCompetitionStats(competitionId: string): Promise<any> {
  return await queryOne(
    `SELECT 
      COUNT(DISTINCT ums.user_id) as active_agents,
      COUNT(DISTINCT CASE WHEN ums.is_qualified THEN ums.user_id END) as qualified_agents,
      SUM(ums.missions_completed) as total_missions,
      (SELECT qualification_threshold FROM monthly_competitions WHERE id = $1) as qualification_threshold
    FROM user_monthly_stats ums
    WHERE ums.competition_id = $1`,
    [competitionId]
  );
}

// Mission queries
export async function getUserMissions(userId: string, limit: number = 20): Promise<Mission[]> {
  return await query<Mission>(
    `SELECT * FROM missions 
     WHERE user_id = $1 
     ORDER BY submitted_at DESC 
     LIMIT $2`,
    [userId, limit]
  );
}

export async function getUserMissionsByType(userId: string, type: string, limit: number = 10): Promise<Mission[]> {
  return await query<Mission>(
    `SELECT * FROM missions 
     WHERE user_id = $1 AND type = $2 AND status = 'approved'
     ORDER BY submitted_at DESC 
     LIMIT $3`,
    [userId, type, limit]
  );
}

export async function getRecentApprovedMissions(userId: string, limit: number = 10): Promise<any[]> {
  return await query(
    `SELECT 
      m.*,
      CASE 
        WHEN m.type = 'food' THEN '🥗'
        WHEN m.type = 'tips' THEN '💡'
        WHEN m.type = 'repair' THEN '🔧'
        WHEN m.type = 'shopping' THEN '🛒'
      END as icon
    FROM missions m 
    WHERE m.user_id = $1 AND m.status = 'approved'
    ORDER BY m.approved_at DESC 
    LIMIT $2`,
    [userId, limit]
  );
}

// Badge and achievement queries
export async function getUserBadges(userId: string): Promise<any[]> {
  return await query(
    `SELECT b.*, ub.earned_at 
     FROM user_badges ub
     JOIN badges b ON ub.badge_id = b.id
     WHERE ub.user_id = $1 AND b.is_active = true
     AND (ub.expires_at IS NULL OR ub.expires_at > NOW())
     ORDER BY ub.earned_at DESC`,
    [userId]
  );
}

export async function getUserAchievements(userId: string): Promise<any[]> {
  return await query(
    `SELECT a.*, ua.earned_at, ua.competition_id
     FROM user_achievements ua
     JOIN achievements a ON ua.achievement_id = a.id
     WHERE ua.user_id = $1 AND a.is_active = true
     ORDER BY ua.earned_at DESC`,
    [userId]
  );
}

// Notification queries
export async function getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
  const whereClause = unreadOnly 
    ? 'WHERE user_id = $1 AND read_at IS NULL AND (expires_at IS NULL OR expires_at > NOW())'
    : 'WHERE user_id = $1 AND (expires_at IS NULL OR expires_at > NOW())';
  
  return await query<Notification>(
    `SELECT * FROM notifications 
     ${whereClause}
     ORDER BY created_at DESC 
     LIMIT 50`,
    [userId]
  );
}

export async function markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
  const result = await query(
    'UPDATE notifications SET read_at = NOW() WHERE id = $1 AND user_id = $2',
    [notificationId, userId]
  );
  return result.length > 0;
}

// Weekly data for charts
export async function getUserWeeklyPoints(userId: string, competitionId: string): Promise<any[]> {
  return await query(
    `SELECT 
      EXTRACT(WEEK FROM m.submitted_at) as week,
      SUM(m.total_points) as points
    FROM missions m
    JOIN user_monthly_stats ums ON m.user_id = ums.user_id
    WHERE m.user_id = $1 AND ums.competition_id = $2 AND m.status = 'approved'
    GROUP BY EXTRACT(WEEK FROM m.submitted_at)
    ORDER BY week`,
    [userId, competitionId]
  );
}

// Goal tracking
export async function getUserGoalProgress(userId: string, competitionId: string): Promise<any> {
  return await queryOne(
    `SELECT 
      ums.missions_completed,
      ums.total_points,
      ums.is_qualified,
      ums.streak_days,
      mc.qualification_threshold,
      (SELECT COUNT(*) FROM missions WHERE user_id = $1 AND EXTRACT(MONTH FROM submitted_at) = mc.month AND EXTRACT(YEAR FROM submitted_at) = mc.year) as monthly_missions,
      CASE 
        WHEN ums.rank <= 10 THEN true 
        ELSE false 
      END as is_top_ten
    FROM user_monthly_stats ums
    JOIN monthly_competitions mc ON ums.competition_id = mc.id
    WHERE ums.user_id = $1 AND ums.competition_id = $2`,
    [userId, competitionId]
  );
}

// Statistics for status page
export async function getUserYearlyStats(userId: string, year: number): Promise<any> {
  return await queryOne(
    `SELECT 
      SUM(ums.total_points) as total_points_year,
      SUM(ums.missions_completed) as total_missions_year,
      MIN(ums.rank) as best_rank,
      COUNT(CASE WHEN ums.is_qualified THEN 1 END) as qualified_months,
      COUNT(*) as active_months,
      (SELECT month FROM monthly_competitions mc 
       JOIN user_monthly_stats ums2 ON mc.id = ums2.competition_id 
       WHERE ums2.user_id = $1 AND mc.year = $2 AND ums2.rank = (
         SELECT MIN(rank) FROM user_monthly_stats ums3 
         JOIN monthly_competitions mc2 ON ums3.competition_id = mc2.id 
         WHERE ums3.user_id = $1 AND mc2.year = $2
       ) LIMIT 1) as best_month
    FROM user_monthly_stats ums
    JOIN monthly_competitions mc ON ums.competition_id = mc.id
    WHERE ums.user_id = $1 AND mc.year = $2`,
    [userId, year]
  );
}

// Create mission
export async function createMission(missionData: {
  user_id: string;
  type: string;
  title: string;
  description?: string;
  base_points: number;
  bonus_points: number;
  submission_data?: any;
}): Promise<Mission | null> {
  return await queryOne<Mission>(
    `INSERT INTO missions (user_id, type, title, description, base_points, bonus_points, submission_data)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      missionData.user_id,
      missionData.type,
      missionData.title,
      missionData.description,
      missionData.base_points,
      missionData.bonus_points,
      missionData.submission_data
    ]
  );
}

// Update user stats
export async function updateUserMonthlyStats(
  userId: string, 
  competitionId: string, 
  pointsToAdd: number, 
  missionCompleted: boolean = true
): Promise<void> {
  await query(
    `INSERT INTO user_monthly_stats (user_id, competition_id, total_points, missions_completed, is_qualified)
     VALUES ($1, $2, $3, $4, $3 >= (SELECT qualification_threshold FROM monthly_competitions WHERE id = $2))
     ON CONFLICT (user_id, competition_id)
     DO UPDATE SET 
       total_points = user_monthly_stats.total_points + $3,
       missions_completed = user_monthly_stats.missions_completed + $5,
       is_qualified = (user_monthly_stats.total_points + $3) >= (SELECT qualification_threshold FROM monthly_competitions WHERE id = $2),
       updated_at = NOW()`,
    [userId, competitionId, pointsToAdd, missionCompleted ? 1 : 0, missionCompleted ? 1 : 0]
  );
}
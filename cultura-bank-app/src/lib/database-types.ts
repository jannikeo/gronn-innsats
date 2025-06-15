// Enhanced database types that match the comprehensive schema

export interface User {
  id: string;
  agent_id: number;
  email: string;
  full_name: string;
  password_hash: string;
  role: 'user' | 'admin' | 'moderator';
  is_cultura_customer: boolean;
  marketing_consent: boolean;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string;
  avatar_url?: string;
  bio?: string;
  city?: string;
  preferred_language: string;
  timezone: string;
  created_at: Date;
  updated_at: Date;
}

export interface Mission {
  id: string;
  user_id: string;
  type: 'food' | 'tips' | 'repair' | 'shopping';
  title: string;
  description?: string;
  image_url?: string;
  base_points: number;
  bonus_points: number;
  total_points: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  moderator_notes?: string;
  moderator_id?: string;
  submission_data?: any;
  submitted_at: Date;
  reviewed_at?: Date;
  approved_at?: Date;
}

export interface MonthlyCompetition {
  id: string;
  year: number;
  month: number;
  theme?: string;
  description?: string;
  bonus_multiplier: number;
  qualification_threshold: number;
  is_active: boolean;
  start_date: Date;
  end_date: Date;
  drawing_date?: Date;
  created_at: Date;
}

export interface UserMonthlyStats {
  id: string;
  user_id: string;
  competition_id: string;
  total_points: number;
  missions_completed: number;
  rank?: number;
  is_qualified: boolean;
  streak_days: number;
  last_activity_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  type: 'monthly_winner' | 'top_10' | 'streak' | 'mission_master' | 'eco_warrior' | 'cultura_champion';
  icon?: string;
  points_required?: number;
  is_active: boolean;
  created_at: Date;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: Date;
  competition_id?: string;
}

export interface Badge {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  icon?: string;
  color?: string;
  requirements?: any;
  is_active: boolean;
  created_at: Date;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: Date;
  expires_at?: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'mission_approved' | 'achievement_earned' | 'monthly_winner' | 'ranking_update' | 'sistema_update';
  title: string;
  message: string;
  data?: any;
  read_at?: Date;
  created_at: Date;
  expires_at?: Date;
}

export interface MissionTip {
  id: string;
  mission_id: string;
  content: string;
  is_approved: boolean;
  is_featured: boolean;
  moderator_id?: string;
  moderated_at?: Date;
  created_at: Date;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: Date;
  created_at: Date;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  updated_by?: string;
  created_at: Date;
  updated_at: Date;
}
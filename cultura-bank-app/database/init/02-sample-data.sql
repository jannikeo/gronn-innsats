-- Sample data for Operasjon Grønn Innsats
-- This file populates the database with realistic test data

-- Insert current monthly competition (January 2025)
INSERT INTO monthly_competitions (year, month, theme, description, bonus_multiplier, qualification_threshold, is_active, start_date, end_date, drawing_date) VALUES
(2025, 1, 'NULL-AVFALL', 'Januar utfordring med fokus på å redusere avfall til null', 1.05, 145, true, '2025-01-01', '2025-01-31', '2025-02-01'),
(2025, 2, 'ENERGISPARING', 'Februar fokus på å spare energi i hverdagen', 1.0, 150, false, '2025-02-01', '2025-02-28', '2025-03-01'),
(2025, 3, 'GRØNN TRANSPORT', 'Mars måned for miljøvennlig transport', 1.0, 155, false, '2025-03-01', '2025-03-31', '2025-04-01');

-- Insert sample users
INSERT INTO users (agent_id, email, full_name, password_hash, is_cultura_customer, marketing_consent, email_verified, created_at) VALUES
(1247, 'agent1247@example.com', 'Kari Johansen', '$2b$10$hash_placeholder_1247', true, true, true, '2024-12-20 10:00:00'),
(1001, 'maria.nordahl@example.com', 'Maria Nordahl', '$2b$10$hash_placeholder_1001', true, true, true, '2024-12-15 09:30:00'),
(1002, 'lars.hansen@example.com', 'Lars Hansen', '$2b$10$hash_placeholder_1002', true, false, true, '2024-12-18 14:20:00'),
(1003, 'kari.solberg@example.com', 'Kari Solberg', '$2b$10$hash_placeholder_1003', false, true, true, '2024-12-22 11:45:00'),
(1004, 'ola.eriksen@example.com', 'Ola Eriksen', '$2b$10$hash_placeholder_1004', true, true, true, '2024-12-10 16:15:00'),
(1005, 'emma.johansen@example.com', 'Emma Johansen', '$2b$10$hash_placeholder_1005', false, false, true, '2024-12-25 08:30:00'),
(1006, 'thomas.lie@example.com', 'Thomas Lie', '$2b$10$hash_placeholder_1006', true, true, true, '2024-12-12 12:00:00'),
(1007, 'anne.bakken@example.com', 'Anne Bakken', '$2b$10$hash_placeholder_1007', false, true, true, '2024-12-28 15:45:00'),
(1078, 'per.moen@example.com', 'Per Moen', '$2b$10$hash_placeholder_1078', false, false, true, '2024-12-30 09:20:00');

-- Insert user profiles
INSERT INTO user_profiles (user_id, city, bio) VALUES
((SELECT id FROM users WHERE agent_id = 1247), 'Oslo', 'Miljøbevisst agent som brenner for bærekraft'),
((SELECT id FROM users WHERE agent_id = 1001), 'Bergen', 'Matentusiast som elsker å lage vegetarmat'),
((SELECT id FROM users WHERE agent_id = 1002), 'Trondheim', 'Handyman som reparerer alt fra klær til møbler'),
((SELECT id FROM users WHERE agent_id = 1003), 'Stavanger', 'Økologisk shopping-ekspert'),
((SELECT id FROM users WHERE agent_id = 1004), 'Tromsø', 'Reparatør som gir nytt liv til gamle ting'),
((SELECT id FROM users WHERE agent_id = 1005), 'Kristiansand', 'Vegetarkokk i hverdagen'),
((SELECT id FROM users WHERE agent_id = 1006), 'Ålesund', 'Miljøentusiast og kunnskapsagent'),
((SELECT id FROM users WHERE agent_id = 1007), 'Bodø', 'Shopping-guru med økologisk fokus'),
((SELECT id FROM users WHERE agent_id = 1078), 'Drammen', 'Nybegynner som ønsker å lære');

-- Insert achievements
INSERT INTO achievements (name, description, type, icon, points_required) VALUES
('Månedens Vinner', 'Vant førsteplass i månedlig konkurranse', 'monthly_winner', '🏆', 0),
('Topp 10', 'Oppnådde topp 10 plassering i månedlig konkurranse', 'top_10', '🥇', 200),
('Streak Master', 'Fullførte oppdrag 7 dager på rad', 'streak', '🔥', 0),
('Matmester', 'Fullførte 10 vegetar-oppdrag', 'mission_master', '🥗', 0),
('Reparatør', 'Fullførte 5 reparasjonsoppdrag', 'mission_master', '🔧', 0),
('Handleguru', 'Fullførte 8 handle-oppdrag', 'mission_master', '🛒', 0),
('Kunnskaps-agent', 'Delte 5 miljøtips', 'mission_master', '💡', 0),
('Cultura Champion', 'Spesielt for Cultura Bank kunder', 'cultura_champion', '🏦', 0),
('Nybegynner', 'Fullførte første oppdrag', 'eco_warrior', '🌱', 0);

-- Insert badges
INSERT INTO badges (name, display_name, description, icon, color, requirements) VALUES
('matmester', 'Matmester', 'Ekspert på vegetarmat', '🥗', 'green', '{"food_missions": 10}'),
('reparator', 'Reparatør', 'Gir nytt liv til gamle ting', '🔧', 'orange', '{"repair_missions": 5}'),
('handleguru', 'Handleguru', 'Økologisk shopping-ekspert', '🛒', 'blue', '{"shopping_missions": 8}'),
('kunnskaps_agent', 'Kunnskaps-agent', 'Deler verdifull miljøkunnskap', '💡', 'yellow', '{"tips_missions": 5}'),
('cultura', 'Cultura', 'Cultura Bank kunde', '🏦', 'gold', '{"is_cultura_customer": true}'),
('nybegynner', 'Nybegynner', 'Ny i miljøkampen', '🌱', 'green', '{"missions_completed": 1}');

-- Insert sample missions for current month
-- User 1247 (current user) missions
INSERT INTO missions (user_id, type, title, description, base_points, bonus_points, status, submission_data, submitted_at, approved_at) VALUES
((SELECT id FROM users WHERE agent_id = 1247), 'food', 'Hjemmelaget pasta med grønnsaker', 'Laget vegetar middag med lokale grønnsaker', 15, 15, 'approved', '{"ingredients": "pasta, brokkoli, paprika, løk", "local_ingredients": true, "photo_url": "/uploads/pasta1247.jpg"}', '2025-01-28 18:30:00', '2025-01-28 19:00:00'),
((SELECT id FROM users WHERE agent_id = 1247), 'repair', 'Sys hull i favorittkjolen', 'Reparerte en kjole istedenfor å kaste den', 20, 20, 'approved', '{"item": "kjole", "repair_type": "sying", "before_photo": "/uploads/dress_before1247.jpg", "after_photo": "/uploads/dress_after1247.jpg"}', '2025-01-26 14:20:00', '2025-01-26 15:00:00'),
((SELECT id FROM users WHERE agent_id = 1247), 'shopping', '7 produkter registrert på Coop', 'Handlet økologiske produkter', 15, 20, 'approved', '{"store": "Coop", "organic_products": 7, "own_bag": true, "receipt_photo": "/uploads/receipt1247.jpg"}', '2025-01-24 16:45:00', '2025-01-24 17:00:00'),
((SELECT id FROM users WHERE agent_id = 1247), 'tips', 'Energisparing: Slå av ladere', 'Tips om å slå av ladere når de ikke er i bruk', 20, 25, 'approved', '{"tip_category": "energi", "content": "Slå av alle ladere når de ikke er i bruk - de bruker strøm selv når telefonen ikke lader", "sharing_consent": true}', '2025-01-22 10:15:00', '2025-01-22 11:00:00');

-- Other users' missions for leaderboard
INSERT INTO missions (user_id, type, title, description, base_points, bonus_points, status, submitted_at, approved_at) VALUES
-- Maria Nordahl (Rank 1, 320 points)
((SELECT id FROM users WHERE agent_id = 1001), 'food', 'Vegansk lasagne', 'Hjemmelaget vegansk lasagne', 15, 20, 'approved', '2025-01-15 19:00:00', '2025-01-15 19:30:00'),
((SELECT id FROM users WHERE agent_id = 1001), 'food', 'Økologisk salat', 'Stor salat med økologiske ingredienser', 15, 20, 'approved', '2025-01-20 18:15:00', '2025-01-20 18:45:00'),
((SELECT id FROM users WHERE agent_id = 1001), 'tips', 'Kompostering hjemme', 'Guide til hjemmekompostering', 20, 25, 'approved', '2025-01-12 09:30:00', '2025-01-12 10:00:00'),
((SELECT id FROM users WHERE agent_id = 1001), 'repair', 'Reparert sykkel', 'Fikset sykkelen istedenfor å kjøpe ny', 20, 20, 'approved', '2025-01-18 15:20:00', '2025-01-18 16:00:00'),
((SELECT id FROM users WHERE agent_id = 1001), 'shopping', 'Økologisk storhandel', 'Handlet kun økologisk denne uken', 15, 20, 'approved', '2025-01-25 17:30:00', '2025-01-25 18:00:00'),

-- Lars Hansen (Rank 2, 285 points)
((SELECT id FROM users WHERE agent_id = 1002), 'repair', 'Reparert jakke', 'Byttet glidelås på vinterjakke', 20, 20, 'approved', '2025-01-14 13:45:00', '2025-01-14 14:15:00'),
((SELECT id FROM users WHERE agent_id = 1002), 'repair', 'Fikset stol', 'Limt sammen knekt stol', 20, 20, 'approved', '2025-01-21 16:30:00', '2025-01-21 17:00:00'),
((SELECT id FROM users WHERE agent_id = 1002), 'food', 'Vegetar pizza', 'Hjemmelaget pizza med grønnsaker', 15, 20, 'approved', '2025-01-17 20:00:00', '2025-01-17 20:30:00'),
((SELECT id FROM users WHERE agent_id = 1002), 'shopping', 'Brukthandel', 'Kjøpte klær på bruktbutikk', 15, 20, 'approved', '2025-01-19 12:15:00', '2025-01-19 12:45:00'),

-- Kari Solberg (Rank 3, 270 points)
((SELECT id FROM users WHERE agent_id = 1003), 'shopping', 'Zero waste handel', 'Handlet helt uten emballasje', 15, 10, 'approved', '2025-01-16 14:20:00', '2025-01-16 14:50:00'),
((SELECT id FROM users WHERE agent_id = 1003), 'shopping', 'Lokale produkter', 'Kjøpte kun lokalprodusert mat', 15, 10, 'approved', '2025-01-23 11:30:00', '2025-01-23 12:00:00'),
((SELECT id FROM users WHERE agent_id = 1003), 'food', 'Vegetar curry', 'Laget curry med sesongens grønnsaker', 15, 10, 'approved', '2025-01-13 19:45:00', '2025-01-13 20:15:00'),
((SELECT id FROM users WHERE agent_id = 1003), 'tips', 'Vannsparing tips', 'Tips for å spare vann i hverdagen', 20, 10, 'approved', '2025-01-27 08:20:00', '2025-01-27 09:00:00');

-- Get competition ID for January 2025
-- Insert monthly stats
INSERT INTO user_monthly_stats (user_id, competition_id, total_points, missions_completed, rank, is_qualified, streak_days) VALUES
((SELECT id FROM users WHERE agent_id = 1247), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 190, 6, 18, true, 5),
((SELECT id FROM users WHERE agent_id = 1001), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 320, 8, 1, true, 12),
((SELECT id FROM users WHERE agent_id = 1002), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 285, 6, 2, true, 8),
((SELECT id FROM users WHERE agent_id = 1003), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 270, 5, 3, true, 6),
((SELECT id FROM users WHERE agent_id = 1004), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 245, 5, 4, true, 4),
((SELECT id FROM users WHERE agent_id = 1005), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 230, 4, 5, true, 3),
((SELECT id FROM users WHERE agent_id = 1006), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 215, 4, 6, true, 7),
((SELECT id FROM users WHERE agent_id = 1007), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 185, 3, 19, true, 2),
((SELECT id FROM users WHERE agent_id = 1078), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1), 145, 2, 78, true, 1);

-- Award badges to users based on their activity
INSERT INTO user_badges (user_id, badge_id) VALUES
((SELECT id FROM users WHERE agent_id = 1247), (SELECT id FROM badges WHERE name = 'kunnskaps_agent')),
((SELECT id FROM users WHERE agent_id = 1247), (SELECT id FROM badges WHERE name = 'cultura')),
((SELECT id FROM users WHERE agent_id = 1001), (SELECT id FROM badges WHERE name = 'matmester')),
((SELECT id FROM users WHERE agent_id = 1001), (SELECT id FROM badges WHERE name = 'cultura')),
((SELECT id FROM users WHERE agent_id = 1002), (SELECT id FROM badges WHERE name = 'reparator')),
((SELECT id FROM users WHERE agent_id = 1002), (SELECT id FROM badges WHERE name = 'cultura')),
((SELECT id FROM users WHERE agent_id = 1003), (SELECT id FROM badges WHERE name = 'handleguru')),
((SELECT id FROM users WHERE agent_id = 1004), (SELECT id FROM badges WHERE name = 'reparator')),
((SELECT id FROM users WHERE agent_id = 1004), (SELECT id FROM badges WHERE name = 'cultura')),
((SELECT id FROM users WHERE agent_id = 1005), (SELECT id FROM badges WHERE name = 'matmester')),
((SELECT id FROM users WHERE agent_id = 1006), (SELECT id FROM badges WHERE name = 'kunnskaps_agent')),
((SELECT id FROM users WHERE agent_id = 1006), (SELECT id FROM badges WHERE name = 'cultura')),
((SELECT id FROM users WHERE agent_id = 1007), (SELECT id FROM badges WHERE name = 'handleguru')),
((SELECT id FROM users WHERE agent_id = 1078), (SELECT id FROM badges WHERE name = 'nybegynner'));

-- Award achievements
INSERT INTO user_achievements (user_id, achievement_id, competition_id) VALUES
((SELECT id FROM users WHERE agent_id = 1001), (SELECT id FROM achievements WHERE name = 'Matmester'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1002), (SELECT id FROM achievements WHERE name = 'Reparatør'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1003), (SELECT id FROM achievements WHERE name = 'Handleguru'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1004), (SELECT id FROM achievements WHERE name = 'Reparatør'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1005), (SELECT id FROM achievements WHERE name = 'Matmester'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1006), (SELECT id FROM achievements WHERE name = 'Kunnskaps-agent'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1007), (SELECT id FROM achievements WHERE name = 'Handleguru'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1)),
((SELECT id FROM users WHERE agent_id = 1078), (SELECT id FROM achievements WHERE name = 'Nybegynner'), (SELECT id FROM monthly_competitions WHERE year = 2025 AND month = 1));

-- Insert some notifications for user 1247
INSERT INTO notifications (user_id, type, title, message, data) VALUES
((SELECT id FROM users WHERE agent_id = 1247), 'mission_approved', 'Oppdrag godkjent! 🎉', 'Ditt miljøtips "Energisparing: Slå av ladere" er godkjent og du fikk 45 poeng!', '{"mission_id": null, "points": 45}'),
((SELECT id FROM users WHERE agent_id = 1247), 'achievement_earned', 'Ny prestasjon! 🏆', 'Du har låst opp prestasjonen "Kunnskaps-agent" for å dele miljøtips!', '{"achievement": "Kunnskaps-agent"}'),
((SELECT id FROM users WHERE agent_id = 1247), 'ranking_update', 'Ranking oppdatering 📊', 'Du er nå på 18. plass i januar-konkurransen! Fortsett den gode innsatsen!', '{"rank": 18, "total_participants": 156}');

-- Insert system settings
INSERT INTO system_settings (key, value, description) VALUES
('qualification_threshold', '145', 'Minimum poeng for å kvalifisere til månedlig trekning'),
('max_missions_per_day', '4', 'Maksimum antall oppdrag per bruker per dag'),
('cultura_bonus_points', '20', 'Ekstra poeng for Cultura Bank kunder'),
('moderation_enabled', 'true', 'Om innhold skal modereres før publisering'),
('app_version', '"1.0.0"', 'Gjeldende app-versjon'),
('maintenance_mode', 'false', 'Om appen er i vedlikeholdsmodus');

-- Insert some tips that have been approved for sharing
INSERT INTO mission_tips (mission_id, content, is_approved, is_featured, moderator_id, moderated_at) VALUES
((SELECT id FROM missions WHERE title = 'Energisparing: Slå av ladere' AND user_id = (SELECT id FROM users WHERE agent_id = 1247)), 'Slå av alle ladere når de ikke er i bruk - de bruker strøm selv når telefonen ikke lader', true, true, (SELECT id FROM users WHERE role = 'admin' LIMIT 1), '2025-01-22 11:00:00');
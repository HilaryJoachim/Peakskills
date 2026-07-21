-- Mentorship Categories
insert into categories (name, slug, description, display_order) values
  ('Career Development', 'career-development', 'Career readiness and progression', 100),
  ('Soft Skills', 'soft-skills', 'Communication and interpersonal skills', 101),
  ('Business', 'business', 'Entrepreneurship and business management', 102),
  ('Technology', 'technology', 'Digital skills and technology', 103)
on conflict (slug) do nothing;

-- Mentorship Programs
insert into programs (title, slug, category_id, short_description, duration_days, format, price_type, is_featured) values
(
  'Career Readiness',
  'career-readiness',
  (select id from categories where slug = 'career-development'),
  'Build foundational skills for entering the professional world with confidence.',
  42, 'hybrid', 'free', true
),
(
  'Interview Preparation',
  'interview-preparation',
  (select id from categories where slug = 'career-development'),
  'Master the art of job interviews with mock sessions and strategies.',
  28, 'online', 'free', true
),
(
  'CV & Resume Writing',
  'cv-resume-writing',
  (select id from categories where slug = 'career-development'),
  'Create compelling resumes and cover letters that get noticed.',
  21, 'online', 'free', true
),
(
  'Professional Communication',
  'professional-communication',
  (select id from categories where slug = 'soft-skills'),
  'Develop clear, confident communication skills for presentations and meetings.',
  35, 'hybrid', 'free', false
),
(
  'Leadership for Young Professionals',
  'leadership-young-professionals',
  (select id from categories where slug = 'career-development'),
  'Develop essential leadership qualities early in your career.',
  56, 'in-person', 'paid', true
),
(
  'Entrepreneurship',
  'entrepreneurship',
  (select id from categories where slug = 'business'),
  'Turn your business ideas into reality. Learn business planning and funding.',
  70, 'hybrid', 'paid', false
),
(
  'Digital Skills',
  'digital-skills',
  (select id from categories where slug = 'technology'),
  'Master essential digital tools and platforms.',
  42, 'online', 'free', true
),
(
  'Personal Branding',
  'personal-branding',
  (select id from categories where slug = 'career-development'),
  'Build a powerful personal brand and leverage LinkedIn.',
  28, 'online', 'free', false
)
on conflict (slug) do nothing;

-- Mentorship Cohorts
insert into cohorts (program_id, start_date, end_date, location, seats_available, status) values
  ((select id from programs where slug = 'career-readiness'), '2026-07-14', '2026-08-22', 'Hybrid', 8, 'open'),
  ((select id from programs where slug = 'career-readiness'), '2026-08-01', '2026-09-13', 'PeakSkills Center', 18, 'open'),
  ((select id from programs where slug = 'interview-preparation'), '2026-09-01', '2026-09-28', 'Online', 32, 'open'),
  ((select id from programs where slug = 'leadership-young-professionals'), '2026-10-06', '2026-11-28', 'PeakSkills Center', 3, 'filling-fast'),
  ((select id from programs where slug = 'digital-skills'), '2026-11-02', '2026-12-14', 'Online', 45, 'open'),
  ((select id from programs where slug = 'entrepreneurship'), '2026-12-01', '2027-02-07', 'Hybrid', 0, 'completed');

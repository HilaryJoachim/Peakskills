-- ============================================================
-- PeakSkills — Supabase Schema Migration
-- Run this once in Supabase Studio → SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── ENUMS ────────────────────────────────────────────────────

create type program_format as enum ('in-person', 'online', 'hybrid');
create type price_type as enum ('paid', 'free');
create type cohort_status as enum ('open', 'filling-fast', 'full', 'completed');
create type resource_type as enum ('guide', 'template', 'report', 'video');

-- ── CATEGORIES ───────────────────────────────────────────────

create table categories (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  description   text,
  display_order int default 0
);

insert into categories (name, slug, description, display_order) values
  ('Leadership Development',        'leadership-development',       'Programs for current and emerging leaders across all sectors.',                1),
  ('Project Management',            'project-management',           'End-to-end project delivery, tools, and methodologies.',                       2),
  ('Customer Service Excellence',   'customer-service-excellence',  'Service quality, client relations, and frontline team performance.',            3),
  ('Workplace Ethics',              'workplace-ethics',             'Integrity, professional conduct, and governance in the workplace.',             4),
  ('Human Resources',               'human-resources',              'HR strategy, talent management, and organizational development.',               5),
  ('Communication Skills',          'communication-skills',         'Workplace communication, presentation, and business writing.',                  6),
  ('Sales & Marketing',             'sales-marketing',              'Sales techniques, marketing fundamentals, and client acquisition.',             7),
  ('Banking Programs',              'banking-programs',             'Specialized training for banking and financial services professionals.',        8),
  ('Government Capacity Building',  'government-capacity-building', 'Public sector performance, governance, and service delivery.',                  9),
  ('Youth Development',             'youth-development',            'Career readiness, skills development, and mentorship for young people.',        10),
  ('Community Outreach Programs',   'community-outreach-programs',  'Free programs for schools, teachers, and community organizations.',             11);

-- ── PROGRAMS ─────────────────────────────────────────────────

create table programs (
  id                 uuid primary key default uuid_generate_v4(),
  title              text not null,
  slug               text not null unique,
  category_id        uuid references categories(id) on delete set null,
  short_description  text,
  overview           text,
  learning_outcomes  jsonb default '[]',
  target_audience    text,
  duration_days      int,
  format             program_format default 'in-person',
  price_type         price_type default 'paid',
  price_per_person   numeric(10,2),
  hero_image_url     text,
  card_image_url     text,
  certification_info text,
  is_featured        boolean default false,
  created_at         timestamptz default now()
);

-- ── COHORTS ──────────────────────────────────────────────────

create table cohorts (
  id              uuid primary key default uuid_generate_v4(),
  program_id      uuid references programs(id) on delete cascade,
  start_date      date not null,
  end_date        date not null,
  location        text,
  seats_available int default 20,
  status          cohort_status default 'open'
);

-- ── TESTIMONIALS ─────────────────────────────────────────────

create table testimonials (
  id          uuid primary key default uuid_generate_v4(),
  author_name text not null,
  role        text,
  organization text,
  sector      text,
  quote       text not null,
  rating      int check (rating between 1 and 5) default 5,
  avatar_url  text,
  is_featured boolean default false
);

-- ── CLIENTS ──────────────────────────────────────────────────

create table clients (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  logo_url      text,
  sector        text,
  display_order int default 0
);

-- ── CASE STUDIES ─────────────────────────────────────────────

create table case_studies (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  slug              text not null unique,
  client_id         uuid references clients(id) on delete set null,
  challenge         text,
  solution          text,
  outcomes          jsonb default '[]',
  industry          text,
  featured_image_url text,
  published_at      date default current_date
);

-- ── EVENTS ───────────────────────────────────────────────────

create table events (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  slug             text not null unique,
  description      text,
  event_date       date,
  location         text,
  image_url        text,
  registration_url text,
  is_past          boolean default false
);

-- ── RESOURCES ────────────────────────────────────────────────

create table resources (
  id             uuid primary key default uuid_generate_v4(),
  title          text not null,
  slug           text not null unique,
  description    text,
  file_url       text,
  resource_type  resource_type default 'guide',
  category_id    uuid references categories(id) on delete set null,
  requires_email boolean default true,
  published_at   date default current_date
);

-- ── TEAM MEMBERS ─────────────────────────────────────────────

create table team_members (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  role          text,
  bio           text,
  credentials   jsonb default '[]',
  photo_url     text,
  linkedin_url  text,
  display_order int default 0
);

-- ── BLOG POSTS ───────────────────────────────────────────────

create table blog_posts (
  id                  uuid primary key default uuid_generate_v4(),
  title               text not null,
  slug                text not null unique,
  excerpt             text,
  body                text,
  category_id         uuid references categories(id) on delete set null,
  published_at        date default current_date,
  featured_image_url  text,
  related_program_id  uuid references programs(id) on delete set null
);

-- ── GALLERY ──────────────────────────────────────────────────

create table gallery_items (
  id                 uuid primary key default uuid_generate_v4(),
  event_title        text not null,
  event_date         date,
  location           text,
  image_url          text,
  related_program_id uuid references programs(id) on delete set null
);

-- ── NEWSLETTER SUBSCRIBERS ───────────────────────────────────

create table newsletter_subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  created_at timestamptz default now()
);

-- ── SEED DATA: PROGRAMS ──────────────────────────────────────

insert into programs (title, slug, category_id, short_description, overview, learning_outcomes, target_audience, duration_days, format, price_type, price_per_person, is_featured, certification_info) values

('Leadership Excellence Program',
 'leadership-excellence-program',
 (select id from categories where slug = 'leadership-development'),
 'A rigorous five-day program developing the strategic and people-leadership capabilities of senior and mid-level managers.',
 'The Leadership Excellence Program is designed for managers and team leaders who need to move beyond operational competence into genuine organizational leadership. Over five intensive days, participants examine their leadership style, practice evidence-based feedback and coaching techniques, work through real organizational challenges using structured facilitation methods, and leave with a personal leadership development plan grounded in their specific role context. The program draws on current research in organizational psychology and is facilitated by practitioners with direct executive leadership experience across banking, government, and the NGO sector.',
 '["Diagnose and develop your personal leadership style across four situational contexts", "Apply structured coaching conversations to improve direct-report performance", "Facilitate team decisions under uncertainty and resource constraints", "Design and communicate strategic direction clearly to diverse stakeholder groups", "Implement a 90-day personal leadership development plan with measurable milestones"]',
 'Mid-level and senior managers with at least two years of people-management responsibility. Suitable for participants from banking, government, NGOs, and corporate organizations.',
 5, 'in-person', 'paid', 350000, true,
 'Participants who complete all five days and submit the post-program reflection receive a Certificate of Completion in Leadership Excellence from PeakSkills. The certificate is recognized by member organizations of the Tanzania Association of Human Resources (TAHR).'),

('Customer Service Excellence',
 'customer-service-excellence',
 (select id from categories where slug = 'customer-service-excellence'),
 'A practical three-day program building the service behaviors, communication skills, and complaint-handling capability of frontline staff.',
 'Customer Service Excellence is a practical, frontline-focused program for bank tellers, call-centre agents, reception and guest-relations staff, and any role where the quality of a single interaction defines whether a client stays or leaves. The program moves beyond generic service principles to build specific, observable behaviors: how to open an interaction that builds trust in the first thirty seconds, how to handle a complaint without escalating it, how to manage queue pressure without letting it affect service quality, and how to recover a client relationship after a service failure. All scenarios are drawn from real situations submitted by participant organizations in pre-program briefings.',
 '["Apply a consistent, professional service greeting and interaction structure", "Identify and respond to four distinct customer emotional states", "Handle complaints using a five-step resolution framework without escalation", "Manage personal pressure and maintain composure during high-volume periods", "Use non-verbal communication to reinforce verbal service messages"]',
 'Frontline customer-facing staff: bank tellers, call-centre agents, reception staff, client-relations officers. Suitable for both new hires and staff requiring a service-quality refresh.',
 3, 'in-person', 'paid', 180000, true,
 'Certificate of Completion in Customer Service Excellence from PeakSkills, issued to participants achieving at least 75% in the skills assessment on Day 3.'),

('Professional Ethics & Workplace Conduct',
 'professional-ethics-workplace-conduct',
 (select id from categories where slug = 'workplace-ethics'),
 'A two-day program equipping staff with a practical ethical decision-making framework for navigating grey-area situations at work.',
 'Professional Ethics & Workplace Conduct addresses one of the most consistent gaps identified in post-induction performance reviews across organizations PeakSkills has trained: staff who understand the written code of conduct but struggle to apply it when the right answer is not obvious. The program uses real case studies from the Tanzanian banking, government, and NGO context to practice ethical reasoning, and gives participants a structured framework — not just principles — for making defensible decisions under pressure. It is as relevant for recent graduates as for experienced staff who have developed habits that were never formally examined.',
 '["Apply a four-step ethical reasoning framework to ambiguous workplace situations", "Identify the difference between policy compliance and genuine ethical conduct", "Recognize and respond appropriately to corruption, conflict-of-interest, and bias scenarios", "Report integrity concerns through the correct organizational channels without fear", "Model ethical behavior in a supervisory role"]',
 'All staff levels, from recent graduates to department heads. Particularly relevant for organizations with regulatory compliance obligations (banks, government bodies, NGOs with donor reporting requirements).',
 2, 'in-person', 'paid', 120000, true,
 'Certificate of Completion in Professional Ethics from PeakSkills.'),

('Project Management Fundamentals',
 'project-management-fundamentals',
 (select id from categories where slug = 'project-management'),
 'A four-day foundational program in project planning, monitoring, and delivery for professionals who manage projects without formal PM training.',
 'Project Management Fundamentals is built for the reality that most projects in Tanzania are managed by subject-matter experts — an engineer, an accountant, a program officer — who have never been formally trained in project methodology. The program teaches a streamlined version of project management practice that works in low-resource environments: how to scope a project clearly, build a realistic schedule, manage a budget without dedicated finance support, keep stakeholders aligned, and close a project with documentation that protects both the organization and the team. The approach draws selectively from PMI methodology and PRINCE2 without being beholden to either — participants leave with tools they can use immediately, not a framework that requires certification to implement.',
 '["Define project scope, objectives, and success criteria in a written project charter", "Build a work breakdown structure and realistic Gantt schedule in standard tools", "Identify and mitigate the five most common project risks in the East African context", "Manage project budgets and produce a monthly variance report", "Run a structured project close-out and lessons-learned session"]',
 'Program officers, engineers, finance staff, department managers, and any professional who leads projects without formal project management training. Entry-level through senior.',
 4, 'in-person', 'paid', 250000, false,
 'Certificate of Completion in Project Management Fundamentals from PeakSkills. Eligible participants may proceed to the PMP® examination pathway with credit for this foundational training.'),

('Banking Operations & Regulatory Compliance',
 'banking-operations-regulatory-compliance',
 (select id from categories where slug = 'banking-programs'),
 'A specialized five-day program covering core banking operations, regulatory requirements, and risk management for banking staff at all levels.',
 'Banking Operations & Regulatory Compliance is developed specifically for Tanzanian banks operating under the Bank of Tanzania regulatory framework. The program covers the practical application of AML/CFT requirements, Know Your Customer procedures, credit risk fundamentals, and fraud detection — grounded in the actual regulatory instruments rather than generic international frameworks. Facilitators include former senior bank officers and regulatory compliance specialists with direct experience working within the BOT supervisory system. The program is structured to be relevant for both frontline banking staff (who need to understand why procedures exist) and operational managers (who need to implement and monitor compliance).',
 '["Apply Bank of Tanzania AML/CFT requirements in daily transaction processing", "Conduct compliant Know Your Customer (KYC) and Customer Due Diligence (CDD) processes", "Identify and escalate suspicious transaction indicators using the correct STR framework", "Manage operational risk in core banking workflows", "Prepare for and respond to regulatory inspection processes"]',
 'Banking staff at all levels: tellers, relationship managers, compliance officers, branch managers, and operations supervisors. Developed specifically for institutions operating under the Bank of Tanzania regulatory framework.',
 5, 'in-person', 'paid', 420000, true,
 'Certificate of Competence in Banking Operations & Regulatory Compliance from PeakSkills, aligned to Bank of Tanzania staff competency standards.'),

('Career Readiness for Youth',
 'career-readiness-for-youth',
 (select id from categories where slug = 'youth-development'),
 'A free three-day program preparing secondary school leavers and recent graduates for the professional workplace.',
 'Career Readiness for Youth is PeakSkills'' flagship community program, delivered free of charge to secondary school leavers, vocational training graduates, and university final-year students. The program addresses the most common reasons young people fail in their first year of employment — not technical skill gaps, but professional behavior gaps: punctuality, workplace communication, receiving feedback, managing relationships with supervisors, and presenting oneself credibly in an interview. The program is delivered in partnership with local schools, universities, and youth organizations and is funded through PeakSkills'' corporate social responsibility commitments and partner contributions.',
 '["Present yourself professionally in a job application, CV, and formal interview", "Understand and meet the behavioral expectations of a professional workplace", "Communicate clearly with supervisors and colleagues in writing and in person", "Set realistic short-term career goals and identify the steps to reach them", "Navigate common first-year workplace challenges without damaging relationships"]',
 'Secondary school leavers (Form IV and VI), vocational training graduates, and university final-year students preparing to enter the job market.',
 3, 'in-person', 'free', null, true,
 'Certificate of Participation from PeakSkills, recognized by partner organizations in their internship and graduate recruitment programs.');

-- ── SEED DATA: COHORTS ───────────────────────────────────────

insert into cohorts (program_id, start_date, end_date, location, seats_available, status) values
  ((select id from programs where slug = 'leadership-excellence-program'),     '2026-07-14', '2026-07-18', 'Dar es Salaam — PeakSkills Training Centre', 20, 'open'),
  ((select id from programs where slug = 'leadership-excellence-program'),     '2026-08-25', '2026-08-29', 'Arusha — Mount Meru Hotel Conference Centre', 15, 'open'),
  ((select id from programs where slug = 'customer-service-excellence'),       '2026-07-07', '2026-07-09', 'Dar es Salaam — PeakSkills Training Centre', 25, 'filling-fast'),
  ((select id from programs where slug = 'customer-service-excellence'),       '2026-07-28', '2026-07-30', 'Zanzibar — Client Premises (In-House)', 30, 'open'),
  ((select id from programs where slug = 'professional-ethics-workplace-conduct'), '2026-07-21', '2026-07-22', 'Dodoma — Landmark Conference Hotel', 30, 'open'),
  ((select id from programs where slug = 'project-management-fundamentals'),   '2026-08-04', '2026-08-07', 'Dar es Salaam — PeakSkills Training Centre', 20, 'open'),
  ((select id from programs where slug = 'banking-operations-regulatory-compliance'), '2026-07-07', '2026-07-11', 'Dar es Salaam — PeakSkills Training Centre', 18, 'filling-fast'),
  ((select id from programs where slug = 'career-readiness-for-youth'),        '2026-07-14', '2026-07-16', 'Dar es Salaam — University of Dar es Salaam Campus', 60, 'open');

-- ── SEED DATA: TESTIMONIALS ──────────────────────────────────

insert into testimonials (author_name, role, organization, sector, quote, rating, is_featured) values
  ('Grace Mwambe', 'Head of Human Resources', 'CRDB Bank PLC', 'Banking',
   'We commissioned the Customer Service Excellence program for 120 of our tellers across six branches. The behavioral change was measurable within two months — complaint escalations dropped by 34% and our internal service quality scores improved significantly. PeakSkills understood our operational context without needing to be educated on it.',
   5, true),
  ('Daniel Omondi', 'Director of Capacity Building', 'Tanzania Revenue Authority', 'Government',
   'PeakSkills designed and delivered a customized Leadership Development program for 45 of our senior managers. What distinguished them from other providers we evaluated was the quality of the facilitation and the practical grounding of every session in real public-sector scenarios. The post-program feedback from participants was the strongest we have received for any training investment.',
   5, true),
  ('Amina Shariff', 'Country Director', 'Oxfam Tanzania', 'NGO',
   'We needed a provider who could deliver ethics and governance training that was relevant to both our national and international staff — not generic compliance theater. PeakSkills produced a program that engaged both groups and produced genuine reflection. I would recommend them without hesitation to any development-sector organization.',
   5, true),
  ('Joseph Kimaro', 'Training Manager', 'National Microfinance Bank', 'Banking',
   'The Banking Operations program is exactly what our junior staff needed before joining the floor. Practical, regulatory-grounded, and delivered by facilitators who have actually worked in banking. We now include it as a mandatory pre-deployment requirement for all new teller recruits.',
   5, false),
  ('Fatuma Ally', 'HR Manager', 'Tanzania Ports Authority', 'Government',
   'Professional development training for port operations staff is a challenge because our environment is very specific. PeakSkills took the time to understand our context before designing the program, and the result was material that our staff recognized and engaged with rather than dismissed as generic.',
   4, false);

-- ── SEED DATA: CLIENTS ───────────────────────────────────────

insert into clients (name, sector, display_order) values
  ('CRDB Bank PLC', 'Banking', 1),
  ('Tanzania Revenue Authority', 'Government', 2),
  ('National Microfinance Bank', 'Banking', 3),
  ('Oxfam Tanzania', 'NGO', 4),
  ('Tanzania Ports Authority', 'Government', 5),
  ('Stanbic Bank Tanzania', 'Banking', 6),
  ('Ministry of Finance', 'Government', 7),
  ('World Vision Tanzania', 'NGO', 8),
  ('University of Dar es Salaam', 'Education', 9),
  ('Vodacom Tanzania', 'Corporate', 10);

-- ── ROW LEVEL SECURITY (basic) ───────────────────────────────

alter table programs enable row level security;
alter table categories enable row level security;
alter table cohorts enable row level security;
alter table testimonials enable row level security;
alter table clients enable row level security;
alter table team_members enable row level security;
alter table blog_posts enable row level security;
alter table gallery_items enable row level security;
alter table newsletter_subscribers enable row level security;
alter table case_studies enable row level security;
alter table events enable row level security;
alter table resources enable row level security;

-- Public read access for all content tables
create policy "Public read" on programs for select using (true);
create policy "Public read" on categories for select using (true);
create policy "Public read" on cohorts for select using (true);
create policy "Public read" on testimonials for select using (true);
create policy "Public read" on clients for select using (true);
create policy "Public read" on team_members for select using (true);
create policy "Public read" on blog_posts for select using (true);
create policy "Public read" on gallery_items for select using (true);
create policy "Public read" on case_studies for select using (true);
create policy "Public read" on events for select using (true);
create policy "Public read" on resources for select using (true);

-- Newsletter: public insert, no public read
create policy "Public insert" on newsletter_subscribers for insert with check (true);

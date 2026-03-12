-- AppTrack Expanded Seed Data
-- ~80 applications across 3 batches demonstrating resume variant signal evolution
--
-- Batch 1: v1-military-heavy (Jan 5–20), 25 apps, ~12% first-gate rate
-- Batch 2: v2-projects-forward (Feb 16–28), 30 apps, ~40% first-gate rate
-- Batch 3: v3-education-split (Mar 1–10), 25 apps, ~28% first-gate rate (mixed signal)
--
-- Visible patterns:
--   Resume variant: v1 poor → v2 strong improvement → v3 mixed/regressed in some segments
--   Referrals: dramatically outperform cold/job board across all variants
--   Segment: Defense responds best to this profile, Enterprise worst
--   Channel: Referrals > Job Board > Cold in first-gate conversion
--
-- Pipeline event columns: event_type + occurrence_index (legacy) AND from_stage + to_stage (new)

-- ============================================================
-- RESET SEQUENCES so IDs start at 1
-- ============================================================
ALTER SEQUENCE companies_id_seq RESTART WITH 1;
ALTER SEQUENCE resumevariants_id_seq RESTART WITH 1;
ALTER SEQUENCE joblistings_id_seq RESTART WITH 1;
ALTER SEQUENCE contacts_id_seq RESTART WITH 1;
ALTER SEQUENCE applications_id_seq RESTART WITH 1;
ALTER SEQUENCE pipelineevents_id_seq RESTART WITH 1;
ALTER SEQUENCE qualitativetags_id_seq RESTART WITH 1;

-- ============================================================
-- COMPANIES (18 companies across 4 segments)
-- ============================================================
INSERT INTO companies (name, segment, size, notes) VALUES
('DefenseCo-A',    'DEFENSE',    'LARGE',  'Prime contractor, heavy clearance req'),
('DefenseCo-B',    'DEFENSE',    'LARGE',  'Systems integrator, C2 focus'),
('DefenseCo-C',    'DEFENSE',    'MEDIUM', 'Mid-size defense IT'),
('DefenseCo-D',    'DEFENSE',    'MEDIUM', 'C2 systems and EW'),
('DefenseCo-E',    'DEFENSE',    'SMALL',  'Small defense startup, ISR'),
('DefenseCo-F',    'DEFENSE',    'LARGE',  'Avionics and mission systems'),
('FintechCo-A',    'FINTECH',    'MEDIUM', 'Payments infrastructure'),
('FintechCo-B',    'FINTECH',    'LARGE',  'Enterprise fintech, capital markets'),
('FintechCo-C',    'FINTECH',    'SMALL',  'Series A lending platform'),
('FintechCo-D',    'FINTECH',    'MEDIUM', 'Compliance and regtech'),
('EnterpriseCo-A', 'ENTERPRISE', 'LARGE',  'Legacy enterprise software'),
('EnterpriseCo-B', 'ENTERPRISE', 'MEDIUM', 'Cloud migration focus'),
('EnterpriseCo-C', 'ENTERPRISE', 'LARGE',  'ERP modernization'),
('EnterpriseCo-D', 'ENTERPRISE', 'MEDIUM', 'Data platform team'),
('StartupCo-A',    'STARTUP',    'SMALL',  'Series B SaaS'),
('StartupCo-B',    'STARTUP',    'SMALL',  'Pre-Series A dev tools'),
('StartupCo-C',    'STARTUP',    'SMALL',  'Series A observability'),
('StartupCo-D',    'STARTUP',    'SMALL',  'Seed stage AI infra');

-- ============================================================
-- RESUME VARIANTS
-- ============================================================
INSERT INTO resumevariants (version_label, date_created, change_summary, file_url) VALUES
('v1-military-heavy',  '2026-01-05', 'Heavy military experience emphasis, projects minimal, education subdued', null),
('v2-projects-forward','2026-02-16', 'Projects lead, military contextualized as domain expertise, education split out', null),
('v3-education-split', '2026-03-01', 'CS minor and OMSCS admission prominent, military compressed, projects maintained', null);

-- ============================================================
-- JOB LISTINGS (80 listings matching the 80 applications)
-- ============================================================
INSERT INTO joblistings (company_id, title, role_type, experience_level, date_discovered, url, domain_notes) VALUES
-- === BATCH 1 LISTINGS (v1, Jan) — 25 listings ===
-- Defense (8)
(1,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-01-06', null, 'Java backend, clearance required'),
(2,  'Associate Software Engineer',     'BACKEND',   'JUNIOR', '2026-01-07', null, 'C2 systems, TS/SCI preferred'),
(3,  'Junior Full Stack Developer',     'FULLSTACK', 'JUNIOR', '2026-01-08', null, 'React/Java, defense domain'),
(4,  'Software Developer I',            'BACKEND',   'JUNIOR', '2026-01-09', null, 'Embedded systems adjacent'),
(5,  'Entry Level SWE',                 'BACKEND',   'JUNIOR', '2026-01-10', null, 'Small team, clearance a plus'),
(6,  'Junior Platform Engineer',        'BACKEND',   'JUNIOR', '2026-01-10', null, 'Mission systems, Java/Kafka'),
(1,  'Backend Developer I',             'BACKEND',   'JUNIOR', '2026-01-11', null, 'Second req same team'),
(2,  'Junior Systems Engineer',         'BACKEND',   'JUNIOR', '2026-01-12', null, 'Distributed systems team'),
-- Fintech (6)
(7,  'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-01-08', null, 'Payments API, Java Spring'),
(8,  'Associate Engineer',              'FULLSTACK', 'JUNIOR', '2026-01-09', null, 'Full stack, enterprise clients'),
(9,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-01-10', null, 'Lending platform core'),
(10, 'Junior Compliance Engineer',      'BACKEND',   'JUNIOR', '2026-01-11', null, 'Regtech backend'),
(7,  'Junior API Engineer',             'BACKEND',   'JUNIOR', '2026-01-12', null, 'Payments team expansion'),
(8,  'Entry Level Developer',           'FULLSTACK', 'JUNIOR', '2026-01-13', null, 'Capital markets UI'),
-- Enterprise (6)
(11, 'Entry Level Developer',           'FULLSTACK', 'JUNIOR', '2026-01-08', null, 'Legacy modernization'),
(12, 'Junior Software Engineer',        'BACKEND',   'JUNIOR', '2026-01-09', null, 'Cloud migration team'),
(13, 'Associate Developer',             'FULLSTACK', 'JUNIOR', '2026-01-10', null, 'ERP modules'),
(14, 'Junior Data Engineer',            'BACKEND',   'JUNIOR', '2026-01-11', null, 'Data pipeline team'),
(11, 'Backend Developer I',             'BACKEND',   'JUNIOR', '2026-01-12', null, 'Modernization phase 2'),
(13, 'Junior Full Stack Developer',     'FULLSTACK', 'JUNIOR', '2026-01-13', null, 'Internal tools'),
-- Startup (5)
(15, 'Software Engineer',               'FULLSTACK', 'JUNIOR', '2026-01-09', null, 'Generalist needed'),
(16, 'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-01-10', null, 'Dev tools core'),
(17, 'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-01-11', null, 'Observability pipeline'),
(18, 'Junior ML Platform Engineer',     'BACKEND',   'JUNIOR', '2026-01-12', null, 'AI infra, Python/Java'),
(15, 'Full Stack Engineer',             'FULLSTACK', 'JUNIOR', '2026-01-13', null, 'Product team'),

-- === BATCH 2 LISTINGS (v2, Feb) — 30 listings ===
-- Defense (10)
(1,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-02-17', null, 'Same req, new headcount'),
(2,  'Associate Software Engineer',     'BACKEND',   'JUNIOR', '2026-02-17', null, 'New cycle open'),
(3,  'Junior Full Stack Developer',     'FULLSTACK', 'JUNIOR', '2026-02-18', null, 'Re-opened position'),
(4,  'Software Developer I',            'BACKEND',   'JUNIOR', '2026-02-18', null, 'Expanded team'),
(5,  'Entry Level SWE',                 'BACKEND',   'JUNIOR', '2026-02-19', null, 'Growth hire'),
(6,  'Junior Platform Engineer',        'BACKEND',   'JUNIOR', '2026-02-19', null, 'New program start'),
(1,  'Junior DevOps Engineer',          'DEVOPS',    'JUNIOR', '2026-02-20', null, 'CI/CD team'),
(4,  'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-02-20', null, 'EW systems expansion'),
(5,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-02-21', null, 'ISR platform'),
(6,  'Associate Systems Engineer',      'BACKEND',   'JUNIOR', '2026-02-21', null, 'Avionics team'),
-- Fintech (7)
(7,  'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-02-18', null, 'New headcount approved'),
(8,  'Associate Engineer',              'FULLSTACK', 'JUNIOR', '2026-02-19', null, 'Backfill'),
(9,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-02-19', null, 'Core platform'),
(10, 'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-02-20', null, 'Compliance automation'),
(7,  'Junior API Engineer',             'BACKEND',   'JUNIOR', '2026-02-21', null, 'Payments v2'),
(8,  'Full Stack Developer I',          'FULLSTACK', 'JUNIOR', '2026-02-22', null, 'Client portal'),
(9,  'Junior Platform Engineer',        'BACKEND',   'JUNIOR', '2026-02-22', null, 'Lending infra'),
-- Enterprise (7)
(11, 'Entry Level Developer',           'FULLSTACK', 'JUNIOR', '2026-02-19', null, 'New project starting'),
(12, 'Junior Software Engineer',        'BACKEND',   'JUNIOR', '2026-02-20', null, 'Team expanding'),
(13, 'Associate Developer',             'FULLSTACK', 'JUNIOR', '2026-02-20', null, 'ERP cloud migration'),
(14, 'Junior Data Engineer',            'BACKEND',   'JUNIOR', '2026-02-21', null, 'Data lake project'),
(11, 'Junior Backend Developer',        'BACKEND',   'JUNIOR', '2026-02-22', null, 'API modernization'),
(12, 'Software Developer I',            'BACKEND',   'JUNIOR', '2026-02-22', null, 'Cloud native rewrite'),
(14, 'Junior Software Engineer',        'BACKEND',   'JUNIOR', '2026-02-23', null, 'Analytics platform'),
-- Startup (6)
(15, 'Software Engineer',               'FULLSTACK', 'JUNIOR', '2026-02-20', null, 'Series B growth'),
(16, 'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-02-21', null, 'Core product'),
(17, 'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-02-21', null, 'Pipeline team'),
(18, 'Junior Platform Engineer',        'BACKEND',   'JUNIOR', '2026-02-22', null, 'Infra team'),
(15, 'Backend Engineer',                'BACKEND',   'JUNIOR', '2026-02-23', null, 'API team'),
(16, 'Full Stack Developer',            'FULLSTACK', 'JUNIOR', '2026-02-23', null, 'Frontend rewrite'),

-- === BATCH 3 LISTINGS (v3, Mar) — 25 listings ===
-- Defense (8)
(1,  'Software Engineer II',            'BACKEND',   'JUNIOR', '2026-03-01', null, 'Clearance required, Java'),
(2,  'Junior Software Engineer',        'BACKEND',   'JUNIOR', '2026-03-01', null, 'C2 modernization'),
(3,  'Full Stack Developer I',          'FULLSTACK', 'JUNIOR', '2026-03-02', null, 'React/Spring'),
(4,  'Backend Developer I',             'BACKEND',   'JUNIOR', '2026-03-02', null, 'Signal processing adj'),
(5,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-03-03', null, 'ISR backend'),
(6,  'Junior Systems Engineer',         'BACKEND',   'JUNIOR', '2026-03-03', null, 'Mission planning'),
(1,  'Junior Platform Engineer',        'BACKEND',   'JUNIOR', '2026-03-04', null, 'Platform team'),
(3,  'Junior Backend Developer',        'BACKEND',   'JUNIOR', '2026-03-04', null, 'Defense IT services'),
-- Fintech (5)
(7,  'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-03-02', null, 'Payments core'),
(8,  'Associate Developer',             'FULLSTACK', 'JUNIOR', '2026-03-03', null, 'Trading platform'),
(9,  'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-03-03', null, 'Lending engine'),
(10, 'Junior Compliance Engineer',      'BACKEND',   'JUNIOR', '2026-03-04', null, 'Audit automation'),
(7,  'Junior API Developer',            'BACKEND',   'JUNIOR', '2026-03-04', null, 'Merchant API'),
-- Enterprise (7)
(11, 'Junior Developer',                'FULLSTACK', 'JUNIOR', '2026-03-02', null, 'Legacy rewrite'),
(12, 'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-03-02', null, 'Cloud team'),
(13, 'Junior Full Stack Developer',     'FULLSTACK', 'JUNIOR', '2026-03-03', null, 'ERP frontend'),
(14, 'Junior Data Engineer',            'BACKEND',   'JUNIOR', '2026-03-03', null, 'ETL pipeline'),
(11, 'Associate Backend Developer',     'BACKEND',   'JUNIOR', '2026-03-04', null, 'API layer'),
(13, 'Junior Software Engineer',        'BACKEND',   'JUNIOR', '2026-03-04', null, 'Internal platform'),
(12, 'Junior DevOps Engineer',          'DEVOPS',    'JUNIOR', '2026-03-05', null, 'CI/CD modernization'),
-- Startup (5)
(15, 'Software Engineer',               'FULLSTACK', 'JUNIOR', '2026-03-03', null, 'Product eng'),
(16, 'Junior Backend Engineer',         'BACKEND',   'JUNIOR', '2026-03-03', null, 'Core platform'),
(17, 'Software Engineer I',             'BACKEND',   'JUNIOR', '2026-03-04', null, 'Agent pipeline'),
(18, 'Junior Infrastructure Engineer',  'BACKEND',   'JUNIOR', '2026-03-04', null, 'GPU cluster mgmt'),
(17, 'Junior Full Stack Developer',     'FULLSTACK', 'JUNIOR', '2026-03-05', null, 'Dashboard team');

-- ============================================================
-- CONTACTS (6 contacts across segments)
-- ============================================================
INSERT INTO contacts (name, email, phone, company, notes) VALUES
('Alice Nguyen',    'alice@example.com',  '555-0101', 'DefenseCo-A',    'Met at tech meetup, referred batch 2 app'),
('Bob Okafor',      'bob@example.com',    '555-0102', 'DefenseCo-B',    'LinkedIn connection, works in hiring org'),
('Carol Simmons',   'carol@example.com',  '555-0103', 'FintechCo-A',    'Former colleague referral'),
('Dan Reeves',      'dan@example.com',    '555-0104', 'DefenseCo-F',    'Conference contact, avionics team lead'),
('Elena Park',      'elena@example.com',  '555-0105', 'EnterpriseCo-C', 'Alumni network, ERP team'),
('Frank Torres',    'frank@example.com',  '555-0106', 'FintechCo-B',    'Recruiter reached out on LinkedIn');

-- ============================================================
-- BATCH 1 APPLICATIONS: v1-military-heavy (25 apps)
-- Submitted Jan 8–20, 2026
-- Story: ~12% first-gate (3/25 got recruiter response)
--   Defense: 2/8 responded (clearance angle landed)
--   Fintech: 1/6 responded (recruiter said profile hard to place)
--   Enterprise: 0/6 responded
--   Startup: 0/5 responded
-- ============================================================
INSERT INTO applications (
    job_listing_id, resume_variant_id, contact_id,
    referred, source_channel, current_stage,
    date_submitted, date_recruiter_response, date_recruiter_call,
    date_technical_screen, date_technical_pass, date_final_round,
    date_offer, date_rejection, rejection_stage,
    active, notes, alignment_notes
) VALUES
-- Defense (8 apps: 2 recruiter responses, 1 made it to screen then rejected)
(1,  1, null, false, 'COLD',      'REJECTED',  '2026-01-08', '2026-01-15', '2026-01-18', '2026-01-25', null, null, null, '2026-02-01', 'TECHNICAL_SCREEN', false, null, 'Strong domain match'),
(2,  1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-09', '2026-01-17', '2026-01-21', null, null, null, null, null, null, false, 'Went cold after recruiter call', null),
(3,  1, null, false, 'COLD',      'INACTIVE',  '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
(4,  1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
(5,  1, null, false, 'COLD',      'INACTIVE',  '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
(6,  1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
(7,  1, null, false, 'COLD',      'INACTIVE',  '2026-01-14', null, null, null, null, null, null, null, null, false, null, null),
(8,  1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-15', null, null, null, null, null, null, null, null, false, null, null),
-- Fintech (6 apps: 1 recruiter response, stalled)
(9,  1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-09', '2026-01-18', null, null, null, null, null, null, null, false, 'Recruiter said military background hard to contextualize', null),
(10, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
(11, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-11', null, null, null, null, null, null, null, null, false, null, null),
(12, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
(13, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-13', null, null, null, null, null, null, null, null, false, null, null),
(14, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-14', null, null, null, null, null, null, null, null, false, null, null),
-- Enterprise (6 apps: 0 recruiter responses)
(15, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-09', null, null, null, null, null, null, null, null, false, null, null),
(16, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
(17, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-11', null, null, null, null, null, null, null, null, false, null, null),
(18, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
(19, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-13', null, null, null, null, null, null, null, null, false, null, null),
(20, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-14', null, null, null, null, null, null, null, null, false, null, null),
-- Startup (5 apps: 0 recruiter responses)
(21, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
(22, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-11', null, null, null, null, null, null, null, null, false, null, null),
(23, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
(24, 1, null, false, 'JOB_BOARD', 'INACTIVE',  '2026-01-13', null, null, null, null, null, null, null, null, false, null, null),
(25, 1, null, false, 'COLD',      'INACTIVE',  '2026-01-14', null, null, null, null, null, null, null, null, false, null, null);

-- ============================================================
-- BATCH 2 APPLICATIONS: v2-projects-forward (30 apps)
-- Submitted Feb 17–28, 2026
-- Story: ~40% first-gate (12/30 got recruiter response)
--   Defense: 7/10 responded (referrals + projects landing)
--   Fintech: 3/7 responded (referral strong, cold improved)
--   Enterprise: 1/7 responded (still weak fit)
--   Startup: 1/6 responded (one response then scope change)
-- Referrals: 4/4 got responses (100%) vs 8/26 cold/board (31%)
-- ============================================================
INSERT INTO applications (
    job_listing_id, resume_variant_id, contact_id,
    referred, source_channel, current_stage,
    date_submitted, date_recruiter_response, date_recruiter_call,
    date_technical_screen, date_technical_pass, date_final_round,
    date_offer, date_rejection, rejection_stage,
    active, notes, alignment_notes
) VALUES
-- Defense (10 apps: 7 responses, 2 referrals, deep pipeline on referral)
(26, 2, 1,    true,  'REFERRAL',  'FINAL_ROUND',        '2026-02-18', '2026-02-20', '2026-02-23', '2026-03-01', '2026-03-04', '2026-03-07', null, null, null, true,  'Alice referral, strong signal on projects', 'High alignment'),
(27, 2, 2,    true,  'REFERRAL',  'TECHNICAL_SCREEN',   '2026-02-18', '2026-02-21', '2026-02-25', '2026-03-06', null, null, null, null, null, true,  'Bob connection, projects resonated', 'Good fit'),
(28, 2, null, false, 'JOB_BOARD', 'RECRUITER_CALL',     '2026-02-19', '2026-02-26', '2026-03-04', null, null, null, null, null, null, true,  null, null),
(29, 2, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-02-19', '2026-02-28', null, null, null, null, null, null, null, true,  null, null),
(30, 2, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-02-20', '2026-03-01', null, null, null, null, null, null, null, true,  null, null),
(31, 2, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-02-20', '2026-03-02', null, null, null, null, null, null, null, true,  null, null),
(32, 2, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-02-21', '2026-03-03', null, null, null, null, null, null, null, true,  null, null),
(33, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-21', null, null, null, null, null, null, null, null, true,  null, null),
(34, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
(35, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
-- Fintech (7 apps: 3 responses, 1 referral deep in pipeline)
(36, 2, 3,    true,  'REFERRAL',  'TECHNICAL_SCREEN',   '2026-02-19', '2026-02-21', '2026-02-25', '2026-03-05', null, null, null, null, null, true,  'Carol referral, Java backend focus resonated', null),
(37, 2, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-02-20', '2026-03-01', null, null, null, null, null, null, null, true,  null, null),
(38, 2, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-02-20', '2026-03-03', null, null, null, null, null, null, null, true,  null, null),
(39, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-21', null, null, null, null, null, null, null, null, true,  null, null),
(40, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
(41, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-23', null, null, null, null, null, null, null, null, true,  null, null),
(42, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-23', null, null, null, null, null, null, null, null, true,  null, null),
-- Enterprise (7 apps: 1 response)
(43, 2, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-02-20', '2026-03-02', null, null, null, null, null, null, null, true,  null, null),
(44, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-21', null, null, null, null, null, null, null, null, true,  null, null),
(45, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-21', null, null, null, null, null, null, null, null, true,  null, null),
(46, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
(47, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-23', null, null, null, null, null, null, null, null, true,  null, null),
(48, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-23', null, null, null, null, null, null, null, null, true,  null, null),
(49, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-24', null, null, null, null, null, null, null, null, true,  null, null),
-- Startup (6 apps: 1 response then went cold)
(50, 2, null, false, 'COLD',      'INACTIVE',           '2026-02-21', '2026-03-01', null, null, null, null, null, null, null, false, 'Role changed scope after response', null),
(51, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
(52, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
(53, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-23', null, null, null, null, null, null, null, null, true,  null, null),
(54, 2, null, false, 'COLD',      'SUBMITTED',          '2026-02-24', null, null, null, null, null, null, null, null, true,  null, null),
(55, 2, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-02-24', null, null, null, null, null, null, null, null, true,  null, null);

-- ============================================================
-- BATCH 3 APPLICATIONS: v3-education-split (25 apps)
-- Submitted Mar 1–10, 2026
-- Story: ~28% first-gate (7/25 got recruiter response)
--   Defense: 3/8 responded (worse than v2 — compressed military hurt)
--   Fintech: 1/5 responded (education angle didn't help here)
--   Enterprise: 2/7 responded (OMSCS/education landing better here)
--   Startup: 1/5 responded
-- Referral: 1/1 got response (Dan at DefenseCo-F)
-- Pattern: v3 trades defense signal for enterprise signal
-- ============================================================
INSERT INTO applications (
    job_listing_id, resume_variant_id, contact_id,
    referred, source_channel, current_stage,
    date_submitted, date_recruiter_response, date_recruiter_call,
    date_technical_screen, date_technical_pass, date_final_round,
    date_offer, date_rejection, rejection_stage,
    active, notes, alignment_notes
) VALUES
-- Defense (8 apps: 3 responses — down from 7/10 with v2)
(56, 3, 4,    true,  'REFERRAL',  'RECRUITER_CALL',     '2026-03-02', '2026-03-04', '2026-03-08', null, null, null, null, null, null, true,  'Dan referral, but clearance less prominent on v3', null),
(57, 3, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-03-02', '2026-03-07', null, null, null, null, null, null, null, true,  null, null),
(58, 3, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-03-03', '2026-03-09', null, null, null, null, null, null, null, true,  null, null),
(59, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-03', null, null, null, null, null, null, null, null, true,  null, null),
(60, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(61, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(62, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(63, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
-- Fintech (5 apps: 1 response)
(64, 3, null, false, 'JOB_BOARD', 'RECRUITER_RESPONSE', '2026-03-03', '2026-03-08', null, null, null, null, null, null, null, true,  null, null),
(65, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(66, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(67, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(68, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
-- Enterprise (7 apps: 2 responses — better than v1 and v2 for this segment)
(69, 3, null, false, 'JOB_BOARD', 'RECRUITER_CALL',     '2026-03-03', '2026-03-06', '2026-03-10', null, null, null, null, null, null, true,  'OMSCS admission mentioned positively', null),
(70, 3, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-03-03', '2026-03-08', null, null, null, null, null, null, null, true,  null, null),
(71, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(72, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(73, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(74, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(75, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-06', null, null, null, null, null, null, null, null, true,  null, null),
-- Startup (5 apps: 1 response)
(76, 3, null, false, 'COLD',      'RECRUITER_RESPONSE', '2026-03-04', '2026-03-09', null, null, null, null, null, null, null, true,  null, null),
(77, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-04', null, null, null, null, null, null, null, null, true,  null, null),
(78, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(79, 3, null, false, 'JOB_BOARD', 'SUBMITTED',          '2026-03-05', null, null, null, null, null, null, null, null, true,  null, null),
(80, 3, null, false, 'COLD',      'SUBMITTED',          '2026-03-06', null, null, null, null, null, null, null, null, true,  null, null);

-- ============================================================
-- PIPELINE EVENTS
-- Using both legacy columns (event_type, occurrence_index) and
-- new columns (from_stage, to_stage) for all key transitions
-- ============================================================
INSERT INTO pipelineevents (application_id, event_type, occurrence_index, timestamp, notes, from_stage, to_stage) VALUES
-- === BATCH 1: DefenseCo-A (app 1) — rejected at tech screen ===
(1, 'SUBMITTED',          1, '2026-01-08 09:00:00', null, null, 'SUBMITTED'),
(1, 'RECRUITER_RESPONSE', 1, '2026-01-15 14:00:00', null, 'SUBMITTED', 'RECRUITER_RESPONSE'),
(1, 'RECRUITER_CALL',     1, '2026-01-18 10:00:00', null, 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),
(1, 'TECHNICAL_SCREEN',   1, '2026-01-25 13:00:00', null, 'RECRUITER_CALL', 'TECHNICAL_SCREEN'),
(1, 'REJECTION',          1, '2026-02-01 11:00:00', 'Did not pass technical screen', 'TECHNICAL_SCREEN', 'REJECTED'),

-- === BATCH 1: DefenseCo-B (app 2) — went cold after recruiter call ===
(2, 'SUBMITTED',          1, '2026-01-09 09:00:00', null, null, 'SUBMITTED'),
(2, 'RECRUITER_RESPONSE', 1, '2026-01-17 11:00:00', null, 'SUBMITTED', 'RECRUITER_RESPONSE'),
(2, 'RECRUITER_CALL',     1, '2026-01-21 14:00:00', null, 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),

-- === BATCH 1: FintechCo-A (app 9) — recruiter response only ===
(9, 'SUBMITTED',          1, '2026-01-09 10:00:00', null, null, 'SUBMITTED'),
(9, 'RECRUITER_RESPONSE', 1, '2026-01-18 15:00:00', 'Said military background hard to contextualize', 'SUBMITTED', 'RECRUITER_RESPONSE'),

-- === BATCH 2: DefenseCo-A referral (app 26) — deep pipeline ===
(26, 'SUBMITTED',          1, '2026-02-18 09:00:00', null, null, 'SUBMITTED'),
(26, 'RECRUITER_RESPONSE', 1, '2026-02-20 15:00:00', 'Fast response, mentioned referral', 'SUBMITTED', 'RECRUITER_RESPONSE'),
(26, 'RECRUITER_CALL',     1, '2026-02-23 11:00:00', 'Strong call, asked about clearance and PAM project', 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),
(26, 'TECHNICAL_SCREEN',   1, '2026-03-01 13:00:00', 'LeetCode medium, system design question', 'RECRUITER_CALL', 'TECHNICAL_SCREEN'),
(26, 'TECHNICAL_PASS',     1, '2026-03-04 16:00:00', null, 'TECHNICAL_SCREEN', 'TECHNICAL_PASS'),
(26, 'FINAL_ROUND',        1, '2026-03-07 10:00:00', 'Panel interview, three engineers', 'TECHNICAL_PASS', 'FINAL_ROUND'),

-- === BATCH 2: DefenseCo-B referral (app 27) — tech screen ===
(27, 'SUBMITTED',          1, '2026-02-18 09:00:00', null, null, 'SUBMITTED'),
(27, 'RECRUITER_RESPONSE', 1, '2026-02-21 14:00:00', 'Bob intro, projects discussed', 'SUBMITTED', 'RECRUITER_RESPONSE'),
(27, 'RECRUITER_CALL',     1, '2026-02-25 10:00:00', 'Good conversation about C2 domain', 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),
(27, 'TECHNICAL_SCREEN',   1, '2026-03-06 13:00:00', 'Java focused, Spring questions', 'RECRUITER_CALL', 'TECHNICAL_SCREEN'),

-- === BATCH 2: DefenseCo-C (app 28) — recruiter call ===
(28, 'SUBMITTED',          1, '2026-02-19 09:00:00', null, null, 'SUBMITTED'),
(28, 'RECRUITER_RESPONSE', 1, '2026-02-26 11:00:00', null, 'SUBMITTED', 'RECRUITER_RESPONSE'),
(28, 'RECRUITER_CALL',     1, '2026-03-04 14:00:00', null, 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),

-- === BATCH 2: FintechCo-A referral (app 36) — tech screen ===
(36, 'SUBMITTED',          1, '2026-02-19 09:00:00', null, null, 'SUBMITTED'),
(36, 'RECRUITER_RESPONSE', 1, '2026-02-21 10:00:00', 'Carol referral, immediate response', 'SUBMITTED', 'RECRUITER_RESPONSE'),
(36, 'RECRUITER_CALL',     1, '2026-02-25 15:00:00', 'Java backend focus resonated strongly', 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),
(36, 'TECHNICAL_SCREEN',   1, '2026-03-05 13:00:00', 'API design question, Spring Boot', 'RECRUITER_CALL', 'TECHNICAL_SCREEN'),

-- === BATCH 2: StartupCo-A (app 50) — responded then went cold ===
(50, 'SUBMITTED',          1, '2026-02-21 09:00:00', null, null, 'SUBMITTED'),
(50, 'RECRUITER_RESPONSE', 1, '2026-03-01 16:00:00', 'Role changed scope, paused hiring', 'SUBMITTED', 'RECRUITER_RESPONSE'),

-- === BATCH 3: DefenseCo-F referral (app 56) — recruiter call ===
(56, 'SUBMITTED',          1, '2026-03-02 09:00:00', null, null, 'SUBMITTED'),
(56, 'RECRUITER_RESPONSE', 1, '2026-03-04 14:00:00', 'Dan referral, quick turnaround', 'SUBMITTED', 'RECRUITER_RESPONSE'),
(56, 'RECRUITER_CALL',     1, '2026-03-08 11:00:00', 'Asked about aviation background, less about projects than v2 calls', 'RECRUITER_RESPONSE', 'RECRUITER_CALL'),

-- === BATCH 3: EnterpriseCo-A (app 69) — recruiter call, OMSCS landed ===
(69, 'SUBMITTED',          1, '2026-03-03 09:00:00', null, null, 'SUBMITTED'),
(69, 'RECRUITER_RESPONSE', 1, '2026-03-06 10:00:00', 'Mentioned OMSCS admission as differentiator', 'SUBMITTED', 'RECRUITER_RESPONSE'),
(69, 'RECRUITER_CALL',     1, '2026-03-10 14:00:00', 'Strong call, education emphasis worked well here', 'RECRUITER_RESPONSE', 'RECRUITER_CALL');

-- ============================================================
-- QUALITATIVE TAGS
-- ============================================================
INSERT INTO qualitativetags (application_id, pipelineevent_id, tag_text, sentiment, date, notes) VALUES
-- Batch 1: DefenseCo-A rejection signals
-- event 4 = app1 TECHNICAL_SCREEN, event 5 = app1 REJECTION
(1, 4, 'interviewer focused on leetcode over system design',  'NEGATIVE', '2026-01-25', 'May need more algo prep'),
(1, 5, 'military background not mentioned positively',        'NEGATIVE', '2026-02-01', 'Suggests v1 framing not landing'),
-- Batch 1: FintechCo-A negative signal
-- event 10 = app9 RECRUITER_RESPONSE
(9, 10, 'recruiter said military background hard to contextualize', 'NEGATIVE', '2026-01-18', 'v1 framing confirmed as problem in fintech'),
-- Batch 2: DefenseCo-A referral positive signals
-- event 12 = app26 RECRUITER_RESPONSE, 13 = RECRUITER_CALL, 14 = TECHNICAL_SCREEN, 16 = FINAL_ROUND
(26, 12, 'recruiter mentioned clearance as strong positive',  'POSITIVE', '2026-02-20', 'Clearance clearly valued here'),
(26, 13, 'PAM project came up organically in conversation',   'POSITIVE', '2026-02-23', 'Project artifact producing signal'),
(26, 13, 'asked about spring boot experience specifically',   'NEUTRAL',  '2026-02-23', 'Java enterprise stack confirmed as focus'),
(26, 14, 'system design question felt natural',               'POSITIVE', '2026-03-01', 'Projects framing helped here'),
(26, 16, 'panel asked about aviation domain knowledge',       'POSITIVE', '2026-03-07', 'Domain expertise differentiating'),
-- Batch 2: DefenseCo-B referral
-- event 18 = app27 RECRUITER_RESPONSE, 19 = RECRUITER_CALL
(27, 18, 'projects discussed before military background',     'POSITIVE', '2026-02-21', 'v2 ordering working as intended'),
(27, 19, 'C2 domain knowledge came up positively',            'POSITIVE', '2026-02-25', 'Domain experience valued'),
-- Batch 2: FintechCo-A referral
-- event 26 = app36 RECRUITER_CALL
(36, 26, 'Java backend focus resonated, no military questions','POSITIVE', '2026-02-25', 'v2 framing working in fintech via referral'),
-- Batch 3: DefenseCo-F referral — mixed signal
-- event 32 = app56 RECRUITER_CALL
(56, 32, 'aviation background asked about but projects less prominent', 'NEUTRAL', '2026-03-08', 'v3 compressed military may cost domain signal in defense'),
-- Batch 3: EnterpriseCo-A — education landing
-- event 34 = app69 RECRUITER_RESPONSE, 35 = RECRUITER_CALL
(69, 34, 'OMSCS admission mentioned as strong differentiator','POSITIVE', '2026-03-06', 'Education emphasis working in enterprise'),
(69, 35, 'recruiter said CS background important for this team','POSITIVE', '2026-03-10', 'v3 education split resonating here');

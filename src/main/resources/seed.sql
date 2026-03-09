-- AppTrack Seed Data
-- Two batches demonstrating resume variant signal improvement over time
-- Batch 1: v1-military-heavy, submitted 6-10 weeks ago, poor first-gate conversion
-- Batch 2: v2-projects-forward, submitted 2-4 weeks ago, improved conversion

-- ============================================================
-- COMPANIES
-- ============================================================
INSERT INTO companies (name, segment, size, notes) VALUES
                                                       ('DefenseCo-A',    'DEFENSE',    'LARGE',  'Prime contractor, heavy clearance req'),
                                                       ('DefenseCo-B',    'DEFENSE',    'LARGE',  'Systems integrator'),
                                                       ('DefenseCo-C',    'DEFENSE',    'MEDIUM',    'MEDIUM-size defense IT'),
                                                       ('DefenseCo-D',    'DEFENSE',    'MEDIUM',    'C2 systems focus'),
                                                       ('DefenseCo-E',    'DEFENSE',    'SMALL',  'Small defense startup'),
                                                       ('FintechCo-A',    'FINTECH',    'MEDIUM',    'Payments infrastructure'),
                                                       ('FintechCo-B',    'FINTECH',    'LARGE',  'Enterprise fintech'),
                                                       ('EnterpriseCo-A', 'ENTERPRISE', 'LARGE',  'Legacy enterprise software'),
                                                       ('EnterpriseCo-B', 'ENTERPRISE', 'MEDIUM',    'Cloud migration focus'),
                                                       ('StartupCo-A',    'STARTUP',    'SMALL',  'Series B SaaS');

-- ============================================================
-- RESUME VARIANTS
-- ============================================================
INSERT INTO resumevariants (version_label, date_created, change_summary, file_url) VALUES
                                                                                        ('v1-military-heavy',  '2026-01-05', 'Heavy military experience emphasis, projects minimal, education subdued', null),
                                                                                        ('v2-projects-forward','2026-02-16', 'Projects lead, military contextualized as domain expertise, education split out', null),
                                                                                        ('v3-education-split', '2026-03-01', 'CS minor and OMSCS admission prominent, military compressed, projects maintained', null);

-- ============================================================
-- JOB LISTINGS
-- ============================================================
INSERT INTO joblistings (company_id, title, role_type, experience_level, date_discovered, url, domain_notes) VALUES
-- Defense
(1, 'Software Engineer I',          'BACKEND',   'JUNIOR', '2026-01-06', null, 'Java backend, clearance required'),
(2, 'Associate Software Engineer',  'BACKEND',   'JUNIOR', '2026-01-07', null, 'C2 systems, TS/SCI preferred'),
(3, 'Junior Full Stack Developer',  'FULLSTACK', 'JUNIOR', '2026-01-08', null, 'React/Java, defense domain'),
(4, 'Software Developer I',         'BACKEND',   'JUNIOR', '2026-01-10', null, 'Embedded systems adjacent'),
(5, 'Entry Level SWE',              'BACKEND',   'JUNIOR', '2026-01-12', null, 'Small team, clearance a plus'),
-- Fintech
(6, 'Junior Backend Engineer',      'BACKEND',   'JUNIOR', '2026-01-09', null, 'Payments API, Java Spring'),
(7, 'Associate Engineer',           'FULLSTACK', 'JUNIOR', '2026-01-11', null, 'Full stack, enterprise clients'),
-- Enterprise
(8, 'Entry Level Developer',        'FULLSTACK', 'JUNIOR', '2026-01-08', null, 'Legacy modernization'),
(9, 'Junior Software Engineer',     'BACKEND',   'JUNIOR', '2026-01-13', null, 'Cloud migration team'),
-- Startup
(10,'Software Engineer',            'FULLSTACK', 'JUNIOR', '2026-01-14', null, 'Early stage, generalist needed'),
-- Batch 2 listings
(1, 'Software Engineer I',          'BACKEND',   'JUNIOR', '2026-02-17', null, 'Same req, new headcount'),
(2, 'Associate Software Engineer',  'BACKEND',   'JUNIOR', '2026-02-18', null, 'New cycle open'),
(3, 'Junior Full Stack Developer',  'FULLSTACK', 'JUNIOR', '2026-02-19', null, 'Re-opened position'),
(4, 'Software Developer I',         'BACKEND',   'JUNIOR', '2026-02-20', null, 'Expanded team'),
(5, 'Entry Level SWE',              'BACKEND',   'JUNIOR', '2026-02-21', null, 'Growth hire'),
(6, 'Junior Backend Engineer',      'BACKEND',   'JUNIOR', '2026-02-22', null, 'New headcount approved'),
(7, 'Associate Engineer',           'FULLSTACK', 'JUNIOR', '2026-02-23', null, 'Backfill'),
(8, 'Entry Level Developer',        'FULLSTACK', 'JUNIOR', '2026-02-24', null, 'New project starting'),
(9, 'Junior Software Engineer',     'BACKEND',   'JUNIOR', '2026-02-25', null, 'Team expanding'),
(10,'Software Engineer',            'FULLSTACK', 'JUNIOR', '2026-02-26', null, 'Series B growth');

-- ============================================================
-- CONTACTS
-- ============================================================
INSERT INTO contacts (name, email, phone, company, notes) VALUES
                                                              ('Alice Nguyen',   'alice@example.com', '555-0101', 'DefenseCo-A',    'Met at tech meetup, referred batch 2 app'),
                                                              ('Bob Okafor',     'bob@example.com',   '555-0102', 'DefenseCo-B',    'LinkedIn connection, works in hiring org'),
                                                              ('Carol Simmons',  'carol@example.com', '555-0103', 'FintechCo-A',    'Former colleague referral');

-- ============================================================
-- BATCH 1 APPLICATIONS: v1-military-heavy
-- Submitted 6-10 weeks ago
-- Story: poor first-gate conversion, most stalled at SUBMITTED or INACTIVE
-- 2 defense roles got recruiter responses, 1 made it to screen, none further
-- ============================================================
INSERT INTO applications (
    job_listing_id, resume_variant_id, contact_id,
    referred, source_channel, current_stage,
    date_submitted, date_recruiter_response, date_recruiter_call,
    date_technical_screen, date_technical_pass, date_final_round,
    date_offer, date_rejection, rejection_stage,
    active, notes, alignment_notes
) VALUES
-- DefenseCo-A: got recruiter response, made it to screen, rejected
(1,  1, null, false, 'COLD',              'REJECTED',           '2026-01-08', '2026-01-15', '2026-01-18', '2026-01-25', null, null, null, '2026-02-01', 'TECHNICAL_SCREEN', false, null, 'Strong domain match'),
-- DefenseCo-B: recruiter response, call, then went cold
(2,  1, null, false, 'JOB_BOARD',         'INACTIVE',           '2026-01-09', '2026-01-17', '2026-01-21', null, null, null, null, null, null, false, 'No response after screen scheduled', null),
-- DefenseCo-C: no response, inactive
(3,  1, null, false, 'COLD',              'INACTIVE',           '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
-- DefenseCo-D: no response, inactive
(4,  1, null, false, 'JOB_BOARD',         'INACTIVE',           '2026-01-12', null, null, null, null, null, null, null, null, false, null, null),
-- DefenseCo-E: no response, inactive
(5,  1, null, false, 'COLD',              'INACTIVE',           '2026-01-14', null, null, null, null, null, null, null, null, false, null, null),
-- FintechCo-A: no response, inactive
(6,  1, null, false, 'JOB_BOARD',         'INACTIVE',           '2026-01-11', null, null, null, null, null, null, null, null, false, null, null),
-- FintechCo-B: no response, inactive
(7,  1, null, false, 'COLD',              'INACTIVE',           '2026-01-13', null, null, null, null, null, null, null, null, false, null, null),
-- EnterpriseCo-A: no response, inactive
(8,  1, null, false, 'JOB_BOARD',         'INACTIVE',           '2026-01-10', null, null, null, null, null, null, null, null, false, null, null),
-- EnterpriseCo-B: recruiter response only
(9,  1, null, false, 'COLD',              'INACTIVE',           '2026-01-15', '2026-01-22', null, null, null, null, null, null, null, false, 'Recruiter said overqualified in military', null),
-- StartupCo-A: no response, inactive
(10, 1, null, false, 'JOB_BOARD',         'INACTIVE',           '2026-01-16', null, null, null, null, null, null, null, null, false, null, null);

-- ============================================================
-- BATCH 2 APPLICATIONS: v2-projects-forward
-- Submitted 2-4 weeks ago
-- Story: improved first-gate conversion, defense responding well
-- referral at DefenseCo-A produced strong pipeline progress
-- ============================================================
INSERT INTO applications (
    job_listing_id, resume_variant_id, contact_id,
    referred, source_channel, current_stage,
    date_submitted, date_recruiter_response, date_recruiter_call,
    date_technical_screen, date_technical_pass, date_final_round,
    date_offer, date_rejection, rejection_stage,
    active, notes, alignment_notes
) VALUES
-- DefenseCo-A: referral, deep pipeline progress
(11, 2, 1,    true,  'REFERRAL',          'FINAL_ROUND',        '2026-02-18', '2026-02-20', '2026-02-23', '2026-03-01', '2026-03-04', '2026-03-07', null, null, null, true,  'Alice referral, strong signal on projects', 'High alignment'),
-- DefenseCo-B: recruiter response, call completed, awaiting screen
(12, 2, 2,    true,  'REFERRAL',          'RECRUITER_CALL',     '2026-02-19', '2026-02-22', '2026-02-26', null, null, null, null, null, null, true,  'Bob connection, good conversation', 'Good fit'),
-- DefenseCo-C: recruiter response, scheduled call
(13, 2, null, false, 'JOB_BOARD',         'RECRUITER_RESPONSE', '2026-02-20', '2026-02-27', null, null, null, null, null, null, null, true,  null, null),
-- DefenseCo-D: recruiter response
(14, 2, null, false, 'COLD',              'RECRUITER_RESPONSE', '2026-02-21', '2026-03-01', null, null, null, null, null, null, null, true,  null, null),
-- DefenseCo-E: submitted, no response yet
(15, 2, null, false, 'JOB_BOARD',         'SUBMITTED',          '2026-02-22', null, null, null, null, null, null, null, null, true,  null, null),
-- FintechCo-A: recruiter response, call done, screen scheduled
(16, 2, 3,    true,  'REFERRAL',          'TECHNICAL_SCREEN',   '2026-02-23', '2026-02-25', '2026-02-28', '2026-03-05', null, null, null, null, null, true,  'Carol referral, Java backend focus resonated', null),
-- FintechCo-B: recruiter response only
(17, 2, null, false, 'JOB_BOARD',         'RECRUITER_RESPONSE', '2026-02-24', '2026-03-02', null, null, null, null, null, null, null, true,  null, null),
-- EnterpriseCo-A: submitted, no response
(18, 2, null, false, 'COLD',              'SUBMITTED',          '2026-02-25', null, null, null, null, null, null, null, null, true,  null, null),
-- EnterpriseCo-B: submitted, no response
(19, 2, null, false, 'JOB_BOARD',         'SUBMITTED',          '2026-02-26', null, null, null, null, null, null, null, null, true,  null, null),
-- StartupCo-A: recruiter response, went cold
(20, 2, null, false, 'COLD',              'INACTIVE',           '2026-02-27', '2026-03-03', null, null, null, null, null, null, null, false, 'Role changed scope after response', null);

-- ============================================================
-- PIPELINE EVENTS for key applications
-- ============================================================
INSERT INTO pipelineevents (application_id, event_type, occurrence_index, timestamp, notes) VALUES
-- DefenseCo-A batch 1 (app 1): rejected at tech screen
(1, 'SUBMITTED',          1, '2026-01-08 09:00:00', null),
(1, 'RECRUITER_RESPONSE', 1, '2026-01-15 14:00:00', null),
(1, 'RECRUITER_CALL',     1, '2026-01-18 10:00:00', null),
(1, 'TECHNICAL_SCREEN',   1, '2026-01-25 13:00:00', null),
(1, 'REJECTION',          1, '2026-02-01 11:00:00', 'Did not pass technical screen'),
-- DefenseCo-A batch 2 (app 11): referral, deep pipeline
(11,'SUBMITTED',          1, '2026-02-18 09:00:00', null),
(11,'RECRUITER_RESPONSE', 1, '2026-02-20 15:00:00', 'Fast response, mentioned referral'),
(11,'RECRUITER_CALL',     1, '2026-02-23 11:00:00', 'Strong call, asked about clearance and PAM project'),
(11,'TECHNICAL_SCREEN',   1, '2026-03-01 13:00:00', 'LeetCode medium, system design question'),
(11,'TECHNICAL_PASS',     1, '2026-03-04 16:00:00', null),
(11,'FINAL_ROUND',        1, '2026-03-07 10:00:00', 'Panel interview, three engineers');

-- ============================================================
-- QUALITATIVE TAGS for key touchpoints
-- ============================================================
INSERT INTO qualitativetags (application_id, pipelineevent_id, tag_text, sentiment, date, notes) VALUES
-- Batch 1 DefenseCo-A rejection signal
(1, 5, 'interviewer focused on leetcode over system design',  'NEGATIVE', '2026-02-01', 'May need more algo prep'),
(1, 5, 'military background not mentioned positively',        'NEGATIVE', '2026-02-01', 'Suggests v1 framing not landing'),
-- Batch 2 DefenseCo-A referral signal
(11, 8, 'recruiter mentioned clearance as strong positive',   'POSITIVE', '2026-02-23', 'Clearance clearly valued here'),
(11, 8, 'PAM project came up organically in conversation',    'POSITIVE', '2026-02-23', 'Project artifact producing signal'),
(11, 9, 'asked about spring boot experience specifically',     'NEUTRAL',  '2026-03-01', 'Java enterprise stack confirmed as focus'),
(11,10, 'panel asked about aviation domain knowledge',        'POSITIVE', '2026-03-07', 'Domain expertise differentiating'),
-- EnterpriseCo-B batch 1 negative signal
(9, null,'recruiter said military background hard to contextualize','NEGATIVE','2026-01-22','v1 framing confirmed as problem');
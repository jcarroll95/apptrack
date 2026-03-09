
## Apptrack: Hiring Pipeline Instrumentation

The software engineering hiring process produces outcomes you can observe but not directly explain. Recruiter responses, interview invitations, and rejections are visible. The criteria behind them are not.

This project models each job application as an instance moving through a state machine. Every pipeline transition is recorded alongside the signals presented to the employer at that time: which resume variant was used, the source channel, whether a referral was involved, and qualitative observations from any human touchpoints.

Job listings are stored with each application because postings disappear quickly and are frequently edited. Preserving the original listing keeps the requirements and context tied to an application available for later comparison.

Over time the collected transitions allow basic analysis: which resume variants correlate with recruiter responses, which channels produce interviews, where the pipeline consistently stalls. The goal is not predictive accuracy. It is observability over a process that is otherwise entirely anecdotal.
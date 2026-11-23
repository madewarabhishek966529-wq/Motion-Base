# 10. Testing Strategy and Acceptance Criteria

## 10.1 Test layers
Unit:
- token parsing and validation;
- prompt adapters;
- filter query builders;
- authorization policies;
- animation configuration validation.

Integration:
- database repositories;
- storage upload and variants;
- authentication and RLS;
- prompt persistence;
- background job retries.

End-to-end:
- browse and search references;
- open reference detail;
- inspect screens;
- save to collection;
- generate prompt for every supported tool/scope/framework combination;
- copy/export prompt;
- submit reference;
- admin review and publish.

Visual:
- responsive screenshots at agreed viewports;
- light/dark theme;
- loading/empty/error states;
- reduced-motion behavior.

Performance:
- Lighthouse;
- Web Vitals;
- bundle analysis;
- load tests;
- mobile device testing.

Security:
- authorization bypass tests;
- upload validation;
- XSS and injection checks;
- sandbox escape review;
- rate limiting;
- secret scanning.

## 10.2 Acceptance criteria
Discovery:
- Filters combine correctly.
- Results are paginated.
- Empty and error states exist.
- Gallery does not load full-resolution originals unnecessarily.

Reference detail:
- Every published reference has title, platform, category, source and rights metadata.
- Screen gallery is keyboard accessible.
- Analysis fields show provenance.
- Related data is loaded without N+1 query patterns.

Motion Lab:
- Preview can play, pause and replay.
- Parameters are displayed accurately when known.
- Unknown values are labeled.
- Reduced-motion alternative exists.
- Code examples identify framework and dependencies.

Prompt Studio:
- All four tools are available.
- All four scopes are available.
- All four technology stacks are available.
- Every combination produces a coherent output.
- Tool-specific and framework-specific instructions do not contradict.
- Prompt is editable and copyable.
- Generation failure preserves user choices.
- Inferred facts are labeled.

Admin:
- Only authorized admins can publish.
- Changes are audited.
- Reports and takedown requests can be reviewed.

## 10.3 Definition of done
A feature is not done because its screen exists. It is done when data, validation, permissions, loading/error states, accessibility and tests work.

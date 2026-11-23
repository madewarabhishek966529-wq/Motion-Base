# 12. Master Build Prompt for Antigravity, Cursor or Claude Code

You are a senior product engineer, UX architect and performance-focused frontend developer. Build Motionbase according to the documents in this project kit. Treat the documentation as the product source of truth.

## Product
Motionbase is an application design inspiration and intelligence platform. It helps users discover mobile, web and desktop application references, inspect design systems and motion behavior, explore components and generate implementation prompts for AI development tools.

It is not a generic website gallery and not a full backend app generator.

## First actions
1. Inspect the repository and existing code before changing anything.
2. Read all files in `docs/`.
3. Identify missing decisions and list assumptions.
4. Propose a phased implementation plan.
5. Establish the data model, design tokens, linting, formatting and tests.
6. Implement Phase 1 only unless explicitly asked to continue.

## Core stack
- Next.js App Router.
- React and TypeScript.
- Tailwind CSS.
- Accessible component primitives.
- PostgreSQL and Supabase services where selected.
- Motion for common UI animation.
- GSAP only for advanced timelines.
- Three.js only for a justified 3D feature.

## Product modules
1. Discover.
2. Reference detail.
3. Design Intelligence.
4. Motion Lab.
5. Component Lab.
6. Screen Flow.
7. Prompt Studio.
8. Collections.
9. Community.
10. Admin Studio.

## Prompt Studio matrix
Tools:
- Google Antigravity.
- Cursor.
- Google Stitch.
- Claude Code.

Scopes:
- Complete application.
- Individual screen.
- Animation and motion only.
- Design system and components.

Technologies:
- React + TypeScript.
- Flutter + Dart.
- HTML + CSS + JavaScript.
- Next.js + Tailwind CSS.

Use a structured, versioned prompt intermediate representation. Implement tool, scope and framework adapters. Do not merely swap names in a generic prompt. Make clear that Stitch is primarily a visual design workflow and do not claim unsupported production-code output.

## Design direction
Premium editorial creative platform:
- Ink Navy #101522.
- Pearl White #F4F1FF.
- Electric Coral #FF6B72.
- Controlled violet and cyan accents.
- Strong typography.
- Large reference imagery.
- Clear hierarchy.
- Minimal chrome.
- Accessible contrast.
- Dark and light themes.

Keep the reference's own design palette separate from Motionbase's brand palette.

## Performance rules
- Server components by default for read-heavy pages.
- Small client component boundaries.
- Responsive image variants and lazy loading.
- Reserve image dimensions.
- Cursor pagination.
- Debounced search.
- Dynamic import heavy editor/3D code.
- Avoid excessive blur and continuous animation.
- Pause offscreen motion previews.
- Respect reduced-motion preferences.
- Measure real performance; do not promise zero lag or guaranteed 120 FPS.

## Security and content
- Never expose API keys.
- Enforce authorization server-side.
- Validate and re-encode uploads.
- Never run untrusted code in the main application origin.
- Respect reference licensing, attribution and takedown requests.
- Treat AI output as untrusted and validate it.
- Distinguish observed, extracted, inferred and verified design properties.

## Engineering rules
- Use reusable, typed components.
- Keep domain logic separate from presentation.
- Validate API inputs.
- Add loading, empty, error and partial-data states.
- Add unit, integration and end-to-end tests.
- Avoid dead buttons and fake data presented as real.
- Do not build all phases at once.
- Keep the application runnable after each milestone.

## Required deliverables for each phase
- Working implementation.
- Database migrations.
- Seed data clearly labeled as sample.
- Tests.
- Updated documentation.
- Setup instructions.
- Environment variable example without secrets.
- Known limitations and next steps.

Start with Phase 1: foundation, discovery, search, reference detail, admin content workflow and bookmarks. Do not implement expensive AI analysis before the reference content model and review workflow are working.

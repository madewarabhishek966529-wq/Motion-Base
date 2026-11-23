# 5. Prompt Studio — Functional Specification

## 5.1 Purpose
Turn a selected reference into a detailed, editable implementation brief tailored to an AI development tool, a scope and a technology stack.

## 5.2 Supported AI tools
- Google Antigravity
- Cursor
- Google Stitch
- Claude Code

These are output profiles, not guaranteed integrations. The user copies or exports the prompt and runs it in the chosen product. Do not claim direct execution or API integration unless separately implemented and authorized.

## 5.3 Supported scopes
- Complete application
- Individual screen
- Animation and motion only
- Design system and components

## 5.4 Supported technologies
- React + TypeScript
- Flutter + Dart
- HTML + CSS + JavaScript
- Next.js + Tailwind CSS

## 5.5 Generator inputs
Required:
- reference ID or custom reference description;
- tool;
- scope;
- framework.

Optional:
- target device sizes;
- fidelity level (inspiration, close recreation, pixel-focused);
- animation intensity;
- accessibility constraints;
- existing project context;
- additional user instructions;
- preferred libraries;
- output verbosity.

## 5.6 Prompt output structure
1. Role and objective.
2. Reference context and attribution.
3. What is observed versus estimated.
4. Design principles.
5. Color tokens and gradient recipes.
6. Typography scale.
7. Layout and spacing.
8. Screen-by-screen specification.
9. Component inventory and states.
10. Motion and interaction behavior.
11. Responsive behavior.
12. Framework-specific implementation.
13. File/folder organization where appropriate.
14. Accessibility and reduced motion.
15. Performance requirements.
16. Testing and acceptance criteria.
17. Assumptions and unresolved questions.

## 5.7 Tool adapters
Antigravity profile:
- clear project goal;
- phased implementation plan;
- task decomposition;
- verification checkpoints;
- final validation instructions.

Cursor profile:
- inspect existing codebase first;
- respect existing conventions;
- make incremental changes;
- identify files to modify;
- run relevant checks;
- avoid unnecessary rewrites.

Stitch profile:
- prioritize visual screen composition;
- describe hierarchy, spacing, typography, colors and components;
- specify screen variants and responsive visual behavior;
- provide concise visual iteration instructions;
- do not imply that Stitch will produce every framework's complete production application code.

Claude Code profile:
- inspect repository and existing architecture;
- propose implementation plan;
- implement in coherent modules;
- validate types, tests and build;
- summarize changed files and remaining assumptions.

## 5.8 Framework adapters
React + TypeScript:
- semantic components;
- typed props;
- reusable hooks only where useful;
- Motion or CSS for interaction;
- accessible state handling.

Flutter + Dart:
- widget tree;
- theme extensions and design tokens;
- Navigator or Router approach;
- AnimationController, Tween, CurvedAnimation and implicit animations as appropriate;
- responsive layout and accessibility semantics.

HTML + CSS + JavaScript:
- semantic HTML;
- CSS variables;
- responsive CSS;
- minimal JavaScript;
- progressive enhancement.

Next.js + Tailwind CSS:
- App Router conventions;
- server components by default;
- client components only for interaction;
- design tokens mapped to theme variables;
- dynamic imports for heavy features.

## 5.9 Prompt intermediate representation
Use a validated JSON structure internally, for example:
```json
{
  "project": {"name": "Reference recreation", "platform": "mobile"},
  "screens": [],
  "tokens": {"colors": [], "typography": [], "spacing": []},
  "components": [],
  "animations": [],
  "flows": [],
  "responsiveRules": [],
  "assumptions": [],
  "provenance": []
}
```
The schema must be versioned. Validate before rendering prompts.

## 5.10 Quality checks
- Required sections are present.
- Tool and framework instructions do not conflict.
- Unknown values are labeled as estimates.
- Prompt does not fabricate assets or exact implementation details.
- User can edit before copying.
- Prompt generation failure does not lose user selections.
- Save generated prompt only with appropriate privacy notice.

## 5.11 UX
Show tool, scope and framework selectors.
Offer advanced options behind a collapsible section.
Provide preview, edit, copy, download Markdown and regenerate sections.
Allow regeneration of motion-only or design-token-only sections without replacing the entire prompt.

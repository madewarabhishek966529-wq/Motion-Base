# 3. Technical Architecture

## 3.1 Recommended baseline
Start with a modular monolith:
- Next.js App Router.
- React + TypeScript.
- Tailwind CSS and a small accessible component system.
- PostgreSQL.
- Supabase Auth and Storage, or equivalent managed services.
- Server-side service modules.
- A background worker for image processing and AI analysis.
- Object storage + CDN for images.

Avoid microservices until traffic, team ownership or deployment needs justify them.

## 3.2 Logical layers
1. Presentation: routes, server components, interactive client components.
2. Application: use cases such as search references, save reference, generate prompt.
3. Domain: reference, screen, design token, animation, prompt specification.
4. Infrastructure: database repositories, storage, AI provider adapters, queue, cache.

Keep provider-specific code behind interfaces.

## 3.3 Suggested repository layout
```text
motionbase/
  apps/
    web/
      app/
      components/
      features/
      styles/
      public/
  packages/
    ui/
    domain/
    prompt-engine/
    design-analysis/
    validation/
    config/
  workers/
    media-worker/
    analysis-worker/
  supabase/
    migrations/
    seed/
  docs/
  tests/
  scripts/
```

For a smaller first release, these can live in one Next.js repository without a monorepo. Do not introduce workspace complexity unless shared packages are actually needed.

## 3.4 Frontend rendering
Use server rendering for reference pages, metadata and initial gallery content. Use client components only for interactions such as filters, save controls, galleries, animation previews and editor panels.

Load Monaco, Three.js, advanced timeline editors and other heavy modules dynamically only on routes that need them.

## 3.5 Data and storage
- PostgreSQL stores structured metadata and relationships.
- Object storage stores source assets and generated variants.
- CDN serves optimized image variants.
- Cache only data with a clear invalidation strategy.
- Keep source asset private when its license does not permit public redistribution.

## 3.6 Search
MVP: PostgreSQL full-text search and indexed filter columns.
Later: introduce a dedicated search engine only when relevance, scale or faceting needs exceed PostgreSQL.

Use cursor pagination for large galleries. Avoid unbounded offset queries.

## 3.7 AI analysis
Use provider adapters so the application is not locked to one AI vendor.
Pipeline:
1. Validate asset and rights.
2. Normalize image and create variants.
3. Extract measurable properties using deterministic tools where possible.
4. Use vision model for semantic descriptions and candidate layout/component analysis.
5. Store results with provenance and confidence.
6. Human review for curated content.
7. Publish only reviewed or clearly labeled machine-generated analysis.

AI analysis must not infer hidden source code or exact motion timing from a still screenshot.

## 3.8 Prompt engine
Create a framework-neutral intermediate representation (IR) for the reference:
- product context;
- screens;
- layout;
- tokens;
- components;
- interactions;
- motion;
- responsive rules;
- assumptions and confidence.

Then apply:
- scope adapter;
- framework adapter;
- AI tool adapter;
- output validator.

This avoids duplicating prompt logic for every tool/framework combination.

## 3.9 Observability
Track:
- server errors;
- client errors;
- slow routes;
- database query latency;
- image failures;
- queue depth and retries;
- AI provider latency and cost;
- prompt generation failures.

Do not log passwords, tokens, private prompt content or sensitive user data unnecessarily.

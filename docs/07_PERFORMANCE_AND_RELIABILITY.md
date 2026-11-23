# 7. Performance and Reliability Plan

## 7.1 Performance philosophy
No website can be guaranteed to have zero lag on every device and network. Motionbase should minimize avoidable work, measure real user performance and degrade gracefully.

## 7.2 Performance budgets
Initial targets:
- LCP <= 2.5 seconds at the 75th percentile for key pages.
- INP <= 200 ms at the 75th percentile.
- CLS <= 0.1 at the 75th percentile.
- Lighthouse performance score >= 90 on agreed representative test pages.
- Keep initial JavaScript lean; establish a route-level budget during implementation.
- Gallery image thumbnails should be sized for their rendered dimensions.

## 7.3 Images
- Generate thumbnail, preview and original variants.
- Use AVIF/WebP with fallback where needed.
- Use responsive srcset/sizes.
- Lazy-load below-the-fold imagery.
- Preload only the true hero image.
- Set width/height or aspect ratio to prevent layout shifts.
- Use CDN caching and immutable asset URLs.
- Avoid serving originals in gallery cards.

## 7.4 JavaScript
- Prefer server components for static/read-heavy content.
- Keep interactive client boundaries small.
- Dynamically import Monaco, Three.js and advanced editors.
- Remove unused dependencies.
- Analyze bundle size on each release.
- Avoid large UI libraries for a single small feature.

## 7.5 Rendering and state
- Avoid storing duplicate derived state.
- Keep transient state close to the component.
- Memoize only after profiling.
- Virtualize exceptionally long lists when needed.
- Use cursor pagination.
- Debounce text search and cancel stale requests.
- Prevent duplicate submissions.

## 7.6 Animation
- Prefer transform and opacity.
- Avoid animating width, height, top, left and expensive filters continuously.
- Use `will-change` sparingly and only around active animation.
- Pause offscreen previews with IntersectionObserver.
- Limit simultaneous animated cards.
- Respect `prefers-reduced-motion`.
- Avoid perpetual loops unless they provide meaningful information.
- Test on low-end mobile hardware.

## 7.7 Database and APIs
- Index observed query patterns.
- Avoid N+1 queries.
- Select only needed columns.
- Paginate large result sets.
- Set query timeouts and connection pooling.
- Cache public reference metadata with explicit invalidation.
- Rate-limit AI and upload endpoints.

## 7.8 Background work
Run image conversion, duplicate detection and AI analysis asynchronously.
Use retries with backoff, idempotency keys, dead-letter handling and job status visibility.
Do not keep a user-facing HTTP request open while a long AI job runs.

## 7.9 Reliability
- Health checks.
- Structured logs.
- Error tracking.
- Queue monitoring.
- Database backups.
- Storage lifecycle policies.
- Graceful AI provider failure.
- Retry-safe operations.
- Incident runbook.

## 7.10 Load testing
Test:
- gallery browsing with realistic image counts;
- simultaneous reference detail requests;
- search/filter combinations;
- upload bursts;
- AI job queue saturation;
- prompt generation rate limits.

Set numeric concurrency targets after choosing hosting and budget.

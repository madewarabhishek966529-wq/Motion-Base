# 9. API Boundaries and Background Jobs

These are suggested endpoint contracts; adapt to the final framework and authentication model.

## 9.1 Public reference endpoints
- `GET /api/references` — cursor-paginated reference search.
- `GET /api/references/:slug` — reference detail and approved metadata.
- `GET /api/references/:id/screens` — screen list.
- `GET /api/animations` — filterable animation library.
- `GET /api/components` — component library.
- `GET /api/categories` — categories and tags.

## 9.2 Authenticated endpoints
- `POST /api/collections`
- `PATCH /api/collections/:id`
- `DELETE /api/collections/:id`
- `POST /api/collections/:id/items`
- `DELETE /api/collections/:id/items/:referenceId`
- `POST /api/references/:id/like`
- `DELETE /api/references/:id/like`
- `POST /api/prompts`
- `GET /api/prompts/:id`

## 9.3 Admin endpoints
- `POST /api/admin/references`
- `PATCH /api/admin/references/:id`
- `POST /api/admin/references/:id/publish`
- `POST /api/admin/references/:id/archive`
- `POST /api/admin/submissions/:id/approve`
- `POST /api/admin/submissions/:id/reject`

All admin actions require server-side role checks and audit logging.

## 9.4 Prompt generation contract
Input:
```json
{
  "referenceId": "uuid",
  "tool": "cursor",
  "scope": "complete_application",
  "framework": "react_typescript",
  "fidelity": "close_recreation",
  "additionalInstructions": "Use accessible controls and reduced motion."
}
```
Output:
```json
{
  "promptId": "uuid",
  "status": "completed",
  "prompt": "Editable prompt text",
  "assumptions": [],
  "provenance": []
}
```

Validate allowed enum values and ownership. Apply per-user rate limits and provider cost controls.

## 9.5 Background job types
- `image.generate_variants`
- `image.detect_duplicates`
- `analysis.extract_palette`
- `analysis.describe_layout`
- `analysis.suggest_components`
- `analysis.review_required`
- `search.refresh_index`

Jobs should be idempotent, observable and retry-safe.

## 9.6 Job lifecycle
queued → processing → completed / failed / needs_review.
Store attempt count, error category, timestamps and safe diagnostic information.
Never expose internal stack traces to end users.

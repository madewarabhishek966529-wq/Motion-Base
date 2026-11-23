# 4. Data Model and Database Design

This is a logical schema. Convert it into SQL migrations and refine types and constraints during implementation.

## 4.1 Core entities

### users
- id (UUID, primary key)
- display_name
- username (unique)
- avatar_path
- role (user, curator, admin)
- created_at
- updated_at

### applications
A reference record for a product, app concept or submitted design.
- id
- slug (unique)
- title
- summary
- description
- platform (ios, android, web, desktop, cross_platform)
- category_id
- reference_type (real_product, concept, recreation)
- creator_name
- source_url
- attribution_text
- license_status
- rights_notes
- status (draft, review, published, archived)
- featured
- created_by
- published_at
- created_at
- updated_at

### app_screens
- id
- application_id
- title
- screen_order
- image_original_path
- image_thumbnail_path
- image_preview_path
- alt_text
- screen_description
- created_at

### design_tokens
- id
- application_id
- screen_id nullable
- token_type (color, typography, spacing, radius, shadow, other)
- token_name
- token_value JSONB
- provenance (observed, extracted, inferred, manually_verified, user_submitted)
- confidence (high, medium, low, unknown)
- evidence_note
- reviewed_by nullable
- updated_at

### gradients
- id
- application_id
- name
- gradient_type
- angle
- stops JSONB
- provenance
- confidence

### components
- id
- application_id
- screen_id nullable
- name
- component_type
- description
- variants JSONB
- states JSONB
- responsive_notes
- provenance

### animations
- id
- application_id nullable
- component_id nullable
- name
- category
- description
- trigger_type
- target_description
- duration_ms nullable
- delay_ms nullable
- easing nullable
- spring_config JSONB nullable
- direction nullable
- repeat_config JSONB
- reduced_motion_behavior
- library
- provenance
- confidence
- preview_asset_path nullable

### implementation_snippets
- id
- animation_id nullable
- component_id nullable
- framework
- language
- code
- dependencies JSONB
- notes
- verified_at nullable

### screen_flows
- id
- application_id
- from_screen_id
- to_screen_id
- trigger
- notes
- provenance

### collections
- id
- user_id
- title
- description
- visibility
- created_at

### collection_items
- collection_id
- application_id
- sort_order
- created_at
- unique(collection_id, application_id)

### prompt_templates
- id
- tool
- scope
- framework
- version
- template_body
- active
- updated_at

### generated_prompts
- id
- user_id
- application_id
- tool
- scope
- framework
- prompt_text
- prompt_ir JSONB
- created_at

### likes
- user_id
- application_id
- created_at
- unique(user_id, application_id)

### comments
- id
- user_id
- application_id
- body
- status
- created_at
- updated_at

### reports
- id
- reporter_user_id
- target_type
- target_id
- reason
- details
- status
- created_at

## 4.2 Important relationships
- One application has many screens.
- One application has many design tokens, gradients, components and animations.
- A component can have many animations and snippets.
- An application has many screen-flow edges.
- Users own collections and generated prompts.
- Collections contain applications through collection_items.

## 4.3 Indexes
Create indexes for:
- applications(status, published_at DESC)
- applications(category_id, platform, status)
- applications(slug)
- app_screens(application_id, screen_order)
- design_tokens(application_id, token_type)
- animations(category, library)
- screen_flows(application_id)
- collection_items(collection_id, sort_order)
- likes(application_id)
- generated_prompts(user_id, created_at DESC)

Use GIN indexes for tags or JSONB only when query patterns justify them. Avoid indexing every field.

## 4.4 Data integrity
- Foreign keys with deliberate delete behavior.
- Unique slugs.
- Check constraints for enum-like fields.
- Validate JSONB shape at the application boundary.
- Store timestamps in UTC.
- Keep audit events for admin content changes.

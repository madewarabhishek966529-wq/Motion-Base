# 2. User Experience and Feature Specification

## 2.1 Primary navigation
- Discover
- Motion Lab
- Components
- Collections
- Prompt Studio
- Submit a reference
- Profile

Keep navigation compact. Use search as a first-class entry point.

## 2.2 Discover page
Purpose: quickly find useful application design references.

Features:
- Featured references and curated collections.
- Search with suggestions.
- Filter by platform: iOS, Android, Web, Desktop.
- Filter by category: fintech, productivity, commerce, education, health, travel, social, AI, developer tools and more.
- Filter by visual style: minimal, editorial, brutalist, glass, neumorphic, dark, neon, gradient, playful.
- Filter by dominant color.
- Sort by newest, curated, popular and recently updated.
- Responsive grid with image aspect-ratio placeholders.
- Infinite loading only when correctly cursor-paginated; otherwise use explicit pagination.

Card content:
- Cover image.
- App/reference title.
- Platform and category.
- Small style tags.
- Save action.
- Attribution/source indicator.

## 2.3 Reference detail page
Recommended sections:
1. Overview: title, creator, source, platform, category and rights/attribution.
2. Screen gallery: screen thumbnails, full-screen viewer and screen labels.
3. Design DNA: palette, gradients, typography, spacing, radii, shadows and layout notes.
4. Motion breakdown: animation list and confidence labels.
5. Components: component inventory and states.
6. Screen flow: navigable graph of screen relationships.
7. Implementation: framework examples and prompt generation.
8. Related references.

A reference must clearly state whether it is a real product, concept design or community recreation.

## 2.4 Design DNA
Each property should have:
- Name and value.
- Source: manually verified, extracted, AI-inferred or user-submitted.
- Confidence: high, medium, low or unverified.
- Optional evidence note.
- Last reviewed timestamp.

Do not claim exact font family, spacing, easing or duration based only on a raster screenshot.

## 2.5 Motion Lab
Categories:
- Page transitions.
- Slide, fade, scale and shared-element transitions.
- Spring interactions.
- Scroll and parallax.
- Gradient animation.
- Glow and blur effects.
- Liquid and morphing effects.
- 3D motion.
- Navigation and gesture interactions.
- Loading and skeleton states.
- Charts and data visualization.
- Micro-interactions.

Each animation record:
- Name and description.
- Preview asset or isolated live demo.
- Trigger.
- Target element.
- Duration and delay, if known.
- Easing or spring parameters, if known.
- Direction and repeat behavior.
- Reduced-motion alternative.
- Library and supported framework.
- Code sample.
- Observed/inferred status.

## 2.6 Component Lab
Component types:
- Buttons, inputs, forms.
- Cards, lists, tables.
- App bars, tab bars, sidebars, bottom navigation.
- Dialogs, modals, sheets, popovers.
- Tabs, dropdowns, tooltips.
- Charts, metrics and progress indicators.
- Notifications and empty states.

Show component variants, interaction states, responsive rules and code samples.

## 2.7 Screen Flow
Represent screens as nodes and transitions as edges.
Each edge can include trigger (tap, submit, swipe, deep link), destination and notes.
Allow zoom, pan, fit-to-screen and screen selection.
Do not imply a flow is verified if it was inferred from screenshots.

## 2.8 Collections
- Private by default.
- User can create, rename, reorder and delete collections.
- Save and remove references.
- Optional public sharing.
- Avoid duplicate bookmarks.
- Provide empty and loading states.

## 2.9 Community submissions
Submission workflow:
Draft → Rights declaration → Metadata → Screens/assets → Preview → Moderation → Published or rejected.
Require submitter to confirm they own the work or have permission to submit it.
Provide takedown/report workflow.

## 2.10 Admin
- Reference CRUD.
- Multi-screen upload.
- Attribution and license fields.
- Tag/category management.
- Design token editing.
- Motion metadata editing.
- Submission moderation.
- User reports.
- Audit log.
- Role-based permissions.

## 2.11 Accessibility and usability
- Keyboard navigation and visible focus.
- Proper labels and alt text.
- Contrast checks.
- Reduced-motion mode.
- Do not communicate status by color alone.
- Avoid autoplaying motion previews with sound.
- Make animation replay controls available.

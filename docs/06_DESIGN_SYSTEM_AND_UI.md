# 6. Design System and UI Direction

## 6.1 Brand
Name: Motionbase
Positioning: application design intelligence and motion reference platform.
Suggested tagline: Discover. Deconstruct. Create.

## 6.2 Visual direction
Premium editorial creative-tool aesthetic. The UI should make application references the hero; chrome should stay restrained.

Suggested palette:
- Ink Navy: #101522
- Deep Surface: #171F30
- Elevated Surface: #202B40
- Pearl White: #F4F1FF
- Muted Text: #AEB8CC
- Electric Coral: #FF6B72
- Violet: #7867FF
- Cyan accent: #39D8E8

These are starting tokens, not mandatory colors for every reference. Reference palettes must remain separate from Motionbase's brand palette.

## 6.3 Typography
Use a highly legible sans-serif for interface text. Use a distinctive display face only for editorial headings if it does not harm readability. Define:
- display;
- heading;
- body;
- label;
- caption;
- code.

Use a consistent type scale and line-height system.

## 6.4 Layout
- Responsive max-width container.
- Consistent spacing scale.
- Gallery cards with reserved image aspect ratios.
- Clear hierarchy and readable metadata.
- Avoid overly dense sidebars on small screens.
- Reference detail pages should support full-width imagery and compact technical panels.

## 6.5 Interaction
- Use CSS for simple hover/focus.
- Use Motion for React UI transitions.
- Use GSAP only for complex timelines or scroll choreography.
- Use reduced-motion alternatives.
- Keep interaction feedback immediate.
- Avoid decorative animation that delays navigation or content access.

## 6.6 Component standards
Build accessible variants for:
- buttons;
- inputs;
- search;
- filter chips;
- cards;
- tabs;
- dialogs;
- tooltips;
- dropdowns;
- code blocks;
- image viewers;
- animation players;
- token swatches;
- prompt editor.

## 6.7 Responsive breakpoints
Choose breakpoints based on content fit, not device labels. Test approximately:
- 360–390 px mobile;
- 768 px tablet;
- 1024 px small desktop;
- 1440 px wide desktop.

## 6.8 Content states
Every data-driven page needs:
- loading state;
- empty state;
- error state;
- partial-data state;
- permission-denied state where relevant.

## 6.9 Image accessibility
Every meaningful reference image needs descriptive alt text. Decorative imagery uses empty alt text. Do not use image text as the only source of critical information.

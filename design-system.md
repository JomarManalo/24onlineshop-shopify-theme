# 24 OnlineShop — Design System

Built on Shopify's Dawn theme. Brand colors and type come from the 24 OnlineShop logo
(orange and yellow curtains, black wordmark).

Design drafts: https://claude.ai/artifact/9BH3JUirjUBUdTwSPvwFso (Homepage + Product page boards)

## Brand feel

Friendly, bright and good value. Warm off-white pages with black type, and orange used only as
an accent.

**Color balance:** about 60% warm white or cream, 30% black, and 10% orange or yellow.

## Palette

| Role | Name | HEX | Use |
|---|---|---|---|
| Primary brand | Curtain Orange | `#F28C1E` | Primary buttons, cart count, promo band |
| Secondary brand | Marigold | `#F2B824` | Sale badges, announcement bar, stars |
| Deep accent | Burnt Orange | `#B54708` | Links, sale prices, icons on cream |
| Ink | Logo Black | `#1C1C1C` | Text, footer, secondary buttons |
| Background | Warm White | `#FFFBF5` | Main background |
| Alt background | Soft Cream | `#FFF3E0` | Alternate sections, info boxes |
| Neutral | Grid Grey | `#E6E4E0` | Borders, dividers |
| Secondary text | Warm Grey | `#5C5650` | Descriptions, meta text |

### Contrast rules
- **Never put white text on orange** (2.5:1, which fails). Orange buttons get **black** labels (6.9:1).
- Black text on Marigold is 9.5:1.
- For orange **text** on light backgrounds, use Burnt Orange `#B54708` (5.4:1), not the bright orange.

## Theme color schemes (Theme settings › Colors)

| Scheme | Background | Text | Button / label | Secondary | Used for |
|---|---|---|---|---|---|
| scheme-1 Main | `#FFFBF5` | `#1C1C1C` | `#F28C1E` / `#1C1C1C` | `#B54708` | Default pages, header, trust bar, rooms |
| scheme-2 Cream | `#FFF3E0` | `#1C1C1C` | `#F28C1E` / `#1C1C1C` | `#B54708` | Hero, best sellers, testimonials, collection banner |
| scheme-3 Orange | `#F28C1E` | `#1C1C1C` | `#1C1C1C` / `#FFFFFF` | `#1C1C1C` | Promo / sale band |
| scheme-4 Dark | `#1C1C1C` | `#FFFBF5` | `#F2B824` / `#1C1C1C` | `#F2B824` | Footer, sold-out badge |
| scheme-5 Marigold | `#F2B824` | `#1C1C1C` | `#1C1C1C` / `#FFFFFF` | `#1C1C1C` | Announcement bar, sale badge |

## Typography
- **Headings:** Poppins Bold (`poppins_n7`), scale 110%, tight letter-spacing.
- **Body:** Inter Regular (`inter_n4`).

## Shape
- Buttons, inputs and variant pills: 12px radius.
- Cards and media: 20px radius.
- Badges: pill shape.
- No shadows.

## Custom files (prefix `os24-`)

| File | Purpose |
|---|---|
| `assets/os24-brand.css` | Global brand layer: logo, sale price color, custom section styles, delivery box, sticky add-to-cart |
| `snippets/os24-logo.liquid` | Curtain-icon wordmark. The header shows it when no logo image is uploaded |
| `sections/os24-hero.liquid` | Split hero: badge, heading, text, 2 buttons, image |
| `sections/os24-trust-bar.liquid` | Up to 4 icon + text items |
| `sections/os24-shop-by-room.liquid` | Room tiles with label overlays |
| `sections/os24-testimonials.liquid` | Star-rated review cards |
| `sections/os24-sticky-atc.liquid` + `assets/os24-sticky-atc.js` | Mobile-only sticky add-to-cart bar that mirrors the main product form |

Everything else is stock Dawn, configured through templates and settings (collection list,
featured collection, image with text, newsletter, main product, related products).

## Content placeholders to replace
Bracketed text such as `[AMOUNT]`, `[Delivery time]`, `[Return policy]`, `[X]%`, `[DATE]`
and the testimonial quotes are placeholders. Replace them in the theme editor with real store
details and real customer reviews.

# Technical Stack Analysis — EdgeTech Solutions

## Target Site Analysis
- **CMS / Core:** WordPress (Astra Theme + Elementor Page Builder)
- **Styling:** CSS variables with Astra global theme color palette (`--ast-global-color-*`), Elementor responsive grids
- **Fonts:** Poppins (Headings) & Raleway (Body text)
- **Forms:** WPForms
- **Slider/Carousel:** Swiper.js

## Cloned Stack Implementation
- **Framework:** Next.js 16 (App Router with React 19)
- **Language:** TypeScript (Strict mode, zero `any`)
- **Styling:** Tailwind CSS v4 with custom OKLCH and CSS token matching
- **Typography:** `next/font/google` for `Poppins` and `Raleway`
- **Icons:** Custom extracted SVG components with exact paths
- **Images:** WebP optimized downloaded static assets in `public/images/`
- **Interactivity:** React Hooks (`useState`, `useEffect`) for Image Carousel, Mobile Nav Drawer, and Contact Form

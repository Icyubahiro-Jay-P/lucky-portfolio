# LUCKY - Nisingizwe Lucky Junior Portfolio

Personal portfolio for Nisingizwe Lucky Junior, Backend Developer from Rwanda. Tagline: "From bare metal to REST endpoints." Focused on APIs, databases, and systems behind the interface.

## Tech Stack

- React 19 + Vite 8 with HMR
- Tailwind CSS 4 via @tailwindcss/vite
- Liquid Glass via @ybouane/liquidglass
- Lucide React icons
- ESLint + React Hooks + React Refresh

## Features

- Flat root layout required by LiquidGlass - all glass panels refract the same SystemBackground canvas
- Sections: Nav, Hero, About, Skills, Projects, EducationCerts, Contact, Footer
- Responsive design, motion-reduced fallback, accessible navigation

## Project Structure

- src/App.jsx - flat root with SystemBackground and section order
- src/components/ - Nav, Hero, About, Skills, Projects, etc.
- src/hooks/useLiquidGlass.js - glass mode and init
- src/data/content.js - person
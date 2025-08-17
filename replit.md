# Overview

This is a full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes. The application serves as a corporate website to showcase the company's products, services, certifications, and news. It features a single-page application (SPA) architecture with a React frontend and Express.js backend, designed for informational display and future expansion with interactive features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite.
- **Routing**: Wouter for client-side routing.
- **UI Components**: Radix UI primitives and shadcn/ui components.
- **Styling**: Tailwind CSS with custom brand colors and CSS variables.
- **State Management**: React Query (TanStack Query) for server state.
- **Forms**: React Hook Form with Zod validation.
- **Animations**: Custom CSS animations and Intersection Observer.

## Backend Architecture
- **Framework**: Express.js with TypeScript.
- **Database Layer**: Drizzle ORM for PostgreSQL.
- **Storage Interface**: Abstract storage with in-memory implementation for development.
- **API Structure**: RESTful API design with `/api` prefix.

## Component Structure
Follows a modular component architecture including Pages, Sections, UI Components, and custom Hooks.

## Data Management
- **Database Schema**: User management with Drizzle ORM and Zod validation.
- **Development Storage**: In-memory storage.
- **Production Ready**: Configured for PostgreSQL with Neon database adapter.
- **Type Safety**: Full TypeScript integration.

## Styling and Design
- **Design System**: Consistent color palette with Konti Hidroplast brand colors.
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints.
- **Accessibility**: Radix UI primitives ensure WCAG compliance.
- **Typography**: Inter font family.

## UI/UX Decisions
- Modern slider-style navigation across product pages and brochures for consistent UX.
- Enhanced active URL highlighting in navigation.
- Admin panel navigation consolidates Team Members and Positions under "Our Team" dropdown for improved organization.
- Professional design matching company branding for all content sections (e.g., About Us, Career, News, Certificates, Product pages like KONTI KAN DRAINAGE and Manholes).
- Image galleries with hover effects and smooth animations.

## Feature Specifications
- Comprehensive product showcases (e.g., Water Supply Systems PE Fittings, PP HM Fittings, Gas Pipeline Systems, KONTI KAN DRAINAGE, Manholes).
- Integrated news section with "Load More" functionality.
- Certificates page organized by categories with downloadable PDFs.
- Career page detailing company culture and application process.
- Team and Position management systems within the admin panel, including full CRUD operations.
- Professional gallery section on About Us page covering Production, Quality Control, Storage, and Projects.
- Multi-language support (US, MK, DE).

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL.
- **Drizzle ORM**: For database operations and migrations.

## UI Framework
- **Radix UI**: Accessible React primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: Component library built on Radix UI.

## Development Tools
- **Vite**: Build tool.
- **TypeScript**: For type safety.

## Third-party Services
- **YouTube**: For corporate video embedding.
- **External Links**: Integration with company's existing website, LinkedIn, Facebook, Instagram.
- **Google Fonts**: For typography.

## Runtime Dependencies
- **React Query**: Server state management.
- **Wouter**: Routing library.
- **React Hook Form**: Form handling.
- **Date-fns**: Date manipulation utilities.
- **Lucide React**: Icon library.
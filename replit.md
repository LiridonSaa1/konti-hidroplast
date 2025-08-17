# Overview

This is a modern full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes. The application serves as a corporate website showcasing the company's products, services, certifications, and news. It features a single-page application (SPA) architecture with a React frontend and Express.js backend, designed for both informational display and potential future expansion with interactive features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite.
- **Routing**: Wouter for client-side routing.
- **UI Components**: Design system built on Radix UI primitives with shadcn/ui components.
- **Styling**: Tailwind CSS with custom brand colors and CSS variables.
- **State Management**: React Query (TanStack Query) for server state.
- **Forms**: React Hook Form with Zod validation.
- **Animations**: Custom CSS animations and Intersection Observer.

## Backend Architecture
- **Framework**: Express.js with TypeScript.
- **Database Layer**: Drizzle ORM configured for PostgreSQL.
- **Storage Interface**: Abstract storage interface with in-memory implementation for development.
- **API Structure**: RESTful API design with `/api` prefix.

## Component Structure
The frontend follows a modular component architecture: Pages, Sections, UI Components, and Custom Hooks.

## Data Management
- **Database Schema**: User management with Drizzle ORM and Zod validation.
- **Development Storage**: In-memory storage for rapid development.
- **Production Ready**: Configured for PostgreSQL with Neon database adapter.
- **Type Safety**: Full TypeScript integration across frontend, backend, and shared schemas.

## Styling and Design
- **Design System**: Consistent color palette with Konti Hidroplast brand colors.
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Accessibility**: Radix UI primitives ensure WCAG compliance.
- **Typography**: Inter font family.
- **Admin Panel UI**: Grouped navigation for "Our Team" (Team Members and Positions) and "Brochures" (Brochures and Categories), with consistent table designs and dropdown structures.

## Feature Specifications
- **Product Pages**: Slider-style navigation for product sections (e.g., PP HM Fittings, Gas Pipeline Systems, Brochures).
- **Navigation**: Active URL highlighting and parent dropdown highlighting.
- **Language Support**: US, MK, and DE with comprehensive German translations.
- **Content Pages**: Dedicated pages for KONTI KAN DRAINAGE, Manholes, Career, News (with "Load More"), and Certificates (categorized with downloadable PDFs).
- **About Us Section**: Includes a professional gallery (Production, Quality Control, Storage, Projects), a timeline, leadership message, and updated color schemes.
- **News Page**: Text truncation for article titles.
- **Team and Position Management**: CRUD systems for team members and organizational positions, with database and in-memory storage support, accessible via admin panel.
- **Brochures Management**: Enhanced brochures system with dropdown navigation structure featuring separate management for brochures and categories, both with title, description, and status fields with full CRUD operations.

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database.
- **Drizzle ORM**: Type-safe database operations.

## UI Framework
- **Radix UI**: Accessible React primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: Pre-built component library.

## Development Tools
- **Vite**: Fast build tool.
- **TypeScript**: Type safety.
- **ESBuild**: Fast JavaScript bundler.

## Third-party Services
- **YouTube**: Corporate video embedding.
- **External Links**: Integration with company's existing website, social media (LinkedIn, Facebook, Instagram).
- **Google Fonts**: Web font loading.

## Runtime Dependencies
- **React Query**: Server state management.
- **Wouter**: Lightweight routing library.
- **React Hook Form**: Form handling.
- **Date-fns**: Date manipulation utilities.
- **Lucide React**: Icon library.
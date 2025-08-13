# Overview

This is a modern full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes founded in 1975. The application serves as a corporate website showcasing the company's products, services, certifications, and news. It features a single-page application (SPA) architecture with a React frontend and Express.js backend, designed for both informational display and potential future expansion with interactive features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive design system built on Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom brand colors and CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation schemas
- **Animations**: Custom CSS animations and intersection observer-based triggers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: Uses Vite middleware in development for hot module replacement
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema definitions in shared directory
- **Storage Interface**: Abstract storage interface with in-memory implementation for development
- **API Structure**: RESTful API design with `/api` prefix routing

## Component Structure
The frontend follows a modular component architecture:
- **Pages**: Route-level components (Home, NotFound)
- **Sections**: Large content blocks (Hero, About, Products, Contact, etc.)
- **UI Components**: Reusable design system components
- **Hooks**: Custom React hooks for intersection observation, counter animations, and toast notifications

## Data Management
- **Database Schema**: User management with Drizzle ORM and Zod validation
- **Development Storage**: In-memory storage implementation for rapid development
- **Production Ready**: Configured for PostgreSQL with Neon database adapter
- **Type Safety**: Full TypeScript integration across frontend, backend, and shared schemas

## Styling and Design
- **Design System**: Consistent color palette with Konti Hidroplast brand colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Radix UI primitives ensure WCAG compliance
- **Typography**: Inter font family with custom font loading

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database with `@neondatabase/serverless` adapter
- **Drizzle ORM**: Type-safe database operations and migrations
- **Connection**: Uses `DATABASE_URL` environment variable

## UI Framework
- **Radix UI**: Comprehensive set of accessible React primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **shadcn/ui**: Pre-built component library built on Radix UI

## Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Full type safety across the application
- **ESBuild**: Fast JavaScript bundler for production builds

## Third-party Services
- **YouTube**: Corporate video embedding for hero section background
- **External Links**: Integration with company's existing website, social media platforms (LinkedIn, Facebook, Instagram)
- **Google Fonts**: Web font loading for typography

## Runtime Dependencies
- **React Query**: Server state management and caching
- **Wouter**: Lightweight routing library
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation utilities
- **Lucide React**: Icon library for UI elements
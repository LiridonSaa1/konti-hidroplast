# Overview

This is a modern full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes. The application serves as a corporate website showcasing the company's products, services, certifications, and news. It features a single-page application (SPA) architecture designed for both informational display and future expansion with interactive features. Key capabilities include dynamic product displays, news management with rich article structures, comprehensive gallery displays, and advanced document and certificate management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite.
- **Routing**: Wouter for client-side routing.
- **UI Components**: Design system built on Radix UI primitives with shadcn/ui components.
- **Styling**: Tailwind CSS with custom brand colors and CSS variables. Mobile-first approach.
- **State Management**: React Query (TanStack Query) for server state.
- **Forms**: React Hook Form with Zod validation.
- **Animations**: Custom CSS animations and Intersection Observer.

## Backend Architecture
- **Framework**: Express.js with TypeScript.
- **Database Layer**: Drizzle ORM configured for PostgreSQL.
- **Storage Interface**: Abstract storage interface with in-memory implementation for development and PostgreSQL for production.
- **API Structure**: RESTful API design with `/api` prefix.

## Component Structure
The frontend follows a modular component architecture: Pages, Sections, UI Components, and Custom Hooks.

## Data Management
- **Database Schema**: User management, news articles, product information, certificates, gallery categories/items, team members, positions, brochures, and documents managed with Drizzle ORM.
- **Type Safety**: Full TypeScript integration across frontend, backend, and shared schemas.

## Styling and Design
- **Design System**: Consistent color palette with Konti Hidroplast brand colors.
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Accessibility**: Radix UI primitives ensure WCAG compliance.
- **Typography**: Inter font family.
- **Admin Panel UI**: Consistent table designs, dropdown structures, and card-based layouts across all management interfaces (e.g., Team, Brochures, Certificates, Gallery).

## Feature Specifications
- **Product Pages**: Slider-style navigation for product sections.
- **Navigation**: Active URL highlighting and parent dropdown highlighting.
- **Language Support**: US, MK, and DE with comprehensive German translations.
- **Content Pages**: Dedicated pages for KONTI KAN DRAINAGE, Manholes, Career, News (with "Load More"), and Certificates (categorized with downloadable PDFs).
- **About Us Section**: Includes a professional gallery (Production, Quality Control, Storage, Projects), a timeline, and leadership message.
- **News Management**: Supports rich, multi-section articles with subtitles, dynamic sections (text-only, image-only, text-with-image), and section reordering.
- **Team and Position Management**: CRUD systems for team members and organizational positions via admin panel.
- **Brochures Management**: Enhanced system with separate management for brochures and categories, featuring title, description, status fields, and full CRUD operations.
- **Certificate Management**: Dynamic filtering of categories/subcategories, public API endpoints, and enhanced admin panel management with consistent design patterns.
- **Gallery Management**: Comprehensive system with `galleryCategories` and `galleryItems` tables, full CRUD operations via API, and dynamic display on frontend with image modals and pagination. Supports image uploads with drag-and-drop.
- **Document Management**: Advanced multilingual document management with table-style interface, "Add More" functionality for multiple language entries, dynamic PDF/image upload capabilities, and language switching.

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
- **Brevo**: Email sending service for contact forms.
- **YouTube**: Corporate video embedding.
- **Google Fonts**: Web font loading.

## Runtime Dependencies
- **React Query**: Server state management.
- **Wouter**: Lightweight routing library.
- **React Hook Form**: Form handling.
- **Date-fns**: Date manipulation utilities.
- **Lucide React**: Icon library.
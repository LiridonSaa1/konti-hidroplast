# Overview

This is a modern full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes. The application serves as a corporate website showcasing the company's products, services, certifications, and news. It features a single-page application (SPA) architecture with a React frontend and Express.js backend, designed for both informational display and potential future expansion with interactive features.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## Migration and Authentication Security Fix (August 18, 2025)
- Successfully migrated project from Replit Agent to standard Replit environment
- Fixed critical authentication security issue with duplicate admin users
- Implemented single admin user enforcement in both DatabaseStorage and MemStorage
- Added user cleanup API endpoint (`/api/auth/cleanup-users`) to remove duplicate admin accounts
- Updated storage interface with new methods: getAllUsers(), getAdminUser(), deleteUser()
- System now prevents creation of multiple admin users and enforces single admin login
- Fixed login error display to show proper red error messages instead of runtime error overlay
- Enhanced error handling in AuthContext to prevent unhandled promise rejections
- Enhanced Gallery Categories Manager with FileUpload component for both create and edit operations
- Enhanced Gallery Items Manager with FileUpload component for both create and edit operations
- Added image preview functionality with drag-and-drop support for both gallery managers
- Improved user experience with visual image previews and better error handling
- Both gallery management components now support URL input and file upload with drag-and-drop functionality

## Enhanced Projects Management (August 18, 2025)
- Added sortOrder field to projects database schema and form
- Implemented search functionality to filter projects by title and description
- Added clickable sortable table headers for Title, Status, Order, and Created columns
- Updated action buttons to match Enhanced Brochures Management style (ghost buttons)
- Projects now default to sorting by Order column in ascending order
- Improved numeric and date sorting with proper type handling
- Added empty state message with search context and quick action button

## Comprehensive Gallery Management System (August 18, 2025)
- Created complete gallery database schema with galleryCategories and galleryItems tables
- Built full-stack implementation with PostgreSQL/Drizzle backend and React frontend
- Added API routes for gallery categories and items with complete CRUD operations
- Implemented storage methods in both DatabaseStorage and MemStorage classes
- Created GalleryCategoriesManager with search, sorting, and status filtering functionality
- Created GalleryItemsManager with category filtering and image management capabilities
- Integrated Gallery dropdown navigation structure in AdminPanel with auto-opening logic
- Added gallery count cards to overview dashboard with proper styling
- Gallery Categories include: image, title, sort order, and status fields
- Gallery Items include: category assignment, image URL, sort order, and status fields
- Both components follow consistent admin panel design patterns with table views and ghost buttons

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
- **Enhanced Document Management**: Advanced multilingual document management system with table-style interface, "Add More" functionality for multiple language entries, dynamic PDF/image upload capabilities, language switching with automatic content display, and local storage for data persistence. Fixed issue where only first language entry was being saved - now properly saves all language versions with separate database entries linked by translation groups.

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
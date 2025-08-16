# Overview

This is a modern full-stack web application for Konti Hidroplast, a Macedonian manufacturer of PE and PP pipes founded in 1975. The application serves as a corporate website showcasing the company's products, services, certifications, and news. It features a single-page application (SPA) architecture with a React frontend and Express.js backend, designed for both informational display and potential future expansion with interactive features.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (August 2025)

## August 16, 2025
- **PP HM Fittings Design Update**: Updated PP HM Fittings section design to match Water Supply Systems PE Fittings
  - Replaced simple tab-based navigation with modern slider-style navigation
  - Added left/right navigation arrows and dot indicators matching PE Fittings design
  - Improved user experience with consistent design patterns across product pages
  - Enhanced mobile and desktop navigation experience
- **Gas Pipeline Systems Fittings Update**: Updated Gas Pipeline Systems PE Fittings section to match Water Supply Systems design
  - Replaced simple tab-based navigation with modern slider-style navigation
  - Added left/right navigation arrows and dot indicators for consistent UX
  - Improved navigation functionality with next/previous tab controls
  - Enhanced visual consistency across all product pages
- **KONTI KAN DRAINAGE Page Added**: Created comprehensive drainage systems page at /konti-kan-drainage route
  - Fetched all content from https://konti-hidroplast.com.mk/konti-kan-drainage/
  - Features KONTI DREN drainage pipes with technical specifications
  - Includes slot patterns (PP, MP, FP), applications, and compliance standards
  - Professional design matching water-supply-systems page structure
  - Added proper routing in App.tsx for drainage page
- **Manholes Page Added**: Created comprehensive manholes page at /manholes route
  - Fetched all content from https://konti-hidroplast.com.mk/manholes/
  - Features detailed information about HDPE and PP manholes with characteristics
  - Includes applications, advantages, and technical specifications
  - Professional design with image galleries and brochure download links
  - Added proper routing in App.tsx for manholes page
- **Migration to Standard Replit**: Successfully migrated project from Replit Agent to standard Replit environment
  - Enhanced security with proper client/server separation
  - Maintained all existing functionality and features
  - Project structure and dependencies verified and working
  - Added mobile padding improvements to About Us section
- **Mobile UI Enhancement**: Improved About Us section mobile spacing
  - Added responsive padding: py-16 for mobile, py-8 for tablets, py-0 for desktop
  - Better visual breathing room on mobile devices
- **News Page Enhancement**: Added text truncation functionality to news article titles
  - Titles now automatically truncate to 56 characters with ellipsis
  - Improves visual consistency in news card layout
  - Maintains readability while preventing layout breaks

## August 15, 2025
- **Career Page Added**: Created comprehensive career page at /career route
  - Based on content structure from https://konti-hidroplast.com.mk/career/
  - Features company culture, career opportunities across departments, and application process
  - Professional design with contact information and application flow
  - Added career link to navigation menu
  - Added proper routing in App.tsx for career page
- **News Page Added**: Created comprehensive news page at /news route
  - Fetched all news content from https://konti-hidroplast.com.mk/news/
  - Displays 6 news cards initially with "Load More" functionality
  - Professional card-based design with animations and hover effects
  - Updated navigation to redirect news clicks to /news instead of anchor link
  - Added proper routing in App.tsx for news page
- **Certificates Page Added**: Created comprehensive certificates page at /certificates route
  - Fetched all certificate data from https://konti-hidroplast.com.mk/certificates/
  - Organized certificates by categories: EPD, Quality Management, Water Supply, Sewerage, Gas, Cable Protection
  - Professional design with downloadable PDFs and certificate-only viewing
  - Updated navigation to link to certificates page instead of external URL
  - Added proper routing in App.tsx for certificates page
  - Redesigned with slider-style tab navigation for better UX
- **Brochures Fix**: Updated all sewerage systems brochure PDF download links with authentic URLs from konti-hidroplast.com.mk
  - Fixed 8 sewerage system brochures with correct PDF download links
  - All brochure downloads now link to the actual company PDF files
  - Improved user experience with working download functionality

## August 14, 2025
- **Migration Completed**: Successfully migrated project from Replit Agent to standard Replit environment
- **Gallery Section Added**: Created professional gallery section on About Us page with four interactive categories:
  - Production: Manufacturing facilities and processes
  - Quality Control: Testing laboratories and quality assurance
  - Storage: Warehouse and inventory management systems
  - Projects: Major infrastructure implementations
  - Features hover effects, smooth animations, and brand-consistent styling
- **UI Color Updates**: Updated About Us page color scheme to use brand color #1c2d56 consistently across:
  - Timeline section elements (calendar icons, titles)
  - Commerce team member icons
  - Timeline slider progress indicator and controls
  - Leadership section styling
- **Footer Enhancement**: Updated contact info icons (location and phone) to match text color for better visual consistency
- **Leadership Section**: Added professional leadership message section featuring:
  - Boris Madjunkov's official photograph
  - Company mission statement and leadership message
  - Modern gradient background design with brand colors
  - Responsive layout with elegant hover effects
- **Layout Improvement**: Moved certifications/sponsors slider above projects section on About Us page for better content flow
- **Projects Section Design**: Updated Projects title to match brand design with decorative red lines on both sides

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
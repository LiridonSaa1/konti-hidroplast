{ pkgs }: {
  deps = [
    # Node.js and package management
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
    
    # Development tools
    pkgs.tsx
    pkgs.git
    
    # Database tools
    pkgs.postgresql
    
    # Build tools
    pkgs.esbuild
    pkgs.vite
    
    # Development dependencies
    pkgs.nodePackages.nodemon
    
    # System dependencies
    pkgs.libvips
    pkgs.imagemagick
    pkgs.pkg-config
    
    # PDF processing (for document management)
    pkgs.poppler_utils
    
    # Additional utilities
    pkgs.curl
    pkgs.wget
    pkgs.gnumake
    pkgs.gcc
    pkgs.python3
  ];
}



# Multi-Language PDF Support for Certificates

## Overview
This implementation adds multi-language PDF upload support to the Certificates management system in the admin panel. Administrators can now upload PDF files in different languages (English, Macedonian, German) for each certificate, providing a better user experience for international users.

## Features

### 1. Multi-Language PDF Upload Fields
- **🇺🇸 English PDF**: Upload PDF files specifically for English-speaking users (replaces legacy PDF field)
- **🇲🇰 Macedonian PDF**: Upload PDF files specifically for Macedonian-speaking users  
- **🇩🇪 German PDF**: Upload PDF files specifically for German-speaking users

### 2. Enhanced Form Interface
- Language-specific PDF upload sections with clear visual indicators
- Separate file upload components for each language
- Validation ensuring at least one file (image or PDF) is provided
- Support for both image and PDF files simultaneously

### 3. Improved Table Display
- New "PDF Languages" column showing available PDFs by language
- Visual indicators for each available language
- Clear distinction between legacy and language-specific PDFs
- Color-coded language badges for easy identification

## Database Changes

### New Columns Added
```sql
ALTER TABLE "certificates" ADD COLUMN "pdf_url_en" text;
ALTER TABLE "certificates" ADD COLUMN "pdf_url_mk" text;
ALTER TABLE "certificates" ADD COLUMN "pdf_url_de" text;
```

### Updated Constraints
- Modified the check constraint to ensure at least one file is provided
- Files can be either an image or any combination of language-specific PDFs
- Legacy PDF field is deprecated and replaced by English PDF field

### Indexes
- Added performance indexes for each new PDF URL column
- Optimized queries for language-specific PDF searches

## Implementation Details

### Frontend Components
- **CertificatesManager.tsx**: Main component with multi-language PDF support
- **Form Schema**: Updated to include new PDF fields
- **Table Display**: Enhanced to show PDF availability by language
- **File Upload**: Language-specific upload components

### Backend Changes
- **Database Schema**: Updated certificates table structure
- **API Endpoints**: Existing endpoints automatically support new fields
- **Validation**: Enhanced validation for multi-language PDF requirements

### Migration
- **Migration File 1**: `0004_add_multi_language_pdfs_to_certificates.sql` - Adds new language-specific PDF fields
- **Migration File 2**: `0005_deprecate_legacy_pdf_url.sql` - Updates constraints and deprecates legacy field
- **Applied**: Database schema updated using Drizzle Kit

## Usage

### Adding a New Certificate
1. Navigate to Admin Panel → Certificates
2. Click "Add Certificate"
3. Fill in the title and category information
4. Upload an image (optional)
5. Upload PDFs for each language as needed:
   - 🇺🇸 English PDF (replaces legacy PDF field)
   - 🇲🇰 Macedonian PDF
   - 🇩🇪 German PDF
6. Set sort order and status
7. Save the certificate

### Editing Existing Certificates
1. Click the edit button on any certificate
2. Modify PDF uploads for any language
3. Add or remove language-specific PDFs
4. Update other fields as needed
5. Save changes

### Viewing PDF Availability
- The table now shows a dedicated "PDF Languages" column
- Each available language is displayed with a colored badge
- English PDFs are prominently displayed (replacing legacy PDFs)
- Empty states show when no PDFs are available

## Benefits

1. **Better User Experience**: Users can download certificates in their preferred language
2. **Improved Accessibility**: Language-specific content for international users
3. **Flexible Content Management**: Admins can provide PDFs in any combination of languages
4. **Backward Compatibility**: Existing certificates with legacy PDFs are automatically migrated to English PDF field
5. **Scalable Architecture**: Easy to add more languages in the future

## Future Enhancements

1. **Additional Languages**: Support for more languages (French, Spanish, etc.)
2. **PDF Preview**: In-browser PDF preview functionality
3. **Bulk Upload**: Upload multiple language PDFs simultaneously
4. **Language Detection**: Automatic language detection from PDF content
5. **Translation Management**: Integration with translation services

## Technical Notes

- All new fields are optional to maintain flexibility
- File validation ensures at least one file is provided
- Database indexes optimize performance for language-specific queries
- Form validation prevents submission without required files
- Error handling provides clear feedback for validation failures

## Testing

To test the new functionality:

1. **Database Migration**: Ensure the migration has been applied
2. **Admin Access**: Log in as an admin user
3. **Certificate Creation**: Create a new certificate with multiple language PDFs
4. **Certificate Editing**: Edit existing certificates to add language-specific PDFs
5. **Table Display**: Verify the new PDF Languages column shows correctly
6. **Validation**: Test form validation with various file combinations

## Support

For issues or questions regarding the multi-language PDF functionality:
- Check the browser console for JavaScript errors
- Verify database migration was applied successfully
- Ensure all required dependencies are installed
- Check file upload permissions and storage configuration

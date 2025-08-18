import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { type GalleryItem, type GalleryCategory } from "@shared/schema";
import { Image, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function GalleryPage() {
  const [match, params] = useRoute("/gallery/:category");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Fetch gallery categories to get the category ID
  const { data: categories = [] } = useQuery<GalleryCategory[]>({
    queryKey: ["/api/gallery-categories"],
  });

  // Fetch gallery items
  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery-items"],
  });

  // Find the current category
  const categorySlug = params?.category;
  const currentCategory = categories.find(cat => 
    cat.title.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  // Filter items for current category
  const categoryItems = galleryItems.filter(item => 
    item.categoryId === currentCategory?.id && item.status === 'active'
  ).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Set page title
  useEffect(() => {
    if (currentCategory) {
      document.title = `${currentCategory.title} Gallery - Konti Hidroplast`;
    }
  }, [currentCategory]);

  if (!match) return null;

  const categoryTitle = currentCategory?.title || categorySlug?.replace('-', ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="inline-flex items-center text-[#1c2d56] hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About Us
              </Button>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h1 className="text-4xl font-bold text-gray-900 mx-8">
                {categoryTitle} Gallery
              </h1>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            
            {currentCategory && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our {currentCategory.title.toLowerCase()} facilities and processes
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : categoryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item.imageUrl)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`Gallery item ${item.id}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Image className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Images Found
              </h3>
              <p className="text-gray-500">
                This gallery category doesn't have any images yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default GalleryPage;
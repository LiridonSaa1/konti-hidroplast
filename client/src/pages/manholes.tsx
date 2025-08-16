import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Download, Phone, MapPin } from "lucide-react";

export default function ManholesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1c2d56] to-[#2d4077] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                MANHOLES
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                ENGINEERED FOR EXCELLENCE
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="aspect-video max-w-4xl mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Sorry, your browser doesn't support embedded videos.</p>
              </div>
            </div>
            
            <div className="prose max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern 
                drainage and sewage systems, offering a range of advantages in terms of durability, efficiency, 
                and ease of installation. By structural form, HDPE and PP manholes can be:
              </p>
              <ul className="text-gray-700 mt-6 space-y-2">
                <li>• Injection molded – Konti Rigid manhole</li>
                <li>• Manufactured, combination of injection molding part and corrugate pipe</li>
                <li>• Special manhole – tailor made, special construction of manholes (non standard). These manholes can be manufactured from KONTI KAN SPIRAL PIPE, inlet and outlet from KONTI KAN pipes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* HDPE Manholes Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8">HDPE MANHOLES</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  HDPE manholes exhibit high structural strength and rigidity, capable of handling both 
                  dynamic and static loads, including traffic loads and deep burial. While stiff, HDPE 
                  manholes also have a certain degree of flexibility, allowing them to absorb slight 
                  ground movements without cracking.
                </p>
                
                <p className="text-gray-700 mb-8 leading-relaxed">
                  HDPE is highly resistant to a wide range of chemicals, including acids, bases, and salts, 
                  making it suitable for sewage and industrial waste environments.
                </p>

                <h3 className="text-xl font-semibold text-[#1c2d56] mb-4">Characteristics:</h3>
                <ul className="text-gray-700 space-y-2 mb-8">
                  <li>• High-Density Polyethylene (HDPE)</li>
                  <li>• Excellent chemical and biological resistance</li>
                  <li>• 50+ years service life</li>
                  <li>• -40°C to +60°C (short-term higher resistance)</li>
                  <li>• Smooth inner surface, reduced friction</li>
                  <li>• High stiffness and flexibility for traffic loads</li>
                  <li>• Lightweight, quick installation</li>
                  <li>• Fully recyclable, environmentally friendly</li>
                  <li>• Affordable, low long-term maintenance</li>
                  <li>• More cost-effective than concrete alternatives</li>
                </ul>

                <Button asChild className="bg-[#c41e3a] hover:bg-[#a01729] text-white">
                  <a href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/sahti-en.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </a>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img 
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-8.jpg" 
                  alt="HDPE Manhole 1" 
                  className="w-full rounded-lg shadow-md"
                />
                <img 
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-7.jpg" 
                  alt="HDPE Manhole 2" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PP Manholes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8">PP MANHOLES</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  PP manholes are an excellent choice for modern sewage, stormwater, and drainage systems. 
                  They excel in chemical and biological resistance with a material that offers long-term 
                  durability, cost-effectiveness, and easy installation, making them suitable for a wide 
                  range of applications, including residential, municipal, and industrial infrastructure.
                </p>

                <h3 className="text-xl font-semibold text-[#1c2d56] mb-4">Characteristics:</h3>
                <ul className="text-gray-700 space-y-2 mb-8">
                  <li>• Polypropylene (PP)</li>
                  <li>• Excellent chemical and biological resistance</li>
                  <li>• 50+ years service life</li>
                  <li>• -20°C to +90°C</li>
                  <li>• Smooth inner surface, self-cleaning</li>
                  <li>• Complies with EN 124 for heavy loads</li>
                  <li>• Easy transport, modular design</li>
                  <li>• Fully recyclable, energy-efficient</li>
                  <li>• Cost-effective, low maintenance</li>
                </ul>

                <Button asChild className="bg-[#c41e3a] hover:bg-[#a01729] text-white">
                  <a href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-en.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </a>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img 
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-1.jpg" 
                  alt="PP Manhole 1" 
                  className="w-full rounded-lg shadow-md"
                />
                <img 
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-25-r.jpg" 
                  alt="PP Manhole 2" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8">APPLICATION</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              KONTI PP RIGID MANHOLES are intended for many varied applications and can be used as:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ul className="text-gray-700 space-y-2">
                <li>• Municipal and industrial manholes</li>
                <li>• Sewer and storm water manholes</li>
                <li>• Siphon structure</li>
                <li>• Pump stations</li>
              </ul>
              <ul className="text-gray-700 space-y-2">
                <li>• Bio treatment of sewage</li>
                <li>• Sanitary-Sewer systems</li>
                <li>• Landfills</li>
                <li>• Chemical plants</li>
              </ul>
              <ul className="text-gray-700 space-y-2">
                <li>• Sewage systems</li>
                <li>• Water Meter systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8">ADVANTAGES OF KONTI RIGID PP MANHOLES</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">Chemical Resistance</h3>
                <p className="text-gray-700">In comparison to the concrete manholes</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">Economic</h3>
                <p className="text-gray-700">Reduced material costs due to optimized chamber nominal diameter</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">Durable</h3>
                <p className="text-gray-700">Corrosion-resistant material polypropylene increases durability and protects the environment</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">100% Leak-tight</h3>
                <p className="text-gray-700">Complete sealing ensures no leakage</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">Safe and Inspection-friendly</h3>
                <p className="text-gray-700">Inspection-friendly color orange</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="font-semibold text-[#1c2d56] mb-2">Favorable Installation</h3>
                <p className="text-gray-700">Modular system ensures easy handling on the construction site</p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-[#1c2d56] mb-6">Connection Compatibility</h3>
              <p className="text-gray-700 mb-4">Connection can be made with different kind of pipes:</p>
              <ul className="text-gray-700 space-y-2">
                <li>• Polypropylene smooth pipe</li>
                <li>• PVC pipe</li>
                <li>• Cast Iron</li>
                <li>• GRP pipe</li>
                <li>• Clay pipe</li>
                <li>• Corrugate pipe</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-[#1c2d56] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch: Connect with Us Today!</h2>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-[#1c2d56]">
                <a href="/contact">Contact</a>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 mt-1 text-[#c41e3a]" />
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p>Industriska 5, 1480 Gevgelija,</p>
                  <p>North Macedonia</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 mt-1 text-[#c41e3a]" />
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <div className="space-y-1">
                    <p>+389 34 215 225</p>
                    <p>+389 34 212 064</p>
                    <p>+389 34 212 226</p>
                    <p>+389 34 211 964</p>
                    <p>+389 34 211 757</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
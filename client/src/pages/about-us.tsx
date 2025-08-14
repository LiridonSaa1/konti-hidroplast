import { Navigation } from "@/components/navigation";
import { CertificationsSection } from "@/components/certifications-section";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Factory, Users, Target, Eye, Heart, Calendar, Award, Mail } from "lucide-react";



const timelineData = [
  { year: "1990", title: "Beginnings", description: "Konti Hidroplast has started its manufacturing production in 1990 with one single production line of polyethylene pipes, with a total number of 10 employees." },
  { year: "1994", title: "New products and production lines", description: "By 1994, the production program expanded with an additional 5 production lines. In addition to polyethylene hoses and LDPE pipes, Konti Hidroplast began to expand its production program with new types of products and the development of a wider range of dimensions. With the development of new classes of polyethylene (PE), the use of PE pipes for household installations and pressure systems also expanded. With the use of second-generation polyethylene, such as PE63 and PE80, we started producing pipes for domestic installations with a pressure capacity of up to 16 bars. The range of dimensions increased with pipes up to F110mm." },
  { year: "1996", title: "Third Generation", description: "In 1996 were manufactured the first pipes of a third generation polyethylene material, specifically PE 100. This allowed the pipes to be used in installations with a working pressure of 32 bars. That year, we also began producing gas transportation pipes for use in installations with a working pressure of 10 bars, as well as pipes that can be used in various other industries. We increased the range of dimensions once again, with the largest dimension now being F160mm." },
  { year: "1998", title: "ISO 9001", description: "In 1998 the dimensional range is increased once again. Now, the largest dimension being F250mm. That year, Konti Hidroplast obtained the ISO 9001 certificate for its management quality system." },
  { year: "1999-2000", title: "International Offices", description: "In 1999-2000 Konti Hidroplast began expanding its representations with opening its first offices abroad in Serbia and Bulgaria. But, the expanding did not stop there, today Konti Hidroplast has office representations in all of the Balkan countries. In 2001 Konti Hidroplast achieved the greatest expantion of its production capacities to that date with the acquisition of two complete extrusion lines. The first extrusion line expanded the range of pipes for domestic installations, producing pipes up to F400mm, while the second extrusion line was intended for the production of double-layer polyethylene pipes for sewage with dimensions up to F315mm. That year, in addition to the ISO 9001 certification, we also received the ISO 14001 certification for the environmental management system." },
  { year: "2002", title: "New capacities", description: "In 2002, the company expanded its capacities and product range with an additional production line for household installations, as well as sewage pipes with dimensions up to F630mm." },
  { year: "2003", title: "New International Offices", description: "In 2003 were opened new company representations in Albania, Bosnia & Herzegovina and Croatia." },
  { year: "2004", title: "New Product", description: "In 2004 began the production of a new product, the spiral sewage pipes with a diameter up to F1200mm." },
  { year: "2006", title: "New Production Line", description: "In 2006 was installed a new production line for ribbed double-layer pipes with a diameter of up to F1200mm" },
  { year: "2008", title: "New Capacity Increase", description: "In 2008, we increased the production capacity of ribbed pipes with an additional production line, as well as a line for pressure pipes." },
  { year: "2009", title: "PP HM", description: "In 2009, Konti Hidroplast expanded its production lines and product range with a new product, the PP HM pipes." },
  { year: "2011", title: "New Line and Machines", description: "Two new injection molding machines for the production of sewer fittings and a new production line for spiral pipes in the dimensional range of 1300-2000 mm." },
  { year: "2013", title: "Expansion and Renovation", description: "Expansion of the factory's storage space with new areas. A new production line for pressure pipes up to 110 mm in diameter. Two new machines for perforating pressure pipes. Complete renovation of the area surrounding the factory." },
  { year: "2014", title: "New Production Line", description: "A new production line for pressure pipes up to F 500 mm and reorganization of production capacities and separation of fitting production from extrusion." },
  { year: "2015", title: "OD 1000", description: "Replacement of the OD 1000 line with a new European-made line for pipes up to F 630 mm. Expansion of the ID 1000 production line to include the OD 1000 dimension." },
  { year: "2016-2017", title: "New Acquisitions", description: "Procurement of a 'cross head' extrusion die for the production of PE 100 RC Type 3 with an external protective layer (PE or PP) in dimensions ranging from 75 to 400 mm. Procurement of an injection molding machine with a capacity of up to 20 kg per shot. Acquisition of two new scanners, eccentricity indicators from the beginning of the process." },
  { year: "2018", title: "OD 315", description: "Replacement of the base of the oldest corrugator (OD 315) with a new one." },
  { year: "2019", title: "Two New Halls", description: "Construction of two new halls for storing raw materials." },
  { year: "2020-2021", title: "New Hall with Three Production Lines", description: "Construction of a new hall to expand production capacities. Installation of three new production lines for pressure pipes: 20-63 mm with a capacity of 300 kg/h, 63-250 mm with a capacity of 600 kg/h, 250-630 mm with a capacity of 1000 kg/h." },
  { year: "2022", title: "New Corrugated Pipe Line and New Machines", description: "A new high-productivity, energy-efficient production line for corrugated pipes in the 160-315 mm dimensional range. Improvement of the corrugated pipe production process by enhancing the welding of fittings, including the acquisition of three automatic inline welding machines for fitting attachment to pipes." },
];

const teamData = {
  commerce: [
    { name: "Lazar Vacev", email: "lazev@konti-hidroplast.com.mk" },
    { name: "Angel Stojanov", email: "astojanov@konti-hidroplast.com.mk" },
    { name: "Dijana Chochkova", email: "dijanac@konti-hidroplast.com.mk" },
    { name: "Zafir Brzilov", email: "zbrzilov@konti-hidroplast.com.mk" },
    { name: "Dusko Dojranliev", email: "duled@konti-hidroplast.com.mk" },
    { name: "Vasko Sepetovski", email: "vaskos@konti-hidroplast.com.mk" },
    { name: "David Rizov", email: "rizovd@konti-hidroplast.com.mk" },
    { name: "Dimitar Madzunkov", email: "dimitar.madzunkov@gmail.com" },
  ],
  legal: [
    { name: "Zorica Lozanovska", email: "zorical@konti-hidroplast.com.mk" },
  ],
  technical: [
    { name: "Gordana Manoleva", email: "gordanam@konti-hidroplast.com.mk" },
    { name: "Kostadin Linkov", email: "dinel@konti-hidroplast.com.mk" },
    { name: "Bojan Georgiev", email: "" },
  ],
};

export default function AboutUs() {
  const [activeYear, setActiveYear] = useState("1990");
  const [sliderValue, setSliderValue] = useState([0]);

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const yearIndex = value[0];
    setSliderValue(value);
    setActiveYear(timelineData[yearIndex].year);
  };

  // Handle navigation arrows
  const handlePrevious = () => {
    const currentIndex = sliderValue[0];
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSliderValue([newIndex]);
      setActiveYear(timelineData[newIndex].year);
    }
  };

  const handleNext = () => {
    const currentIndex = sliderValue[0];
    if (currentIndex < timelineData.length - 1) {
      const newIndex = currentIndex + 1;
      setSliderValue([newIndex]);
      setActiveYear(timelineData[newIndex].year);
    }
  };

  useEffect(() => {
    document.title = "About Konti Hidroplast - Leading PE & PP Pipe Manufacturer Since 1975";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Konti Hidroplast is an export-oriented Macedonian company for production of PE and PP pipes since 1975. Pioneer in pipe solutions for urban development with 95% export to international markets.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2">
                Since 1975
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                ABOUT <span className="text-red-500">KONTI</span><br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HIDROPLAST
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Pioneering pipe solutions for urban development. Export-oriented Macedonian leader 
                in PE and PP pipe manufacturing with 95% international market reach.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Factory className="h-5 w-5" />
                  <span className="text-sm font-medium">Manufacturing Excellence</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&loop=1&playlist=R7b9-m_EM2s&mute=1&controls=0"
                  title="Konti Hidroplast - Corporate 2024"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium">Corporate 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold text-gray-700 mx-8">Our Story</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Konti Hidroplast is an export oriented Macedonian company for production of PE (polyethylene) and PP (polypropylene) pipes. 
                Situated in the southern area of North Macedonia, municipality of Gevgelija, Konti Hidroplast was founded in 1975 as a small 
                plant for production of tools and elements of injection molded plastic.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Following the successful start aided by the experience gained by successfully realized projects in the Republic of North Macedonia, 
                today our company is export-oriented, and <strong className="text-[#1c2d56]">95% of its products are exported</strong> in international markets.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Besides the experience, our large range of products and top quality, by all internationally recognized standards, enabled us to get access 
                to international markets. Our current production program covers all fields of application: pipes and hoses for water supply systems, 
                sewage systems, PE and PP manholes, pipes for transporting gas and oil products, pipes and hoses for protection of telecommunication cables, 
                drainage systems and fittings for all dimensions, which also range from a minimum diameter of 12mm up to 2000mm.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Konti Hidroplast became known to the market through quality supply and constant application of flexibility in operation, which is very important in an industry where the complexity of managing all processes is quite high.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                One of the key factors for sustainability despite tough competition is constant reinvestment in innovative technologies and pursuing general technological progress. The combination of all these key factors are contributing for Konti Hidroplast to play an important role in the domestic and foreign markets with the constant presence of all major and minor infrastructure projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Promoting new technologies while adhering to stringent EU standards. With certified quality and competitive pricing, 
                  we embrace regulations and ecological responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A modern factory, a leader in the region for development and production of plastic products for infrastructure buildings, 
                  within the frames of an environmentally safe system with maximum safety for all stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Konti Hidroplast, we're dedicated to leading the industry with top-quality, eco-friendly pipes while prioritizing 
                  environmental protection and employee safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          <div className="space-y-8">
            {/* Timeline Slider */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Timeline</h3>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                  {activeYear}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={sliderValue[0] === 0}
                    className="p-2"
                    data-testid="timeline-prev-button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={timelineData.length - 1}
                      step={1}
                      className="w-full"
                      data-testid="timeline-slider"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={sliderValue[0] === timelineData.length - 1}
                    className="p-2"
                    data-testid="timeline-next-button"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 px-8">
                  <span>1990</span>
                  <span>2022</span>
                </div>
              </div>
            </div>

            {/* Timeline Content */}
            <div>
              {timelineData.map((item) => (
                <div
                  key={item.year}
                  className={`transition-all duration-500 ${
                    activeYear === item.year ? "block" : "hidden"
                  }`}
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                          <Calendar className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">{item.year}</h3>
                          <h4 className="text-xl font-semibold text-blue-600">{item.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the professionals who drive our success and innovation
            </p>
          </div>

          <Tabs defaultValue="commerce" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="commerce" className="text-lg">Commerce</TabsTrigger>
              <TabsTrigger value="legal" className="text-lg">Legal & Technical</TabsTrigger>
              <TabsTrigger value="leadership" className="text-lg">Leadership</TabsTrigger>
            </TabsList>
            
            <TabsContent value="commerce" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamData.commerce.map((member, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">Commerce Department</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="legal" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...teamData.legal, ...teamData.technical].map((member, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {teamData.legal.includes(member) ? 'Legal Department' : 'Technical Department'}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="leadership" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Boris Madjunkov</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-6">General Director</p>
                    <p className="text-gray-600 leading-relaxed">
                      Leading Konti Hidroplast with a vision for innovation, European quality standards, 
                      and sustainable growth in international markets.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Certifications */}
      <CertificationsSection />
      <Footer />
    </div>
  );
}
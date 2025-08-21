import { Navigation } from "@/components/navigation";
import { CertificationsSection } from "@/components/certifications-section";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Team, type Project, type GalleryCategory } from "@shared/schema";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronRight,
  ChevronLeft,
  Factory,
  Users,
  Target,
  Eye,
  Heart,
  Calendar,
  Award,
  Mail,
  Cog,
  MapPin,
  Settings,
  Wrench,
  FileText,
  Image,
} from "lucide-react";

const timelineData = [
  {
    year: "1990",
    title: "Beginnings",
    description:
      "Konti Hidroplast has started its manufacturing production in 1990 with one single production line of polyethylene pipes, with a total number of 10 employees.",
  },
  {
    year: "1994",
    title: "New products and production lines",
    description:
      "By 1994, the production program expanded with an additional 5 production lines. In addition to polyethylene hoses and LDPE pipes, Konti Hidroplast began to expand its production program with new types of products and the development of a wider range of dimensions. With the development of new classes of polyethylene (PE), the use of PE pipes for household installations and pressure systems also expanded. With the use of second-generation polyethylene, such as PE63 and PE80, we started producing pipes for domestic installations with a pressure capacity of up to 16 bars. The range of dimensions increased with pipes up to F110mm.",
  },
  {
    year: "1996",
    title: "Third Generation",
    description:
      "In 1996 were manufactured the first pipes of a third generation polyethylene material, specifically PE 100. This allowed the pipes to be used in installations with a working pressure of 32 bars. That year, we also began producing gas transportation pipes for use in installations with a working pressure of 10 bars, as well as pipes that can be used in various other industries. We increased the range of dimensions once again, with the largest dimension now being F160mm.",
  },
  {
    year: "1998",
    title: "ISO 9001",
    description:
      "In 1998 the dimensional range is increased once again. Now, the largest dimension being F250mm. That year, Konti Hidroplast obtained the ISO 9001 certificate for its management quality system.",
  },
  {
    year: "1999-2000",
    title: "International Offices",
    description:
      "In 1999-2000 Konti Hidroplast began expanding its representations with opening its first offices abroad in Serbia and Bulgaria. But, the expanding did not stop there, today Konti Hidroplast has office representations in all of the Balkan countries. In 2001 Konti Hidroplast achieved the greatest expantion of its production capacities to that date with the acquisition of two complete extrusion lines. The first extrusion line expanded the range of pipes for domestic installations, producing pipes up to F400mm, while the second extrusion line was intended for the production of double-layer polyethylene pipes for sewage with dimensions up to F315mm. That year, in addition to the ISO 9001 certification, we also received the ISO 14001 certification for the environmental management system.",
  },
  {
    year: "2002",
    title: "New capacities",
    description:
      "In 2002, the company expanded its capacities and product range with an additional production line for household installations, as well as sewage pipes with dimensions up to F630mm.",
  },
  {
    year: "2003",
    title: "New International Offices",
    description:
      "In 2003 were opened new company representations in Albania, Bosnia & Herzegovina and Croatia.",
  },
  {
    year: "2004",
    title: "New Product",
    description:
      "In 2004 began the production of a new product, the spiral sewage pipes with a diameter up to F1200mm.",
  },
  {
    year: "2006",
    title: "New Production Line",
    description:
      "In 2006 was installed a new production line for ribbed double-layer pipes with a diameter of up to F1200mm",
  },
  {
    year: "2008",
    title: "New Capacity Increase",
    description:
      "In 2008, we increased the production capacity of ribbed pipes with an additional production line, as well as a line for pressure pipes.",
  },
  {
    year: "2009",
    title: "PP HM",
    description:
      "In 2009, Konti Hidroplast expanded its production lines and product range with a new product, the PP HM pipes.",
  },
  {
    year: "2011",
    title: "New Line and Machines",
    description:
      "Two new injection molding machines for the production of sewer fittings and a new production line for spiral pipes in the dimensional range of 1300-2000 mm.",
  },
  {
    year: "2013",
    title: "Expansion and Renovation",
    description:
      "Expansion of the factory's storage space with new areas. A new production line for pressure pipes up to 110 mm in diameter. Two new machines for perforating pressure pipes. Complete renovation of the area surrounding the factory.",
  },
  {
    year: "2014",
    title: "New Production Line",
    description:
      "A new production line for pressure pipes up to F 500 mm and reorganization of production capacities and separation of fitting production from extrusion.",
  },
  {
    year: "2015",
    title: "OD 1000",
    description:
      "Replacement of the OD 1000 line with a new European-made line for pipes up to F 630 mm. Expansion of the ID 1000 production line to include the OD 1000 dimension.",
  },
  {
    year: "2016-2017",
    title: "New Acquisitions",
    description:
      'Procurement of a "cross head" extrusion die for the production of PE 100 RC Type 3 with an external protective layer (PE or PP) in dimensions ranging from 75 to 400 mm. Procurement of an injection molding machine with a capacity of up to 20 kg per shot. Acquisition of two new scanners, eccentricity indicators from the beginning of the process.',
  },
  {
    year: "2018",
    title: "OD 315",
    description:
      "Replacement of the base of the oldest corrugator (OD 315) with a new one.",
  },
  {
    year: "2019",
    title: "Two New Halls",
    description: "Construction of two new halls for storing raw materials.",
  },
  {
    year: "2020-2021",
    title: "New Hall with Three Production Lines",
    description:
      "Construction of a new hall to expand production capacities. Installation of three new production lines for pressure pipes: 20-63 mm with a capacity of 300 kg/h, 63-250 mm with a capacity of 600 kg/h, 250-630 mm with a capacity of 1000 kg/h.",
  },
  {
    year: "2022",
    title: "New Corrugated Pipe Line and New Machines",
    description:
      "A new high-productivity, energy-efficient production line for corrugated pipes in the 160-315 mm dimensional range. Improvement of the corrugated pipe production process by enhancing the welding of fittings, including the acquisition of three automatic inline welding machines for fitting attachment to pipes.",
  },
];

// Fetch team members from database
function useTeamData() {
  const { data: teams = [], isLoading } = useQuery<Team[]>({
    queryKey: ["/api/admin/teams"],
  });

  // Group team members by position
  const groupedByPosition = teams
    .filter((team) => team.active) // Only show active team members
    .reduce(
      (acc, member) => {
        const position = member.position;
        if (!acc[position]) {
          acc[position] = [];
        }
        acc[position].push(member);
        return acc;
      },
      {} as Record<string, Team[]>,
    );

  // Create categories from unique positions
  const teamCategories = Object.keys(groupedByPosition).map(
    (position, index) => ({
      id: position.toLowerCase().replace(/\s+/g, "-"),
      title: position,
      data: position,
    }),
  );

  return {
    teamCategories,
    teamData: groupedByPosition,
    isLoading,
  };
}

export default function AboutUs() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeYear, setActiveYear] = useState("1990");
  const [sliderValue, setSliderValue] = useState([0]);
  const [activeTeamTabIndex, setActiveTeamTabIndex] = useState(0);

  // Use the dynamic team data hook
  const { teamCategories, teamData, isLoading: isTeamLoading } = useTeamData();

  // Fetch projects
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
  });

  // Fetch gallery categories (public endpoint)
  const { data: galleryCategories = [], isLoading: isGalleryLoading } = useQuery<GalleryCategory[]>({
    queryKey: ["/api/gallery-categories"],
  });

  // Fetch leadership data
  const { data: leadershipData } = useQuery({
    queryKey: ["/api/admin/company-info", "leadership_message"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "/api/admin/company-info/leadership_message",
        );
        if (!response.ok) throw new Error("Not found");
        return await response.json();
      } catch (error) {
        // Return default data if not found
        return {
          value: JSON.stringify({
            title: "Building the Future of Infrastructure",
            description1:
              "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
            description2:
              "Together, we build not just for today, but for a future our next generations will be proud of.",
            leaderName: "Boris Madjunkov",
            leaderPosition: "General Director",
            leaderImage:
              "/attached_assets/Boris-Madjunkov-General-Manager-600x600_1755184653598.jpg",
          }),
        };
      }
    },
  });

  const nextTeamTab = () => {
    setActiveTeamTabIndex((prev) =>
      prev === teamCategories.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTeamTab = () => {
    setActiveTeamTabIndex((prev) =>
      prev === 0 ? teamCategories.length - 1 : prev - 1,
    );
  };

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
    document.title =
      "About Konti Hidroplast - Leading PE & PP Pipe Manufacturer Since 1975";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Konti Hidroplast is an export-oriented Macedonian company for production of PE and PP pipes since 1975. Pioneer in pipe solutions for urban development with 95% export to international markets.",
      );
    }
  }, []);

  // Parse leadership content
  const leadershipContent = leadershipData
    ? JSON.parse(leadershipData.value)
    : {};

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
                {t('aboutUs.title').toUpperCase()} <span className="text-red-500">KONTI</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HIDROPLAST
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('aboutUs.heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Factory className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {t('aboutUs.manufacturingExcellence')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('aboutUs.isoCertified')}</span>
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
                <span className="text-sm font-medium">{t('aboutUs.corporate2024')}</span>
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
              <h2 className="text-4xl font-bold text-gray-700 mx-8">
                {t('aboutUs.heroTitle')}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t('about.text1')}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t('aboutUs.companyStoryText1')}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t('aboutUs.companyStoryText2')}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t('aboutUs.companyStoryText3')}
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                {t('aboutUs.companyStoryText4')}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('aboutUs.missionTitle')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('aboutUs.missionText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('aboutUs.visionTitle')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('aboutUs.visionText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('aboutUs.valuesTitle')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('aboutUs.valuesText')}
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
                <div className="text-white px-4 py-2 rounded-full font-semibold bg-[#1c2d56]">
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
                        <div className="w-20 h-20 bg-[#1c2d56] rounded-full flex items-center justify-center shadow-lg">
                          <Calendar className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {item.year}
                          </h3>
                          <h4 className="text-xl font-semibold text-[#1c2d56]">
                            {item.title}
                          </h4>
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
      {/* Leadership Message Section */}
      <section className="py-20 bg-gradient-to-r from-[#1c2d56] via-[#2a3f6b] to-[#1c2d56] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/3 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Main photo container */}
                <div className="w-80 h-80 bg-white rounded-2xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        leadershipContent.leaderImage ||
                        "/attached_assets/Boris-Madjunkov-General-Manager-600x600_1755184653598.jpg"
                      }
                      alt={`${leadershipContent.leaderName || "Boris Madjunkov"} - ${leadershipContent.leaderPosition || "General Director"}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium text-white/90">
                    Leadership Message
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {leadershipContent.title ||
                    "Building the Future of Infrastructure"}
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-white/90">
                <p>
                  {leadershipContent.description1 ||
                    "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow."}
                </p>

                <p>
                  {leadershipContent.description2 ||
                    "Together, we build not just for today, but for a future our next generations will be proud of."}
                </p>
              </div>

              <div className="pt-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    {leadershipContent.leaderName || "Boris Madjunkov"}
                  </h3>
                  <p className="text-blue-200 font-semibold text-lg">
                    {leadershipContent.leaderPosition || "General Director"}
                  </p>
                </div>

                {/* Signature line */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-0.5 bg-blue-200"></div>
                    <span className="text-sm text-white/70 font-medium tracking-wider">
                      KONTI HIDROPLAST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold text-gray-900 mx-8">
                Our Team
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Team Tab Slider - matching certificates page design */}
          {teamCategories.length > 0 && (
            <div className="flex items-center justify-center mb-12">
              <button
                onClick={prevTeamTab}
                className="p-2 rounded-full bg-[#1c2d56] text-white hover:bg-blue-900 transition-colors mr-4"
                data-testid="team-tab-prev"
                disabled={teamCategories.length <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
                <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                  {teamCategories[activeTeamTabIndex]?.title || "Loading..."}
                </h3>
                <div className="flex justify-center space-x-1 mt-3">
                  {teamCategories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTeamTabIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTeamTabIndex
                          ? "bg-[#1c2d56]"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      data-testid={`team-tab-dot-${index}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextTeamTab}
                className="p-2 rounded-full bg-[#1c2d56] text-white hover:bg-blue-900 transition-colors ml-4"
                data-testid="team-tab-next"
                disabled={teamCategories.length <= 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Team Content - showing active team category */}
          {isTeamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamCategories.length > 0 &&
            teamData[teamCategories[activeTeamTabIndex]?.data] ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamData[teamCategories[activeTeamTabIndex].data].map(
                (member, index) => (
                  <Card
                    key={member.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100 border">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="144" height="144" xmlns="http://www.w3.org/2000/svg">
                                <rect width="144" height="144" fill="#f3f4f6"/>
                                <text x="72" y="72" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="16">No Photo</text>
                              </svg>
                            `)}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Users className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {member.name}
                      </h3>
                      {member.email && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() =>
                            window.open(`mailto:${member.email}`, "_blank")
                          }
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Us
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Team Members Yet
              </h3>
              <p className="text-gray-500">
                Team members will appear here once they are added to the
                database.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Certifications */}
      <CertificationsSection />
      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold text-gray-900 mx-8">
                Projects
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Dynamic Projects Grid */}
          {isProjectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-xl">
                  <div className="relative h-80 overflow-hidden bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6 bg-white">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects
                .filter(project => project.status === 'active')
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((project) => (
                <Card key={project.id} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-80 overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2 text-[15px]">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {project.pdfUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-[#1c2d56] text-[#1c2d56] hover:bg-[#1c2d56] hover:text-white"
                        onClick={() => project.pdfUrl && window.open(project.pdfUrl, '_blank')}
                      >
                        Download PDF
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Projects Available
              </h3>
              <p className="text-gray-500">
                Projects will appear here once they are added to the database.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Products Section */}
      <section className="py-20 relative overflow-hidden bg-[#1c2d56] text-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                Products
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Products Grid - Vertical Card Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Product 1 - Water Supply Systems */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/Water-supply-min-1_1755115058874.jpg"
                  alt="Water Supply Systems"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    WATER SUPPLY SYSTEMS
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/water-supply-systems">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 - Sewerage Systems */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg"
                  alt="Sewerage Systems"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    SEWERAGE SYSTEMS
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/konti-kan-pipes-and-fittings">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 - Gas Pipeline System */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg"
                  alt="Gas Pipeline System"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    GAS PIPELINE SYSTEM
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/gas-pipeline-systems">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 4 - Cable Protection */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg"
                  alt="Cable Protection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    CABLE PROTECTION
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/cable-protection">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold text-gray-900 mx-8">Gallery</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Dynamic Gallery Grid */}
          {isGalleryLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : galleryCategories.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {galleryCategories
                .filter(category => category.status === 'active')
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((category) => (
                <div key={category.id} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  {/* Gallery Image - Top */}
                  <div className="h-64 relative overflow-hidden">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <Image className="h-16 w-16 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
                  </div>

                  {/* Gallery Content - Bottom */}
                  <div className="p-8 relative">
                    {/* Decorative accent */}
                    <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                        {category.title}
                      </h3>

                      {/* View Gallery Button */}
                      <a
                        href={`/gallery/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]"
                      >
                        <span>View Gallery</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Image className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Gallery Categories
              </h3>
              <p className="text-gray-500">
                Gallery categories will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Get in Touch: Connect with Us Today!
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Need more information about our cable protection solutions?
              Contact our team of experts.
            </p>
            <Button
              onClick={() => {
                // Store scroll target in sessionStorage
                sessionStorage.setItem('scrollToContact', 'true');
                // Navigate to home page
                setLocation('/');
              }}
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold"
              data-testid="contact-button"
            >
              {t('navigation.contact')}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

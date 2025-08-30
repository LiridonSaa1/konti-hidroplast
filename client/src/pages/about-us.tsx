import { Navigation } from "@/components/navigation";
import { CertificationsSection } from "@/components/certifications-section";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Team, type Project, type GalleryCategory, type Position } from "@shared/schema";
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
  Globe,
  Phone,
  ArrowLeft,
  Play,
} from "lucide-react";
import { useCompanyInfo } from "@/hooks/use-company-info";

const timelineData = [
  {
    year: "1990",
    title: "Beginnings",
    description:
      "Konti Hidroplast has started its manufacturing production in 1990 with one single production line of polyethylene pipes, with a total number of 10 employees.",
    translations: {
      mk: {
        title: "Почетоци",
        description: "Конти Хидропласт ја започна својата производствена дејност во 1990 година со една единствена производна линија на полиетиленски цевки, со вкупно 10 вработени."
      },
      de: {
        title: "Anfänge",
        description: "Konti Hidroplast begann seine Fertigungsproduktion im Jahr 1990 mit einer einzigen Produktionslinie für Polyethylenrohre mit insgesamt 10 Mitarbeitern."
      }
    }
  },
  {
    year: "1994",
    title: "New products and production lines",
    description:
      "By 1994, the production program expanded with an additional 5 production lines. In addition to polyethylene hoses and LDPE pipes, Konti Hidroplast began to expand its production program with new types of products and the development of a wider range of dimensions. With the development of new classes of polyethylene (PE), the use of PE pipes for household installations and pressure systems also expanded. With the use of second-generation polyethylene, such as PE63 and PE80, we started producing pipes for domestic installations with a pressure capacity of up to 16 bars. The range of dimensions increased with pipes up to F110mm.",
    translations: {
      mk: {
        title: "Нови производи и производни линии",
        description: "До 1994 година, производната програма се прошири со дополнителни 5 производни линии. Покрај полиетиленски цреви и LDPE цевки, Конти Хидропласт почна да ја проширува својата производна програма со нови типови производи и развој на поширок спектар на димензии. Со развојот на нови класи на полиетилен (PE), употребата на PE цевки за домашни инсталации и притисни системи исто така се прошири. Со употребата на полиетилен од второ поколение, како што се PE63 и PE80, почнавме да произведуваме цевки за домашни инсталации со капацитет на притисок до 16 бари. Опсегот на димензии се зголеми со цевки до F110mm."
      },
      de: {
        title: "Neue Produkte und Produktionslinien",
        description: "Bis 1994 expandierte das Produktionsprogramm um 5 zusätzliche Produktionslinien. Neben Polyethylenschläuchen und LDPE-Rohren begann Konti Hidroplast, sein Produktionsprogramm mit neuen Produkttypen und der Entwicklung eines breiteren Dimensionsbereichs zu erweitern. Mit der Entwicklung neuer Polyethylenklassen (PE) erweiterte sich auch die Verwendung von PE-Rohren für Haushaltsinstallationen und Druckanlagen. Mit der Verwendung von Polyethylen der zweiten Generation, wie PE63 und PE80, begannen wir mit der Produktion von Rohren für Haushaltsinstallationen mit einem Druckvermögen von bis zu 16 bar. Der Dimensionsbereich vergrößerte sich mit Rohren bis zu F110mm."
      }
    }
  },
  {
    year: "1996",
    title: "Third Generation",
    description:
      "In 1996 were manufactured the first pipes of a third generation polyethylene material, specifically PE 100. This allowed the pipes to be used in installations with a working pressure of 32 bars. That year, we also began producing gas transportation pipes for use in installations with a working pressure of 10 bars, as well as pipes that can be used in various other industries. We increased the range of dimensions once again, with the largest dimension now being F160mm.",
    translations: {
      mk: {
        title: "Трето поколение",
        description: "Во 1996 година се произведоа првите цевки од материјал на трето поколение полиетилен, конкретно PE 100. Ова овозможи цевките да се користат во инсталации со работен притисок од 32 бари. Таа година, исто така почнавме да произведуваме цевки за транспорт на гас за употреба во инсталации со работен притисок од 10 бари, како и цевки кои можат да се користат во различни други индустрии. Повторно го зголемивме опсегот на димензии, со најголемата димензија сега да биде F160mm."
      },
      de: {
        title: "Dritte Generation",
        description: "1996 wurden die ersten Rohre aus einem Polyethylenmaterial der dritten Generation hergestellt, speziell PE 100. Dies ermöglichte es, die Rohre in Anlagen mit einem Arbeitsdruck von 32 bar zu verwenden. In diesem Jahr begannen wir auch mit der Produktion von Gastransportrohren für den Einsatz in Anlagen mit einem Arbeitsdruck von 10 bar sowie Rohren, die in verschiedenen anderen Industrien verwendet werden können. Wir vergrößerten den Dimensionsbereich erneut, wobei die größte Dimension jetzt F160mm beträgt."
      }
    }
  },
  {
    year: "1998",
    title: "ISO 9001",
    description:
      "In 1998 the dimensional range is increased once again. Now, the largest dimension being F250mm. That year, Konti Hidroplast obtained the ISO 9001 certificate for its management quality system.",
    translations: {
      mk: {
        title: "ISO 9001",
        description: "Во 1998 година опсегот на димензии повторно се зголеми. Сега, најголемата димензија е F250mm. Таа година, Конти Хидропласт го доби сертификатот ISO 9001 за својот систем за управување со квалитет."
      },
      de: {
        title: "ISO 9001",
        description: "1998 wurde der Dimensionsbereich erneut vergrößert. Jetzt beträgt die größte Dimension F250mm. In diesem Jahr erhielt Konti Hidroplast das ISO 9001-Zertifikat für sein Qualitätsmanagementsystem."
      }
    }
  },
  {
    year: "1999-2000",
    title: "International Offices",
    description:
      "In 1999-2000 Konti Hidroplast began expanding its representations with opening its first offices abroad in Serbia and Bulgaria. But, the expanding did not stop there, today Konti Hidroplast has office representations in all of the Balkan countries. In 2001 Konti Hidroplast achieved the greatest expantion of its production capacities to that date with the acquisition of two complete extrusion lines. The first extrusion line expanded the range of pipes for domestic installations, producing pipes up to F400mm, while the second extrusion line was intended for the production of double-layer polyethylene pipes for sewage with dimensions up to F315mm. That year, in addition to the ISO 9001 certification, we also received the ISO 14001 certification for the environmental management system.",
    translations: {
      mk: {
        title: "Меѓународни канцеларии",
        description: "Во 1999-2000 година Конти Хидропласт почна да ги проширува своите претставништва со отворање на првите канцеларии во странство во Србија и Бугарија. Но, проширувањето не застана таму, денес Конти Хидропласт има канцелариски претставништва во сите балкански земји. Во 2001 година Конти Хидропласт постигна најголемо проширување на своите производни капацитети до тој датум со стекнувањето на две комплетни екструзиони линии. Првата екструзиона линија го прошири опсегот на цевки за домашни инсталации, произведувајќи цевки до F400mm, додека втората екструзиона линија беше наменета за производство на двојни полиетиленски цевки за канализација со димензии до F315mm. Таа година, покрај ISO 9001 сертификацијата, исто така добивме и ISO 14001 сертификација за системот за управување со животната средина."
      },
      de: {
        title: "Internationale Büros",
        description: "1999-2000 begann Konti Hidroplast mit der Erweiterung seiner Vertretungen durch die Eröffnung seiner ersten Büros im Ausland in Serbien und Bulgarien. Aber die Expansion hörte dort nicht auf, heute hat Konti Hidroplast Bürovertretungen in allen Balkanländern. 2001 erreichte Konti Hidroplast die größte Expansion seiner Produktionskapazitäten bis zu diesem Zeitpunkt durch den Erwerb von zwei kompletten Extrusionslinien. Die erste Extrusionslinie erweiterte den Bereich der Rohre für Haushaltsinstallationen und produzierte Rohre bis zu F400mm, während die zweite Extrusionslinie für die Produktion von zweischichtigen Polyethylenrohren für Abwasser mit Abmessungen bis zu F315mm bestimmt war. In diesem Jahr erhielten wir zusätzlich zur ISO 9001-Zertifizierung auch die ISO 14001-Zertifizierung für das Umweltmanagementsystem."
      }
    }
  },
  {
    year: "2002",
    title: "New capacities",
    description:
      "In 2002, the company expanded its capacities and product range with an additional production line for household installations, as well as sewage pipes with dimensions up to F630mm.",
    translations: {
      mk: {
        title: "Нови капацитети",
        description: "Во 2002 година, компанијата ги прошири своите капацитети и опсег на производи со дополнителна производна линија за домашни инсталации, како и канализациски цевки со димензии до F630mm."
      },
      de: {
        title: "Neue Kapazitäten",
        description: "2002 erweiterte das Unternehmen seine Kapazitäten und Produktpalette um eine zusätzliche Produktionslinie für Haushaltsinstallationen sowie Abwasserrohre mit Abmessungen bis zu F630mm."
      }
    }
  },
  {
    year: "2003",
    title: "New International Offices",
    description:
      "In 2003 were opened new company representations in Albania, Bosnia & Herzegovina and Croatia.",
    translations: {
      mk: {
        title: "Нови меѓународни канцеларии",
        description: "Во 2003 година се отворија нови претставништва на компанијата во Албанија, Босна и Херцеговина и Хрватска."
      },
      de: {
        title: "Neue internationale Büros",
        description: "2003 wurden neue Firmenvertretungen in Albanien, Bosnien & Herzegowina und Kroatien eröffnet."
      }
    }
  },
  {
    year: "2004",
    title: "New Product",
    description:
      "In 2004 began the production of a new product, the spiral sewage pipes with a diameter up to F1200mm.",
    translations: {
      mk: {
        title: "Нов производ",
        description: "Во 2004 година почна производството на нов производ, спиралните канализациски цевки со дијаметар до F1200mm."
      },
      de: {
        title: "Neues Produkt",
        description: "2004 begann die Produktion eines neuen Produkts, der Spiralabwasserrohre mit einem Durchmesser von bis zu F1200mm."
      }
    }
  },
  {
    year: "2006",
    title: "New Production Line",
    description:
      "In 2006 was installed a new production line for ribbed double-layer pipes with a diameter of up to F1200mm",
    translations: {
      mk: {
        title: "Нова производна линија",
        description: "Во 2006 година беше инсталирана нова производна линија за ребрести двојни цевки со дијаметар до F1200mm"
      },
      de: {
        title: "Neue Produktionslinie",
        description: "2006 wurde eine neue Produktionslinie für gerippte zweischichtige Rohre mit einem Durchmesser von bis zu F1200mm installiert"
      }
    }
  },
  {
    year: "2008",
    title: "New Capacity Increase",
    description:
      "In 2008, we increased the production capacity of ribbed pipes with an additional production line, as well as a line for pressure pipes.",
    translations: {
      mk: {
        title: "Ново зголемување на капацитетите",
        description: "Во 2008 година, го зголемивме производниот капацитет на ребрестите цевки со дополнителна производна линија, како и линија за притисни цевки."
      },
      de: {
        title: "Neue Kapazitätserhöhung",
        description: "2008 erhöhten wir die Produktionskapazität für gerippte Rohre mit einer zusätzlichen Produktionslinie sowie einer Linie für Druckrohre."
      }
    }
  },
  {
    year: "2009",
    title: "PP HM",
    description:
      "In 2009, Konti Hidroplast expanded its production lines and product range with a new product, the PP HM pipes.",
    translations: {
      mk: {
        title: "PP HM",
        description: "Во 2009 година, Конти Хидропласт ги прошири своите производни линии и опсег на производи со нов производ, PP HM цевките."
      },
      de: {
        title: "PP HM",
        description: "2009 erweiterte Konti Hidroplast seine Produktionslinien und Produktpalette um ein neues Produkt, die PP HM-Rohre."
      }
    }
  },
  {
    year: "2011",
    title: "New Line and Machines",
    description:
      "Two new injection molding machines for the production of sewer fittings and a new production line for spiral pipes in the dimensional range of 1300-2000 mm.",
    translations: {
      mk: {
        title: "Нова линија и машини",
        description: "Две нови машини за инјекциско леење за производство на канализациски фитинзи и нова производна линија за спирални цевки во димензионалниот опсег од 1300-2000 mm."
      },
      de: {
        title: "Neue Linie und Maschinen",
        description: "Zwei neue Spritzgießmaschinen für die Produktion von Abwasserfittings und eine neue Produktionslinie für Spiralrohre im Dimensionsbereich von 1300-2000 mm."
      }
    }
  },
  {
    year: "2013",
    title: "Expansion and Renovation",
    description:
      "Expansion of the factory's storage space with new areas. A new production line for pressure pipes up to 110 mm in diameter. Two new machines for perforating pressure pipes. Complete renovation of the area surrounding the factory.",
    translations: {
      mk: {
        title: "Проширување и реновирање",
        description: "Проширување на складишниот простор на фабриката со нови области. Нова производна линија за притисни цевки до 110 mm во дијаметар. Две нови машини за перфорирање на притисни цевки. Комплетно реновирање на областа околу фабриката."
      },
      de: {
        title: "Erweiterung und Renovierung",
        description: "Erweiterung des Lagerraums der Fabrik mit neuen Bereichen. Eine neue Produktionslinie für Druckrohre mit einem Durchmesser von bis zu 110 mm. Zwei neue Maschinen zum Perforieren von Druckrohren. Vollständige Renovierung des Bereichs um die Fabrik."
      }
    }
  },
  {
    year: "2014",
    title: "New Production Line",
    description:
      "A new production line for pressure pipes up to F 500 mm and reorganization of production capacities and separation of fitting production from extrusion.",
    translations: {
      mk: {
        title: "Нова производна линија",
        description: "Нова производна линија за притисни цевки до F 500 mm и реорганизација на производните капацитети и одвојување на производството на фитинзи од екструзија."
      },
      de: {
        title: "Neue Produktionslinie",
        description: "Eine neue Produktionslinie für Druckrohre bis zu F 500 mm und Neuorganisation der Produktionskapazitäten sowie Trennung der Fittingproduktion von der Extrusion."
      }
    }
  },
  {
    year: "2015",
    title: "OD 1000",
    description:
      "Replacement of the OD 1000 line with a new European-made line for pipes up to F 630 mm. Expansion of the ID 1000 production line to include the OD 1000 dimension.",
    translations: {
      mk: {
        title: "OD 1000",
        description: "Замена на OD 1000 линијата со нова европска линија за цевки до F 630 mm. Проширување на ID 1000 производната линија за да ја вклучи OD 1000 димензијата."
      },
      de: {
        title: "OD 1000",
        description: "Ersetzung der OD 1000-Linie durch eine neue europäische Linie für Rohre bis zu F 630 mm. Erweiterung der ID 1000-Produktionslinie um die OD 1000-Dimension."
      }
    }
  },
  {
    year: "2016-2017",
    title: "New Acquisitions",
    description:
      'Procurement of a "cross head" extrusion die for the production of PE 100 RC Type 3 with an external protective layer (PE or PP) in dimensions ranging from 75 to 400 mm. Procurement of an injection molding machine with a capacity of up to 20 kg per shot. Acquisition of two new scanners, eccentricity indicators from the beginning of the process.',
    translations: {
      mk: {
        title: "Нови набавки",
        description: 'Набавка на "крстоглава" екструзиона матрица за производство на PE 100 RC Тип 3 со надворешен заштитен слој (PE или PP) во димензии од 75 до 400 mm. Набавка на машина за инјекциско леење со капацитет до 20 kg по инјекција. Набавка на два нови скенери, индикатори за ексцентричност од почетокот на процесот.'
      },
      de: {
        title: "Neue Anschaffungen",
        description: 'Beschaffung einer "Kreuzkopf"-Extrusionsdüse für die Produktion von PE 100 RC Typ 3 mit einer äußeren Schutzschicht (PE oder PP) in Abmessungen von 75 bis 400 mm. Beschaffung einer Spritzgießmaschine mit einer Kapazität von bis zu 20 kg pro Schuss. Anschaffung von zwei neuen Scannern, Exzentrizitätsindikatoren vom Beginn des Prozesses.'
      }
    }
  },
  {
    year: "2018",
    title: "OD 315",
    description:
      "Replacement of the base of the oldest corrugator (OD 315) with a new one.",
    translations: {
      mk: {
        title: "OD 315",
        description: "Замена на основата на најстариот коругатор (OD 315) со нова."
      },
      de: {
        title: "OD 315",
        description: "Ersetzung der Basis des ältesten Wellrohrherstellers (OD 315) durch eine neue."
      }
    }
  },
  {
    year: "2019",
    title: "Two New Halls",
    description: "Construction of two new halls for storing raw materials.",
    translations: {
      mk: {
        title: "Две нови хали",
        description: "Изградба на две нови хали за складирање на суровини."
      },
      de: {
        title: "Zwei neue Hallen",
        description: "Bau von zwei neuen Hallen zur Lagerung von Rohstoffen."
      }
    }
  },
  {
    year: "2020-2021",
    title: "New Hall with Three Production Lines",
    description:
      "Construction of a new hall to expand production capacities. Installation of three new production lines for pressure pipes: 20-63 mm with a capacity of 300 kg/h, 63-250 mm with a capacity of 600 kg/h, 250-630 mm with a capacity of 1000 kg/h.",
    translations: {
      mk: {
        title: "Нова хала со три производни линии",
        description: "Изградба на нова хала за проширување на производните капацитети. Инсталација на три нови производни линии за притисни цевки: 20-63 mm со капацитет од 300 kg/h, 63-250 mm со капацитет од 600 kg/h, 250-630 mm со капацитет од 1000 kg/h."
      },
      de: {
        title: "Neue Halle mit drei Produktionslinien",
        description: "Bau einer neuen Halle zur Erweiterung der Produktionskapazitäten. Installation von drei neuen Produktionslinien für Druckrohre: 20-63 mm mit einer Kapazität von 300 kg/h, 63-250 mm mit einer Kapazität von 600 kg/h, 250-630 mm mit einer Kapazität von 1000 kg/h."
      }
    }
  },
  {
    year: "2022",
    title: "New Corrugated Pipe Line and New Machines",
    description:
      "A new high-productivity, energy-efficient production line for corrugated pipes in the 160-315 mm dimensional range. Improvement of the corrugated pipe production process by enhancing the welding of fittings, including the acquisition of three automatic inline welding machines for fitting attachment to pipes.",
    translations: {
      mk: {
        title: "Нова линија за коругирани цевки и нови машини",
        description: "Нова високопроизводителна, енергетски ефикасна производна линија за коругирани цевки во димензионалниот опсег од 160-315 mm. Подобрување на процесот на производство на коругирани цевки со подобрување на заварувањето на фитинзите, вклучувајќи набавка на три автоматизирани инлајн заварни машини за прикачување на фитинзи на цевки."
      },
      de: {
        title: "Neue Wellrohrlinie und neue Maschinen",
        description: "Eine neue hochproduktive, energieeffiziente Produktionslinie für Wellrohre im Dimensionsbereich von 160-315 mm. Verbesserung des Wellrohrproduktionsprozesses durch Verbesserung des Schweißens von Fittings, einschließlich der Anschaffung von drei automatischen Inline-Schweißmaschinen für die Fittingbefestigung an Rohren."
      }
    }
  }
];

// Fetch team members from database
function useTeamData() {
  const { data: teams = [], isLoading: isTeamsLoading } = useQuery<Team[]>({
    queryKey: ["/api/admin/teams"],
  });

  // Fetch positions with translations
  const { data: positions = [], isLoading: isPositionsLoading } = useQuery<Position[]>({
    queryKey: ["/api/positions"], // Back to public endpoint
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

  console.log('Grouped by position:', groupedByPosition);

  // Sort positions by sortOrder and create categories from unique positions with translations
  const sortedPositions = [...positions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  
  const teamCategories = Object.keys(groupedByPosition).map(
    (position, index) => {
      // Find the position object to get translations
      const positionObj = sortedPositions.find(p => p.title === position);
      console.log(`Position "${position}" found:`, positionObj);
      
      return {
        id: position.toLowerCase().replace(/\s+/g, "-"),
        title: position,
        data: position,
        translations: positionObj?.translations || {},
        defaultLanguage: positionObj?.defaultLanguage || 'en',
        sortOrder: positionObj?.sortOrder || 0
      };
    },
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  console.log('Team categories:', teamCategories);

  return {
    teamCategories,
    teamData: groupedByPosition,
    positions,
    isLoading: isTeamsLoading || isPositionsLoading,
  };
}

export default function AboutUs() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeYear, setActiveYear] = useState("1990");
  const [sliderValue, setSliderValue] = useState([0]);
  const [activeTeamTabIndex, setActiveTeamTabIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true); // Changed to true for immediate autoplay

  // Auto-show video after a short delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  // Use the dynamic team data hook
  const { teamCategories, teamData, positions, isLoading: isTeamLoading } = useTeamData();

  // Helper function to get translated position title
  const getTranslatedPositionTitle = (positionTitle: string) => {
    console.log('=== getTranslatedPositionTitle ===');
    console.log('Position title:', positionTitle);
    console.log('Current language:', language);
    console.log('All positions:', positions);
    
    const positionObj = positions.find(p => p.title === positionTitle);
    console.log('Found position object:', positionObj);
    
    if (positionObj?.translations && typeof positionObj.translations === 'object') {
      const translations = positionObj.translations as any;
      console.log('Position translations:', translations);
      
      if (translations[language]?.title) {
        console.log(`Found ${language} translation:`, translations[language].title);
        return translations[language].title;
      } else {
        console.log(`No ${language} translation found`);
      }
    } else {
      console.log('No translations object found for position');
    }
    
    // Fallback to original title
    console.log('Using fallback title:', positionTitle);
    return positionTitle;
  };

  // Fetch projects
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery<
    Project[]
  >({
    queryKey: ["/api/projects"],
  });

  // Debug: Log projects data to see what we're getting
  useEffect(() => {
    if (projects.length > 0) {
      console.log('=== PROJECTS DEBUG ===');
      console.log('Total projects fetched:', projects.length);
      console.log('Current language:', language);
      console.log('All projects data:', projects);
      
      projects.forEach((project, index) => {
        console.log(`\n--- Project ${index + 1} ---`);
        console.log('ID:', project.id);
        console.log('Title (original):', project.title);
        console.log('Description (original):', project.description);
        console.log('Translations object:', project.translations);
        console.log('Default language:', project.defaultLanguage);
        
        // Check each language
        ['en', 'mk', 'de'].forEach(lang => {
          const translations = project.translations as any;
          if (translations && translations[lang]) {
            console.log(`${lang.toUpperCase()} - Title:`, translations[lang].title);
            console.log(`${lang.toUpperCase()} - Description:`, translations[lang].description);
          } else {
            console.log(`${lang.toUpperCase()} - No translations available`);
          }
        });
        
        // Show what getLocalizedText returns
        console.log('getLocalizedText(title):', getLocalizedText(project, 'title'));
        console.log('getLocalizedText(description):', getLocalizedText(project, 'description'));
      });
      console.log('=== END DEBUG ===');
    }
  }, [projects, language]);

  // Helper function to get localized text for projects
  const getLocalizedText = (project: Project, field: 'title' | 'description') => {
    console.log(`getLocalizedText called for project ${project.id}, field: ${field}, language: ${language}`);
    
    if (project.translations && typeof project.translations === 'object') {
      const translations = project.translations as any;
      console.log('Translations available:', translations);
      
      if (translations[language] && translations[language][field]) {
        console.log(`Found ${language} translation for ${field}:`, translations[language][field]);
        return translations[language][field];
      } else {
        console.log(`No ${language} translation for ${field}, checking fallback`);
      }
    } else {
      console.log('No translations object found');
    }
    
    // Fallback to original field
    console.log(`Using fallback for ${field}:`, project[field]);
    return project[field] || '';
  };

  // Helper function to get localized timeline text
  const getTimelineText = (item: any, field: 'title' | 'description') => {
    if (item.translations && item.translations[language] && item.translations[language][field]) {
      return item.translations[language][field];
    }
    // Fallback to English or original field
    return item.translations?.en?.[field] || item[field] || item.year;
  };

  // Fetch gallery categories (public endpoint)
  const { data: galleryCategories = [], isLoading: isGalleryLoading } =
    useQuery<GalleryCategory[]>({
      queryKey: ["/api/gallery-categories"],
    });

  // Fetch leadership data
  const { data: leadershipData, isLoading: isLeadershipLoading, error: leadershipError } = useQuery({
    queryKey: ["/api/company-info", "leadership_message"],
    queryFn: async () => {
      try {
        console.log("Fetching leadership data from public endpoint...");
        const response = await fetch(
          "/api/company-info/leadership_message",
        );
        console.log("Leadership API response status:", response.status);
        
        if (!response.ok) {
          console.error("Leadership API error:", response.status, response.statusText);
          throw new Error("Not found");
        }
        
        const data = await response.json();
        console.log("Leadership data fetched successfully:", data);
        return data;
      } catch (error) {
        console.error("Error fetching leadership data:", error);
        // Return default data if not found
        const defaultData = {
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
        console.log("Using default leadership data:", defaultData);
        return defaultData;
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
  let leadershipContent: {
    title?: string;
    description1?: string;
    description2?: string;
    leaderName?: string;
    leaderPosition?: string;
    leaderImage?: string;
    translations?: {
      en?: Record<string, string>;
      mk?: Record<string, string>;
      de?: Record<string, string>;
    };
  } = {};
  
  try {
    if (leadershipData && leadershipData.value) {
      console.log("Parsing leadership data:", leadershipData);
      leadershipContent = JSON.parse(leadershipData.value);
      console.log("Parsed leadership content:", leadershipContent);
    } else {
      console.log("No leadership data available, using empty object");
    }
  } catch (error) {
    console.error("Error parsing leadership data:", error);
    // Use default content if parsing fails
    leadershipContent = {
      title: "Building the Future of Infrastructure",
      description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
      description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
      leaderName: "Boris Madjunkov",
      leaderPosition: "General Director",
      leaderImage: "/attached_assets/Boris-Madjunkov-General-Manager-600x600_1755184653598.jpg",
      translations: {
        en: {
          title: "Building the Future of Infrastructure",
          description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
          description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
          leaderName: "Boris Madjunkov",
          leaderPosition: "General Director"
        },
        mk: {
          title: "Градење на иднината на инфраструктурата",
          description1: "Во Конти Хидропласт, нашата мисија секогаш била јасна: да водиме со иновации, да доставуваме квалитет по европски стандарди и да останеме пред кривата во нашата индустрија. Посветени сме на создавање одржливи решенија, проширување на нови пазари и споделување знаење со сите кои сакаат да растат.",
          description2: "Заедно, градиме не само за денес, туку за иднина на која нашите следни генерации ќе бидат горди.",
          leaderName: "Борис Маџунков",
          leaderPosition: "Генерален директор"
        },
        de: {
          title: "Den Weg in die Zukunft der Infrastruktur ebnen",
          description1: "Bei Konti Hidroplast war unsere Mission immer klar: mit Innovation zu führen, Qualität nach europäischen Standards zu liefern und der Kurve in unserer Branche voraus zu sein. Wir sind der Schaffung nachhaltiger Lösungen, der Erschließung neuer Märkte und dem Austausch von Wissen mit allen, die wachsen möchten, verpflichtet.",
          description2: "Gemeinsam bauen wir nicht nur für heute, sondern für eine Zukunft, auf die unsere nächsten Generationen stolz sein werden.",
          leaderName: "Boris Madjunkov",
          leaderPosition: "Generaldirektor"
        }
      }
    };
    console.log("Using fallback leadership content:", leadershipContent);
  }

  // Debug language and leadership content changes
  useEffect(() => {
    console.log("=== Language or Leadership Content Changed ===");
    console.log("Current language:", language);
    console.log("Leadership data:", leadershipData);
    console.log("Parsed leadership content:", leadershipContent);
    console.log("Title in current language:", getLocalizedLeadershipContent('title'));
    console.log("Description1 in current language:", getLocalizedLeadershipContent('description1'));
    console.log("Description2 in current language:", getLocalizedLeadershipContent('description2'));
    console.log("Leader name in current language:", getLocalizedLeadershipContent('leaderName'));
    console.log("Leader position in current language:", getLocalizedLeadershipContent('leaderPosition'));
  }, [language, leadershipData, leadershipContent]);

  // Debug gallery data changes
  useEffect(() => {
    console.log("=== Gallery Data Changed ===");
    console.log("Current language:", language);
    console.log("Gallery categories:", galleryCategories);
    console.log("Gallery loading:", isGalleryLoading);
    
    if (galleryCategories.length > 0) {
      galleryCategories.forEach((category, index) => {
        console.log(`\n--- Gallery Category ${index + 1} ---`);
        console.log('ID:', category.id);
        console.log('Title (original):', category.title);
        console.log('Translations object:', category.translations);
        console.log('Localized title:', getLocalizedGalleryTitle(category));
      });
    }
  }, [language, galleryCategories, isGalleryLoading]);

  // Function to get localized leadership content
  const getLocalizedLeadershipContent = (field: string) => {
    console.log(`=== getLocalizedLeadershipContent called ===`);
    console.log(`Field: ${field}`);
    console.log(`Current language: ${language}`);
    console.log(`Leadership content:`, leadershipContent);
    
    if (!leadershipContent || !leadershipContent[field as keyof typeof leadershipContent]) {
      console.log(`No content found for field: ${field}, using translation key`);
      // Fallback to translation keys
      switch (field) {
        case 'title':
          return t("aboutUs.leadershipTitle");
        case 'description1':
          return t("aboutUs.leadershipDescription1");
        case 'description2':
          return t("aboutUs.leadershipDescription2");
        case 'leaderName':
          return t("aboutUs.leaderName");
        case 'leaderPosition':
          return t("aboutUs.leaderPosition");
        default:
          return '';
      }
    }

    // Check if the content has translations structure
    if (leadershipContent.translations && typeof leadershipContent.translations === 'object') {
      const translations = leadershipContent.translations as any;
      console.log(`Found translations structure:`, translations);
      
      // Try to get the current language translation
      if (translations[language] && translations[language][field]) {
        console.log(`Found ${language} translation for ${field}:`, translations[language][field]);
        return translations[language][field];
      }
      
      // Fallback to English if current language not available
      if (translations.en && translations.en[field]) {
        console.log(`Using English fallback for ${field}:`, translations.en[field]);
        return translations.en[field];
      }
      
      // Fallback to Macedonian if English not available
      if (translations.mk && translations.mk[field]) {
        console.log(`Using Macedonian fallback for ${field}:`, translations.mk[field]);
        return translations.mk[field];
      }
      
      // Fallback to German if Macedonian not available
      if (translations.de && translations.de[field]) {
        console.log(`Using German fallback for ${field}:`, translations.de[field]);
        return translations.de[field];
      }
    }

    // If no translations structure, try to get the direct field value
    const content = leadershipContent[field as keyof typeof leadershipContent];
    if (typeof content === 'string' && content.trim() !== '') {
      console.log(`Using direct field value for ${field}:`, content);
      return content;
    }

    console.log(`No content found, using translation key for ${field}`);
    // Final fallback to translation keys
    switch (field) {
      case 'title':
        return t("aboutUs.leadershipTitle");
      case 'description1':
        return t("aboutUs.leadershipDescription1");
      case 'description2':
        return t("aboutUs.leadershipDescription2");
      case 'leaderName':
        return t("aboutUs.leaderName");
      case 'leaderPosition':
        return t("aboutUs.leaderPosition");
      default:
        return '';
    }
  };

  // Helper function to get localized gallery title
  const getLocalizedGalleryTitle = (category: GalleryCategory) => {
    console.log(`=== getLocalizedGalleryTitle called ===`);
    console.log(`Category:`, category);
    console.log(`Current language: ${language}`);
    console.log(`Category translations:`, category.translations);
    
    if (category.translations && typeof category.translations === 'object') {
      const translations = category.translations as any;
      console.log(`Parsed translations:`, translations);
      
      if (translations[language] && translations[language].title) {
        console.log(`Found ${language} translation:`, translations[language].title);
        return translations[language].title;
      }
      
      // Fallback to English or original title
      if (translations.en && translations.en.title) {
        console.log(`Using English fallback:`, translations.en.title);
        return translations.en.title;
      }
    }
    
    // Final fallback to original title
    console.log(`Using original title:`, category.title);
    return category.title;
  };

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
                {t("aboutUs.since1975")}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {t("aboutUs.title").toUpperCase()}{" "}
                <span className="text-red-500">KONTI</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HIDROPLAST
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t("aboutUs.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Factory className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {t("aboutUs.manufacturingExcellence")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {t("aboutUs.isoCertified")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                {!showVideo ? (
                  // Video Thumbnail with Play Button (fallback)
                  <div className="relative w-full h-full bg-black">
                    <img
                      src="https://img.youtube.com/vi/R7b9-m_EM2s/maxresdefault.jpg"
                      alt="Konti Hidroplast Corporate Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setShowVideo(true)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                        aria-label="Play Konti Hidroplast Corporate Video"
                      >
                        <Play className="w-12 h-12 ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // YouTube iframe with autoplay and loop
                  <iframe
                    src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&loop=1&playlist=R7b9-m_EM2s&mute=1&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                    title="Konti Hidroplast - Corporate 2024"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium">
                  {t("aboutUs.corporate2024")}
                </span>
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
                {t("aboutUs.heroTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t("about.text1")}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t("aboutUs.companyStoryText1")}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t("aboutUs.companyStoryText2")}
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {t("aboutUs.companyStoryText3")}
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                {t("aboutUs.companyStoryText4")}
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
                  {t("aboutUs.missionTitle")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("aboutUs.missionText")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("aboutUs.visionTitle")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("aboutUs.visionText")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("aboutUs.valuesTitle")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("aboutUs.valuesText")}
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
            {/* Timeline Header with Language Indicator */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("aboutUs.timelineTitle")}
              </h2>
            </div>
            
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
                            {getTimelineText(item, 'title')}
                          </h4>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {getTimelineText(item, 'description')}
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
          {isLeadershipLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
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
                        {t("aboutUs.leadershipMessage")}
                      </span>
                    </div>
                    
                    {/* Language Indicator */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60 uppercase tracking-wider">
                        {language === 'en' ? 'English' : language === 'mk' ? 'Македонски' : 'Deutsch'}
                      </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                      {getLocalizedLeadershipContent('title')}
                    </h2>
                  </div>

                  <div className="space-y-6 text-lg leading-relaxed text-white/90">
                    <p>
                      {getLocalizedLeadershipContent('description1')}
                    </p>

                    <p>
                      {getLocalizedLeadershipContent('description2')}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        {getLocalizedLeadershipContent('leaderName')}
                      </h3>
                      <p className="text-blue-200 font-semibold text-lg">
                        {getLocalizedLeadershipContent('leaderPosition')}
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
            </>
          )}
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold text-gray-900 mx-8">
                {t("aboutUs.teamTitle")}
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
                  {getTranslatedPositionTitle(teamCategories[activeTeamTabIndex]?.title || "") || "Loading..."}
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
                          {t("aboutUs.contactUsButton")}
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
                {t("aboutUs.noTeamMembers")}
              </h3>
              <p className="text-gray-500">
                {t("aboutUs.teamMembersDescription")}
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
                {t("aboutUs.projectsTitle") || t("aboutUs.productsTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Dynamic Projects Grid */}
          {isProjectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-xl"
                >
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
                .filter((project) => project.status === "active")
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-80 overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={getLocalizedText(project, 'title')}
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
                        {getLocalizedText(project, 'title')}
                        {project.translations && !(project.translations as any)[language]?.title && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {language === 'en' ? 'EN' : language === 'mk' ? 'MK' : 'DE'} {t("aboutUs.fallback")}
                          </Badge>
                        )}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {getLocalizedText(project, 'description')}
                        </p>
                      )}

                      {project.pdfUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#1c2d56] text-[#1c2d56] hover:bg-[#1c2d56] hover:text-white"
                          onClick={() =>
                            project.pdfUrl &&
                            window.open(project.pdfUrl, "_blank")
                          }
                        >
                          {t("aboutUs.downloadPdf")}
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
                {t("aboutUs.noProjectsAvailable")}
              </h3>
              <p className="text-gray-500">
                {t("aboutUs.projectsDescription")}
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
                {t("aboutUs.productsTitle")}
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
                    {t("aboutUs.waterSupplySystems")}
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/water-supply-systems">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>{t('products.learnMore')}</span>
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
                    {t("aboutUs.sewerageSystems")}
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/konti-kan-pipes-and-fittings">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>{t('products.learnMore')}</span>
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
                    {t("aboutUs.gasPipelineSystem")}
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/gas-pipeline-systems">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>{t('products.learnMore')}</span>
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
                    {t("aboutUs.cableProtection")}
                  </h3>

                  {/* Learn More Button */}
                  <Link href="/products/cable-protection">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                      <span>{t('products.learnMore')}</span>
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
              <h2 className="text-4xl font-bold text-gray-900 mx-8">{t("aboutUs.galleryTitle")}</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Dynamic Gallery Grid */}
          {isGalleryLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                >
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
                .filter((category) => category.status === "active")
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((category) => (
                  <div
                    key={category.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Gallery Image - Top */}
                    <div className="h-64 relative overflow-hidden">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={getLocalizedGalleryTitle(category)}
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
                          {getLocalizedGalleryTitle(category)}
                        </h3>

                        {/* View Gallery Button */}
                        <a
                          href={`/gallery/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]"
                        >
                          <span>{t("aboutUs.viewGallery")}</span>
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
                {t("aboutUs.noGalleryCategories")}
              </h3>
              <p className="text-gray-500">
                {t("aboutUs.galleryCategoriesDescription")}
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
                {t("aboutUs.getInTouchTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("aboutUs.getInTouchDescription")}
            </p>
            <Button
              onClick={() => {
                // Store scroll target in sessionStorage
                sessionStorage.setItem("scrollToContact", "true");
                // Navigate to home page
                setLocation("/");
              }}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors"
              data-testid="contact-button"
            >
              {t("aboutUs.contactUsButton")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { useLanguage } from "@/contexts/LanguageContext";

export function StatisticsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });
  const { t } = useLanguage();

  const statistics = [
    { value: 35, labelKey: "stats.years", suffix: "" },
    { value: 9682, labelKey: "stats.products", suffix: "+" },
    { value: 3150, labelKey: "stats.projects", suffix: "+" },
    { value: 210, labelKey: "stats.employees", suffix: "+" },
    { value: 52000000, labelKey: "stats.turnover", suffix: "+" },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-[#1c2d56]"
      data-testid="statistics-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: 2x2 grid with centered turnover */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-8 mb-8">
            {statistics.slice(0, 4).map((stat, index) => (
              <StatisticCard
                key={stat.labelKey}
                value={stat.value}
                label={t(stat.labelKey)}
                suffix={stat.suffix}
                isActive={hasIntersected}
                delay={index * 200}
              />
            ))}
          </div>
          {/* Centered turnover */}
          <div className="flex justify-center">
            <StatisticCard
              key={statistics[4].labelKey}
              value={statistics[4].value}
              label={t(statistics[4].labelKey)}
              suffix={statistics[4].suffix}
              isActive={hasIntersected}
              delay={4 * 200}
            />
          </div>
        </div>
        
        {/* Desktop layout: single row */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.labelKey}
              value={stat.value}
              label={t(stat.labelKey)}
              suffix={stat.suffix}
              isActive={hasIntersected}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatisticCardProps {
  value: number;
  label: string;
  suffix: string;
  isActive: boolean;
  delay: number;
}

function StatisticCard({ value, label, suffix, isActive, delay }: StatisticCardProps) {
  const count = useCounterAnimation({
    end: value,
    isActive: isActive,
    duration: 2000,
  });

  // Format numbers with periods as thousand separators
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE'); // German locale uses periods as thousand separators
  };

  return (
    <div
      className={`text-center ${
        isActive ? "animate-counter" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`stat-${label.toLowerCase()}`}
    >
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-blue-200 text-[20px] font-medium">{label}</div>
    </div>
  );
}

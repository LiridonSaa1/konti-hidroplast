import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const statistics = [
  { value: 35, label: "Years", suffix: "" },
  { value: 9682, label: "Products", suffix: "+" },
  { value: 3150, label: "Projects", suffix: "+" },
  { value: 210, label: "Employees", suffix: "+" },
  { value: 52000000, label: "Turnover", suffix: "+" },
];

export function StatisticsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className="py-20 bg-[#1c2d56]"
      data-testid="statistics-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
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

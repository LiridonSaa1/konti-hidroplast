import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const statistics = [
  { value: 49, label: "Years", suffix: "" },
  { value: 500, label: "Products", suffix: "+" },
  { value: 1000, label: "Projects", suffix: "+" },
  { value: 200, label: "Employees", suffix: "+" },
  { value: 50, label: "Turnover", suffix: "M+" },
];

export function StatisticsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className="py-20 konti-gradient"
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

  return (
    <div
      className={`text-center ${
        isActive ? "animate-counter" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`stat-${label.toLowerCase()}`}
    >
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-blue-200 font-medium">{label}</div>
    </div>
  );
}

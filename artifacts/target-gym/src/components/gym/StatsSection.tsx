import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setCount(0);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#e61f1f] py-12" aria-label="Stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
              <dt
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </dt>
              <dd className="text-sm font-semibold uppercase tracking-widest text-white/80">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

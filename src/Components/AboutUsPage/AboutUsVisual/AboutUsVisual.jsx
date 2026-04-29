import { useEffect, useMemo, useRef, useState } from "react";
import visualBg from "../../../assets/Banners/Banner-2.webp";
import "./AboutUsVisual.scss";

export default function AboutUsVisual() {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  const circleRefs = useRef([]);
  const windowRefs = useRef([]);
  const [phase, setPhase] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(26);

  useEffect(() => {
    const updatePhase = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const next = Math.min(Math.max((window.innerHeight - rect.top) / Math.max(travel, 1), 0), 1);
      setPhase(next);
    };

    updatePhase();
    window.addEventListener("scroll", updatePhase, { passive: true });
    window.addEventListener("resize", updatePhase);

    return () => {
      window.removeEventListener("scroll", updatePhase);
      window.removeEventListener("resize", updatePhase);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const sectionRect = sectionRef.current.getBoundingClientRect();

    windowRefs.current.forEach((windowEl, index) => {
      const circleEl = circleRefs.current[index];
      if (!windowEl || !circleEl) {
        return;
      }

      const circleRect = circleEl.getBoundingClientRect();
      const offsetX = circleRect.left - sectionRect.left;
      const offsetY = circleRect.top - sectionRect.top;
      const bgScale = 1.28;
      const bgWidth = sectionRect.width * bgScale;
      const bgHeight = sectionRect.height * bgScale;
      const shiftX = (bgWidth - sectionRect.width) / 2;
      const shiftY = (bgHeight - sectionRect.height) / 2;

      windowEl.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      windowEl.style.backgroundPosition = `${-offsetX - shiftX}px ${-offsetY - shiftY}px`;
    });
  }, [phase]);

  useEffect(() => {
    const updateOrbitRadius = () => {
      const orbitEl = orbitRef.current;
      const circleEl = circleRefs.current[0];
      if (!orbitEl || !circleEl) {
        return;
      }

      const orbitRect = orbitEl.getBoundingClientRect();
      const circleRect = circleEl.getBoundingClientRect();
      const nextRadius = (circleRect.width / 2 / Math.max(orbitRect.width, 1)) * 100;
      const clamped = Math.min(Math.max(nextRadius, 8), 45);
      setOrbitRadius(clamped);
    };

    updateOrbitRadius();
    window.addEventListener("resize", updateOrbitRadius);

    return () => {
      window.removeEventListener("resize", updateOrbitRadius);
    };
  }, []);

  const motion = useMemo(() => {
    const eased = 1 - (1 - phase) ** 1.6;
    const angle = 140 * eased;
    const radius = orbitRadius;
    const rad = (angle * Math.PI) / 180;
    const topX = 50 + radius * Math.sin(rad);
    const topY = 50 - radius * Math.cos(rad);
    const bottomX = 50 + radius * Math.sin(rad + Math.PI);
    const bottomY = 50 - radius * Math.cos(rad + Math.PI);
    return {
      topCircle: { left: `${topX}%`, top: `${topY}%` },
      bottomCircle: { left: `${bottomX}%`, top: `${bottomY}%` },
    };
  }, [phase, orbitRadius]);

  return (
    <section
      className="about-us-visual section-container"
      data-bg-tone="0"
      data-bg-offset="0.42"
      ref={sectionRef}
      style={{ "--about-visual-bg": `url(${visualBg})` }}
    >
      <div className="about-us-visual__cover" aria-hidden="true" />

      <div className="about-us-visual__label about-us-visual__label--left">
        <span>Good</span>
        <h3>Brands</h3>
      </div>
      <div className="about-us-visual__label about-us-visual__label--right">
        <span>Good</span>
        <h3>People</h3>
      </div>

      <div className="about-us-visual__orbit" ref={orbitRef}>
        <div
          className="about-us-visual__circle about-us-visual__circle--one"
          style={motion.topCircle}
          ref={(el) => {
            circleRefs.current[0] = el;
          }}
        >
          <div
            className="about-us-visual__window"
            aria-hidden="true"
            ref={(el) => {
              windowRefs.current[0] = el;
            }}
          />
        </div>

        <div
          className="about-us-visual__circle about-us-visual__circle--two"
          style={motion.bottomCircle}
          ref={(el) => {
            circleRefs.current[1] = el;
          }}
        >
          <div
            className="about-us-visual__window"
            aria-hidden="true"
            ref={(el) => {
              windowRefs.current[1] = el;
            }}
          />
        </div>
      </div>
    </section>
  );
}

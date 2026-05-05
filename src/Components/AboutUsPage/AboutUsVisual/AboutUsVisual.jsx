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
  const [isMobileVisual, setIsMobileVisual] = useState(window.innerWidth <= 900);

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
    const updateViewportMode = () => {
      setIsMobileVisual(window.innerWidth <= 900);
    };
    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
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
      const bgScale = isMobileVisual ? 1 : 2;
      const bgWidth = sectionRect.width * bgScale;
      const bgHeight = sectionRect.height * bgScale;
      const shiftX = (bgWidth - sectionRect.width) / 2;
      const shiftY = (bgHeight - sectionRect.height) / 2;

      windowEl.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      windowEl.style.backgroundPosition = `${-offsetX - shiftX}px ${-offsetY - shiftY}px`;
    });
  }, [isMobileVisual, phase]);

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
    if (isMobileVisual) {
      return {
        topCircle: {},
        bottomCircle: {},
      };
    }

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
  }, [isMobileVisual, phase, orbitRadius]);

  return (
    <section
      className="about-us-visual section-container"
      data-bg-tone="0"
      data-bg-offset="0.42"
      data-bg-delay-blend="0.3"
      ref={sectionRef}
      style={{ "--about-visual-bg": `url(${visualBg})` }}
    >
      <div className="about-us-visual__stage">
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
      </div>

      <aside
        className="about-us-visual__mission-vision"
        aria-labelledby="about-vision-heading about-mission-heading"
      >
        <div className="about-us-visual__mission-vision-card">
          <h3 id="about-vision-heading">Our vision</h3>
          <p>
            Make every print a story, done by precision production, bold scale and uncompromising
            quality in large format printing.
          </p>
        </div>
        <div className="about-us-visual__mission-vision-card">
          <h3 id="about-mission-heading">Our mission</h3>
          <ul>
            <li>Offer high-quality printing and installation for various projects.</li>
            <li>Foster long-term customer relationships through reliability and responsiveness.</li>
            <li>
              Upgrade pre-press, printing, and finishing capabilities to meet industry standards.
            </li>
            <li>Deliver comprehensive support from file creation to distribution.</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

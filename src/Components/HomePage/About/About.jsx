import { useEffect, useRef, useState } from "react";
import "./About.scss";

const roundPx = (n) => Math.round(n * 100) / 100;

export default function About() {
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(window.innerHeight);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      setSectionTop(rect.top);
      setViewportHeight(window.innerHeight);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const sharedStartTop = viewportHeight * 1.12;
  const sharedEndTop = viewportHeight * .2;
  const sharedPhase = Math.min(
    Math.max((sharedStartTop - sectionTop) / (sharedStartTop - sharedEndTop), 0),
    1
  );

  const leftPhase = sharedPhase;
  const rightPhase = sharedPhase;
  const centerPhase = sharedPhase;
  const descriptionPhase = Math.min(Math.max((sharedPhase - 0.08) / 0.92, 0), 1);
  const leftDistance = 420 * (1 - leftPhase);
  const rightDistance = 420 * (1 - rightPhase);
  const centerRise = 70 * (1 - centerPhase);

  return (
    <section className="home-about" id="about" ref={sectionRef}>
      <div className="home-about__container">
        <h2 className="home-about__title">
          <span
            className="home-about__line home-about__line--left"
            style={{
              transform: `translate3d(${-roundPx(leftDistance)}px, 0, 0)`,
              opacity: leftPhase,
            }}
          >
            Our
          </span>
          <span
            className="home-about__line home-about__line--center"
            style={{
              transform: `translate3d(0, ${roundPx(centerRise)}px, 0)`,
              opacity: centerPhase,
            }}
          >
            Story
          </span>
          <span
            className="home-about__line home-about__line--right"
            style={{
              transform: `translate3d(${roundPx(rightDistance)}px, 0, 0)`,
              opacity: rightPhase,
            }}
          >
            Since 2004
          </span>
        </h2>

        <p
          className="home-about__description"
          style={{
            opacity: descriptionPhase,
            transform: `translate3d(0, ${roundPx(35 * (1 - descriptionPhase))}px, 0)`,
          }}
        >
          <span className="tertiary-color">
            Two decades of large format printing, born in Dubai. From flex banners to full building
            wraps, we combine advanced pre-press, printing, and finishing equipment to deliver work
            that holds up, on the wall, on the road, and on the skyline.
          </span>
          <br />
          <br />
          <span className="primary-color">
            Our commitment: To deliver premium quality printing and installation and to maintain strong customer service relations.
          </span>
        </p>
      </div>
    </section>
  );
}

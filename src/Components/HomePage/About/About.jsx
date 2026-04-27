import { useEffect, useRef, useState } from "react";
import "./About.scss";

export default function About() {
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(window.innerHeight);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      setSectionTop(rect.top);
      setViewportHeight(window.innerHeight);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
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
            style={{ transform: `translateX(${-leftDistance}px)`, opacity: leftPhase }}
          >
            Our
          </span>
          <span
            className="home-about__line home-about__line--center"
            style={{ transform: `translateY(${centerRise}px)`, opacity: centerPhase }}
          >
            Story
          </span>
          <span
            className="home-about__line home-about__line--right"
            style={{ transform: `translateX(${rightDistance}px)`, opacity: rightPhase }}
          >
            Since 2004
          </span>
        </h2>

        <p
          className="home-about__description"
          style={{
            opacity: descriptionPhase,
            transform: `translateY(${35 * (1 - descriptionPhase)}px)`,
          }}
        >
          Orange Advertising opened its Dubai office in 2004. Specialized in
          large format digital printing, we provide a wide range of indoor and
          outdoor printing solutions for your business by using a blend of the
          most sophisticated pre-press, printing, and finishing equipment.
          <br />
          <br />
          Our commitment: To deliver premium quality printing and installation
          and to maintain strong customer service relations.
        </p>
      </div>
    </section>
  );
}

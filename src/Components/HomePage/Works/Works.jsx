import { useEffect, useMemo, useRef, useState } from "react";
import "./Works.scss";
import works from "../../../data/worksData";

export default function Works() {
  const gallerySectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!viewportRef.current || !trackRef.current) {
        return;
      }
      const overflow = trackRef.current.scrollWidth - viewportRef.current.clientWidth;
      setMaxTranslate(Math.max(overflow, 0));
    };

    const updateProgress = () => {
      if (!gallerySectionRef.current) {
        return;
      }
      const rect = gallerySectionRef.current.getBoundingClientRect();
      const maxDistance = Math.max(gallerySectionRef.current.offsetHeight - window.innerHeight, 1);
      const raw = (-rect.top) / maxDistance;
      const next = Math.min(Math.max(raw, 0), 1);
      setProgress(next);
    };

    updateMeasurements();
    updateProgress();
    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("resize", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const trackStyle = useMemo(
    () => ({ transform: `translateX(${-maxTranslate * progress}px)` }),
    [maxTranslate, progress]
  );

  return (
    <section className="home-works" id="works">
      <div className="home-works__intro">
        <p className="home-works__eyebrow">Works</p>
        <div className="home-works__intro-left">
          <h2 className="home-works__title quaternary-color">Listen To Your Eyes</h2>
        </div>
        <p className="home-works__description">
          We create visual-first campaigns and identities that hold attention,
          shape memory, and move people to act.
        </p>
      </div>

      <div className="home-works__gallery-section" ref={gallerySectionRef}>
        <div className="home-works__gallery-sticky">
          <div className="home-works__gallery" ref={viewportRef}>
            <div className="home-works__track" ref={trackRef} style={trackStyle}>
              {works.map((work) => (
                <article className="home-works__card" key={work.id}>
                  <img src={work.image} alt={work.title} className="home-works__image" />
                  <div className="home-works__meta">
                    <span className="tertiary-color">({work.id})</span>
                    <h3 className="quaternary-color">{work.title}</h3>
                    <p>{work.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

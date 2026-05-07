import { useLayoutEffect, useMemo, useRef } from "react";
import "./Works.scss";
import works from "../../../data/worksData";

export default function Works() {
  const gallerySectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const maxTranslateRef = useRef(0);

  const featuredWorks = useMemo(() => works.filter((work) => work.featured), []);

  useLayoutEffect(() => {
    let rafId = 0;

    const tick = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const section = gallerySectionRef.current;
      if (!viewport || !track || !section) {
        return;
      }

      const overflow = track.scrollWidth - viewport.clientWidth;
      maxTranslateRef.current = Math.max(overflow, 0);

      const rect = section.getBoundingClientRect();
      const maxDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = -rect.top / maxDistance;
      const progress = Math.min(Math.max(raw, 0), 1);

      const tx = -maxTranslateRef.current * progress;
      track.style.transform = `translate3d(${tx}px, 0, 0)`;
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        tick();
      });
    };

    tick();
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
            <div className="home-works__track" ref={trackRef}>
              {featuredWorks.map((work) => (
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

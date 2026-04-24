import { useEffect, useMemo, useRef, useState } from "react";
import "./Works.scss";

import Image1 from "../../../assets/Works/Image-1.webp";
import Image2 from "../../../assets/Works/Image-2.jpg";
import Image3 from "../../../assets/Works/Image-3.webp";
import Image4 from "../../../assets/Works/Image-4.jpeg";
import Image5 from "../../../assets/Works/Image-5.jpg";
import Image6 from "../../../assets/Works/Image-6.jpg";

const works = [
  {
    id: "001",
    title: "Advertisement",
    subtitle: "Boards - Hoardings and all",
    image: Image1,
  },
  {
    id: "002",
    title: "Signage",
    subtitle: "Brand Sign Systems",
    image: Image2,
  },
  {
    id: "003",
    title: "Floor Graphics",
    subtitle: "Wayfinding and Floor Branding",
    image: Image3,
  },
  {
    id: "004",
    title: "Wall Signs",
    subtitle: "Interior and Exterior Wall Displays",
    image: Image4,
  },
  {
    id: "005",
    title: "Structural Design",
    subtitle: "Custom Structural Installations",
    image: Image5,
  },
  {
    id: "006",
    title: "POS Materials",
    subtitle: "Point of Sale Display Assets",
    image: Image6,
  },
];

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
        <div className="home-works__intro-left">
          <p className="home-works__eyebrow">Works</p>
          <h2 className="home-works__title">Listen To Your Eyes</h2>
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
                    <span>({work.id})</span>
                    <h3>{work.title}</h3>
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

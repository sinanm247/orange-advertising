// import { useEffect, useMemo, useRef, useState } from "react";
// import visualBg from "../../../assets/Works/Image-10.webp";
import mosaicImg1 from "../../../assets/Works/Image-15.webp";
import mosaicImg2 from "../../../assets/Works/Image-9.webp";
import mosaicImg3 from "../../../assets/Works/Image-2.webp";
import mosaicImg4 from "../../../assets/Works/Image-4.webp";
import mosaicImg5 from "../../../assets/Works/Image-10.webp";
import mosaicImg6 from "../../../assets/Works/Image-7.webp";
import "./AboutUsVisual.scss";

const mosaicImages = [
  mosaicImg1,
  mosaicImg2,
  mosaicImg3,
  mosaicImg4,
  mosaicImg5,
  mosaicImg6,
];

export default function AboutUsVisual() {
  // const sectionRef = useRef(null);
  // const orbitRef = useRef(null);
  // const circleRefs = useRef([]);
  // const windowRefs = useRef([]);
  // const [phase, setPhase] = useState(0);
  // const [orbitRadius, setOrbitRadius] = useState(26);
  // const [isMobileVisual, setIsMobileVisual] = useState(window.innerWidth <= 900);

  // ... previous orbit / scroll visual logic kept above in git history / comments in prior version ...

  return (
    <section
      className="about-us-visual section-container"
      data-bg-tone="0"
      data-bg-offset="0.45"
      data-bg-delay-blend="0.4"
    >
      {/* Previous orbit stage — kept for reference
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
      */}

      <div className="about-us-visual__mosaic" aria-hidden="true">
        <div className="about-us-visual__mosaic-label about-us-visual__mosaic-label--left">
          <span>Good</span>
          <p>Brands</p>
        </div>
        <div className="about-us-visual__mosaic-label about-us-visual__mosaic-label--right">
          <span>Good</span>
          <p>People</p>
        </div>

        <div className="about-us-visual__mosaic-grid">
          {mosaicImages.map((image, index) => (
            <div
              className={`about-us-visual__mosaic-cell about-us-visual__mosaic-cell--${index + 1}`}
              key={`mosaic-${index + 1}`}
            >
              <img src={image} alt="" loading="lazy" />
            </div>
          ))}
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

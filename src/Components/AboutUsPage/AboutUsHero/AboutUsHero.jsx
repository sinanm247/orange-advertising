import "./AboutUsHero.scss";

export default function AboutUsHero() {
  return (
    <section className="about-us-hero" data-bg-tone="1" data-bg-offset="0.58">
      <div className="about-us-hero__marquee" aria-hidden="true">
        <div className="about-us-hero__marquee-track">
          <span>Dubai Since 2004</span>
          <span>Large Format Experts</span>
          <span>Print. Fabricate. Install.</span>
          <span>Dubai Since 2004</span>
        </div>
        <div className="about-us-hero__marquee-track">
          <span>Dubai Since 2004</span>
          <span>Large Format Experts</span>
          <span>Print. Fabricate. Install.</span>
          <span>Dubai Since 2004</span>
        </div>
      </div>

      <div className="about-us-hero__content-block section-container">
        <section className="about-us-intro">
          <h2>About Orange Advertising</h2>
          <p>
            Orange Advertising opened its Dubai office in 2004 with a focused vision: deliver
            reliable large format digital printing solutions for modern brand communication across
            indoor and outdoor spaces.
          </p>
        </section>

        <section className="about-us-story">
          <p>
            Our workflow combines technical planning, color management, and precise production
            standards to ensure every campaign is delivered with quality and consistency.
          </p>
          <p>
            From design intent to final installation, we execute with discipline and maintain strong
            customer service relationships across every stage.
          </p>
        </section>
      </div>
    </section>
  );
}

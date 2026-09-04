import "./AboutUsHero.scss";

export default function AboutUsHero() {
  return (
    <section className="about-us-hero" data-bg-tone="1" data-bg-offset="0.45">
      <div className="about-us-hero__marquee" aria-hidden="true">
        <div className="about-us-hero__marquee-track">
          <span>Dubai Since 2004</span>
          <span>Large Format Specialists</span>
          <span>Print. Fabricate. Install.</span>
          <span>Dubai Since 2004</span>
        </div>
        <div className="about-us-hero__marquee-track">
          <span>Dubai Since 2004</span>
          <span>Large Format Specialists</span>
          <span>Print. Fabricate. Install.</span>
          <span>Dubai Since 2004</span>
        </div>
      </div>

      <div className="about-us-hero__content-block section-container">
        <section className="about-us-intro">
          <h2>About Orange Advertising</h2>
          <p>We turn bold ideas into large format reality.</p>
        </section>

        <section className="about-us-story">
          <p>
            Since 2004, Orange Advertising has produced indoor and outdoor visuals across the UAE -
            from flex banners and 3D hoardings to mall interiors, rooftop installations, vehicle
            branding, and full façade wraps.
          </p>
          <p>
            Every stage happens in-house - pre-press, colour management, printing, mounting,
            fabrication, packing, and distribution - giving our clients one point of accountability
            from file to finish.
          </p>
          <p>
            It&apos;s what makes us a go-to production partner for developers, banks, retailers,
            automotive brands, telcos, malls, and government entities who can&apos;t afford to
            compromise on quality or deadlines.
          </p>
        </section>

        <section className="about-us-values" aria-labelledby="about-us-values-heading">
          <h3 id="about-us-values-heading">What we stand for</h3>
          <ul>
            <li>
              <span>Precision Printing</span> - Premium quality, accurate colour and clean finishing
            </li>
            <li>
              <span>On-Time Delivery</span> - We treat deadlines as commitments and not estimates.
            </li>
            <li>
              <span>Full In-House Control</span> - File prep to final install, handled under one
              roof.
            </li>
            <li>
              <span>Long-Term Partnership</span> - We advise on materials and feasibility, not just
              fulfil orders.
            </li>
            <li>
              <span>Built for the Outdoors</span> - Structural integrity and compliance on every
              large-scale install.
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}

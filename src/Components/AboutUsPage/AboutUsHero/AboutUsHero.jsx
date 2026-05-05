import "./AboutUsHero.scss";

export default function AboutUsHero() {
  return (
    <section className="about-us-hero" data-bg-tone="1" data-bg-offset="0.58">
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
          <p>
            A Dubai-born large format specialist, turning brand ideas into high-impact indoor and
            outdoor experiences across the UAE.
          </p>
          <p>
            Since 2004, we&apos;ve focused on one thing: printing and producing visuals that hold
            their own against the city skyline.
          </p>
        </section>

        <section className="about-us-story">
          <p>
            From flex banners, 3D hoardings and rooftop installations to mall interiors, flags,
            vehicle branding and full façade wraps, our work is built to be seen, remembered, and
            trusted.
          </p>
          <p>
            Powered by advanced pre-press, colour-managed workflows and state-of-the-art printing
            and finishing equipment, we manage every stage in-house—file creation, colour
            manipulation, mounting, fabrication, packing and distribution.
          </p>
          <p>
            That control has made Orange Advertising a go-to production partner for developers,
            banks, retailers, automotive brands, telcos, malls and government entities who
            can&apos;t afford to compromise on quality or deadlines.
          </p>
        </section>

        <section className="about-us-values" aria-labelledby="about-us-values-heading">
          <h3 id="about-us-values-heading">What we stand for</h3>
          <ul>
            <li>
              Committed to premium printing, precise colour and clean finishing on every job.
            </li>
            <li>
              We treat timelines as promises, planning production and installation to deliver on
              schedule.
            </li>
            <li>
              From file preparation to final installation, we keep critical steps in-house—giving
              clients consistency, control and fewer surprises.
            </li>
            <li>
              Many of our clients have grown with us for years. We act as a production partner, not
              just a vendor—advising on materials, formats and feasibility.
            </li>
            <li>
              Large structures and outdoor installs demand safe, compliant and durable solutions. We
              build with structural integrity and long-term performance in mind.
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}

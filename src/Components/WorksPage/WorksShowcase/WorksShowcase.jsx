import "./WorksShowcase.scss";
import works from "../../../data/worksData";

export default function WorksShowcase() {
  return (
    <section className="works-showcase" data-bg-tone="1">
      <div className="works-showcase__head">
        <p>Works</p>
        <h2>Listen To Your Eyes</h2>
      </div>

      <div className="works-showcase__grid">
        {works.map((work) => (
          <article className="works-showcase__card" key={work.id}>
            {work.imageDesktop ? (
              <picture>
                <source media="(min-width: 1025px)" srcSet={work.imageDesktop} />
                <img src={work.image} alt={work.title} className="works-showcase__image" />
              </picture>
            ) : (
              <img src={work.image} alt={work.title} className="works-showcase__image" />
            )}
            <div className="works-showcase__meta">
              <span>({work.id})</span>
              <h3>{work.title}</h3>
              <p>{work.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

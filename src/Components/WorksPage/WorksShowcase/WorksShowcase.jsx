import "./WorksShowcase.scss";
import works from "../../../data/worksData";

/** Matches grid spans: 4n+1 & 4n+4 = narrow (9), 4n+2 & 4n+3 = wide (11). */
function isNarrowSlot(index) {
  const position = index % 4;
  return position === 0 || position === 3;
}

function getWorkImage(work, index) {
  if (isNarrowSlot(index) && work.imageNarrow) {
    return work.imageNarrow;
  }
  return work.image;
}

export default function WorksShowcase() {
  return (
    <section className="works-showcase" data-bg-tone="1">
      <div className="works-showcase__head">
        <p>Works</p>
        <h2>Listen To Your Eyes</h2>
      </div>

      <div className="works-showcase__grid">
        {works.map((work, index) => (
          <article className="works-showcase__card" key={work.id}>
            <img
              src={getWorkImage(work, index)}
              alt={work.title}
              className="works-showcase__image"
            />
            <div className="works-showcase__meta">
              <span>({work.id})</span>
              <h3>{work.title}</h3>
              <div className="works-showcase__meta-row">
                {work.client ? <p className="works-showcase__client">{work.client}</p> : <span />}
                <p className="works-showcase__service">{work.service}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

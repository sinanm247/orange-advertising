import { useEffect, useRef, useState } from "react";
import "./Services.scss";

const serviceCards = [
  {
    id: "01",
    title: "Advertisement",
    description:
      "Large-format outdoor visibility solutions built for high-reach campaigns.",
    items: [
      "Boards",
      "Hoardings",
      "Outdoor Campaign Displays",
      "Project Coordination",
    ],
  },
  {
    id: "02",
    title: "Signage",
    description:
      "Custom indoor and outdoor sign systems designed for clarity and brand presence.",
    items: [
      "Indoor Signage",
      "Outdoor Signage",
      "LED Installation",
      "Steel Fabrication Support",
    ],
  },
  {
    id: "03",
    title: "Floor Graphics",
    description:
      "Durable floor branding and directional graphics for retail and event spaces.",
    items: [
      "Retail Wayfinding",
      "Promotional Floor Decals",
      "Anti-Slip Media Options",
      "Installation-ready Outputs",
    ],
  },
  {
    id: "04",
    title: "Wall Signs",
    description:
      "High-impact wall communication systems for interior and exterior environments.",
    items: [
      "Brand Walls",
      "Office Sign Panels",
      "Vinyl Wall Branding",
      "Backlit Wall Displays",
    ],
  },
  {
    id: "05",
    title: "Structural Design",
    description:
      "End-to-end structural concepts and fabrication support for display installations.",
    items: [
      "Display Structures",
      "Media Mounting Solutions",
      "Steel and Frame Planning",
      "Execution Supervision",
    ],
  },
  {
    id: "06",
    title: "POS Materials",
    description:
      "Point-of-sale display materials crafted to improve in-store visibility and conversion.",
    items: [
      "Countertop Displays",
      "Shelf Branding",
      "Danglers and Cutouts",
      "In-Store Promotional Kits",
    ],
  },
];

export default function Services() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef([]);
  const stackRef = useRef(null);
  const isSelectingRef = useRef(false);
  const selectionTimeoutRef = useRef(null);

  useEffect(() => {
    const updateActiveCardFromScroll = () => {
      let nextActive = 0;

      serviceCards.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) {
          return;
        }

        const styles = window.getComputedStyle(card);
        const stickyTop = parseFloat(styles.getPropertyValue("--sticky-top")) || 0;
        const stackGap = parseFloat(styles.getPropertyValue("--stack-gap")) || 0;
        const threshold = stickyTop + index * stackGap;
        const top = card.getBoundingClientRect().top;

        if (top <= threshold + 2) {
          nextActive = index;
        }
      });

      if (!isSelectingRef.current) {
        setActiveCardIndex((prev) => (prev === nextActive ? prev : nextActive));
      }
    };

    updateActiveCardFromScroll();
    window.addEventListener("scroll", updateActiveCardFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveCardFromScroll);

    return () => {
      if (selectionTimeoutRef.current) {
        window.clearTimeout(selectionTimeoutRef.current);
      }
      window.removeEventListener("scroll", updateActiveCardFromScroll);
      window.removeEventListener("resize", updateActiveCardFromScroll);
    };
  }, []);

  const handleCardSelect = (index) => {
    setActiveCardIndex(index);
    isSelectingRef.current = true;

    const card = cardRefs.current[index];
    const stack = stackRef.current;
    if (!card || !stack) {
      isSelectingRef.current = false;
      return;
    }

    const styles = window.getComputedStyle(card);
    const stickyTop = parseFloat(styles.getPropertyValue("--sticky-top")) || 0;
    const stackGap = parseFloat(styles.getPropertyValue("--stack-gap")) || 0;
    const topOffset = stickyTop + index * stackGap;
    const stackTopInDocument = stack.getBoundingClientRect().top + window.scrollY;
    const stackStyles = window.getComputedStyle(stack);
    const flowGap = parseFloat(stackStyles.rowGap || stackStyles.gap) || 0;
    const flowOffset = cardRefs.current
      .slice(0, index)
      .reduce((total, node) => total + (node?.offsetHeight || 0), 0);
    const targetY = stackTopInDocument + flowOffset + index * flowGap - topOffset;

    window.scrollTo({
      top: Math.max(targetY, 0),
      behavior: "smooth",
    });

    if (selectionTimeoutRef.current) {
      window.clearTimeout(selectionTimeoutRef.current);
    }
    selectionTimeoutRef.current = window.setTimeout(() => {
      isSelectingRef.current = false;
    }, 550);
  };

  return (
    <section className="home-services" id="services">
      <div className="home-services__intro">
        <div className="home-services__intro-left">
          <p className="home-services__eyebrow">Services</p>
          <h2 className="home-services__title">Undying Bonds</h2>
        </div>
        <p className="home-services__description">
          Full-spectrum print and fabrication support from file preparation to
          final installation and delivery.
        </p>
      </div>

      <div className="home-services__stack" ref={stackRef}>
        {serviceCards.map((card, index) => (
          <article
            className={`home-services__card ${index === activeCardIndex ? "is-active" : ""}`}
            key={card.id}
            style={{ "--stack-index": index }}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            role="button"
            tabIndex={0}
            onClick={() => handleCardSelect(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCardSelect(index);
              }
            }}
          >
            <span className="home-services__card-id">({card.id})</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <ul>
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

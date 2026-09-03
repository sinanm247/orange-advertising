import { useEffect, useRef, useState } from "react";
import "./Services.scss";

const serviceCards = [
  {
    id: "01",
    title: "Printing",
    items: [
      "Flex Banners",
      "Danglers",
      "Vinyl Branding",
      "Flags",
      "3D",
      "Floor Graphics",
      "Backdrops",
      "Wall Signs",
      "Displays",
      "POS Materials",
      "Outdoor",
      "Window Branding",
    ],
  },
  {
    id: "02",
    title: "Manufacturing",
    items: [
      "Signage",
      "Advertisement Boards",
      "Structural Design",
      "Indoor & Outdoor Steel Manufacturing",
      "LED Installation and Project Management",
    ],
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getCardStackProgress = (index, card, nextCard) => {
  if (!card) {
    return 0;
  }

  const styles = window.getComputedStyle(card);
  const stickyTop = parseFloat(styles.getPropertyValue("--sticky-top")) || 0;
  const stackGap = parseFloat(styles.getPropertyValue("--stack-gap")) || 0;
  const stackLine = stickyTop + index * stackGap;
  const cardTop = card.getBoundingClientRect().top;

  if (cardTop > stackLine + 4) {
    return 0;
  }

  if (!nextCard) {
    return 0;
  }

  const nextTop = nextCard.getBoundingClientRect().top;
  const nextStackLine = stickyTop + (index + 1) * stackGap;

  if (nextTop <= nextStackLine + 2) {
    return 1;
  }

  const transitionStart = nextStackLine + stackGap * 1.35;
  const transitionEnd = nextStackLine;

  if (nextTop >= transitionStart) {
    return 0;
  }

  return clamp(1 - (nextTop - transitionEnd) / (transitionStart - transitionEnd), 0, 1);
};

export default function Services() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardStackProgress, setCardStackProgress] = useState(() =>
    serviceCards.map(() => 0)
  );
  const cardRefs = useRef([]);
  const stackRef = useRef(null);
  const isSelectingRef = useRef(false);
  const selectionTimeoutRef = useRef(null);

  useEffect(() => {
    const updateActiveCardFromScroll = () => {
      let nextActive = 0;
      const nextProgress = serviceCards.map((_, index) => {
        const card = cardRefs.current[index];
        const nextCard = cardRefs.current[index + 1];

        if (card) {
          const styles = window.getComputedStyle(card);
          const stickyTop = parseFloat(styles.getPropertyValue("--sticky-top")) || 0;
          const stackGap = parseFloat(styles.getPropertyValue("--stack-gap")) || 0;
          const threshold = stickyTop + index * stackGap;
          const top = card.getBoundingClientRect().top;

          if (top <= threshold + 2) {
            nextActive = index;
          }
        }

        return getCardStackProgress(index, card, nextCard);
      });

      if (!isSelectingRef.current) {
        setActiveCardIndex((prev) => (prev === nextActive ? prev : nextActive));
      }

      setCardStackProgress((prev) => {
        const hasChanged = prev.some(
          (value, index) => Math.abs(value - nextProgress[index]) > 0.005
        );
        return hasChanged ? nextProgress : prev;
      });
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
        <p className="home-services__eyebrow">Services</p>
        <div className="home-services__intro-left">
          <h2 className="home-services__title tertiary-color">Undying Bonds</h2>
        </div>
        <p className="home-services__description">
          Our comprehensive product range, which continues to grow through
          research and development initiatives.
        </p>
      </div>

      <div className="home-services__stack" ref={stackRef}>
        {serviceCards.map((card, index) => (
          <article
            className={`home-services__card ${index === activeCardIndex ? "is-active" : ""}`}
            key={card.id}
            style={{
              "--stack-index": index,
              "--stack-progress": cardStackProgress[index],
            }}
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
            <div className="home-services__card-header">
              <span className="home-services__card-id">({card.id})</span>
              <h3 className="home-services__card-title">{card.title}</h3>
            </div>
            <ul>
              {card.items.map((item) => (
                <li className="tertiary-color" key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

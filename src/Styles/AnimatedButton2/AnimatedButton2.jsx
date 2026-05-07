import "./AnimatedButton2.scss";

export default function AnimatedButton2({ href = "#", label = "Hover me!", className = "", style }) {
  const rootClassName = `btn2 btn2--svg ${className}`.trim();

  return (
    <a href={href} className={rootClassName} style={style}>
      <span className="btn2--svg__label">{label}</span>

      <svg
        className="btn2--svg__border btn2--svg__border--left"
        x="0px"
        y="0px"
        preserveAspectRatio="none"
        viewBox="2 29.3 56.9 13.4"
        enableBackground="new 2 29.3 56.9 13.4"
        width="190"
      >
        <path
          fill="none"
          stroke="#fe5001"
          strokeWidth="0.5"
          strokeMiterlimit="1"
          d="M30.4,41.9H9c0,0-6.2-0.3-6.2-5.9S9,30.1,9,30.1h21.4"
        />
      </svg>

      <svg
        className="btn2--svg__border btn2--svg__border--right"
        x="0px"
        y="0px"
        preserveAspectRatio="none"
        viewBox="2 29.3 56.9 13.4"
        enableBackground="new 2 29.3 56.9 13.4"
        width="190"
      >
        <path
          fill="none"
          stroke="#fe5001"
          strokeWidth="0.5"
          strokeMiterlimit="1"
          d="M30.4,41.9h21.5c0,0,6.1-0.4,6.1-5.9s-6-5.9-6-5.9H30.4"
        />
      </svg>
    </a>
  );
}

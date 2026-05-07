import React from 'react';
import './AnimatedButton.scss';

const AnimatedButton = ({ href = '#', label = 'Hover me!', className = '', style }) => {
  const rootClassName = `btn btn--svg ${className}`.trim();

  return (
    <a href={href} className={rootClassName} style={style}>
      <span className="btn--svg__label">{label}</span>

      {/* Background circle */}
      <svg
        className="btn--svg__circle"
        width="190"
        x="0px"
        y="0px"
        viewBox="0 0 60 60"
        enableBackground="new 0 0 60 60"
      >
        <circle fill="#fe5001" cx="30" cy="30" r="28.7" />
      </svg>

      {/* Left border path */}
      <svg
        className="btn--svg__border btn--svg__border--left"
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

      {/* Right border path */}
      <svg
        className="btn--svg__border btn--svg__border--right"
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
};

export default AnimatedButton;
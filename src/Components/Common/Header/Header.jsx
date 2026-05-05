import { useEffect, useState } from "react";
import "./Header.scss";

const navItems = 
[
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About",
    href: "/about-us",
  },
  {
    id: 3,
    label: "Works",
    href: "/works",
  },
  {
    id: 4,
    label: "Services",
    href: "/services",
  },
  {
    id: 5,
    label: "Contact",
    href: "/contact",
  },
];

const parseRgbColor = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }
  const match = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) {
    return null;
  }
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
};

const isLightColor = (value) => {
  const rgb = parseRgbColor(value);
  if (!rgb) {
    return true;
  }
  const brightness = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
  return brightness >= 160;
};

export default function Header({
  className = "",
  style,
  navStyle,
  followStyle,
  hideFollow = false,
  logoSrc,
  reserveLogoSpace = false,
  logoTextStyle,
  logoImageStyle,
  logoImageSrc,
  logoAltImageSrc,
  logoAltImageStyle,
  showAnimatedLogo = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navClassName = `site-header__nav ${isMenuOpen ? "is-open" : ""}`.trim();
  const appliedNavStyle = isMobile ? undefined : navStyle;
  const useLightTone = isLightColor(style?.color);
  const mobileToggleStyle = isMenuOpen
    ? {
        backgroundColor: "rgb(255, 249, 235)",
        color: "rgb(254, 80, 1)",
      }
    : {
        backgroundColor: useLightTone ? "rgb(255, 249, 235)" : "rgb(254, 80, 1)",
        color: useLightTone ? "rgb(254, 80, 1)" : "rgb(255, 249, 235)",
      };

  return (
    <header
      className={`site-header ${className} ${isMenuOpen ? "is-menu-open" : ""}`.trim()}
      style={style}
    >
      {logoSrc && (
        <a href="/" className="site-header__logo-link" aria-label="Go to home page">
          <img src={logoSrc} alt="Orange logo" className="site-header__logo-static" />
        </a>
      )}
      {!logoSrc && reserveLogoSpace && <div className="site-header__logo-spacer" aria-hidden="true" />}

      {showAnimatedLogo && (
        <>
          <h1 className="site-header__brand site-header__brand--text" style={logoTextStyle}>
            Orange
          </h1>
          <a
            href="/"
            aria-label="Go to home page"
            className="site-header__brand site-header__brand--image site-header__brand-link site-header__brand--image-secondary"
            style={logoImageStyle}
          >
            <img src={logoImageSrc} alt="Orange logo" className="site-header__brand-image-inner" />
          </a>
          {logoAltImageSrc && (
            <a
              href="/"
              aria-label="Go to home page"
              className="site-header__brand site-header__brand--image site-header__brand-link site-header__brand--image-alt"
              style={logoAltImageStyle}
            >
              <img
                src={logoAltImageSrc}
                alt="Orange logo alt"
                className="site-header__brand-image-inner"
              />
            </a>
          )}
        </>
      )}

      <button
        type="button"
        className={`site-header__menu-toggle ${isMenuOpen ? "is-open" : ""}`.trim()}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        style={mobileToggleStyle}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={navClassName} style={appliedNavStyle}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="site-header__link"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {!hideFollow && (
        <a href="#" className="site-header__follow" style={followStyle}>
          Follow
        </a>
      )}
    </header>
  );
}

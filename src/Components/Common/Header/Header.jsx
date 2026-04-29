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
  return (
    <header className={`site-header ${className}`.trim()} style={style}>
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
            className="site-header__brand site-header__brand--image site-header__brand-link"
            style={logoImageStyle}
          >
            <img src={logoImageSrc} alt="Orange logo" className="site-header__brand-image-inner" />
          </a>
          {logoAltImageSrc && (
            <a
              href="/"
              aria-label="Go to home page"
              className="site-header__brand site-header__brand--image site-header__brand-link"
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

      <nav className="site-header__nav" style={navStyle}>
        {navItems.map((item) => (
          <a key={item.id} href={item.href} className="site-header__link">
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

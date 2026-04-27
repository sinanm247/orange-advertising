import "./Header.scss";

const navItems = ["Works", "Studio", "Services", "Contact"];

export default function Header({
  className = "",
  style,
  navStyle,
  followStyle,
  hideFollow = false,
  logoTextStyle,
  logoImageStyle,
  logoImageSrc,
  logoAltImageSrc,
  logoAltImageStyle,
  showAnimatedLogo = false,
}) {
  return (
    <header className={`site-header ${className}`.trim()} style={style}>
      {showAnimatedLogo && (
        <>
          <h1 className="site-header__brand site-header__brand--text" style={logoTextStyle}>
            Orange
          </h1>
          <img
            src={logoImageSrc}
            alt="Orange logo"
            className="site-header__brand site-header__brand--image"
            style={logoImageStyle}
          />
          {logoAltImageSrc && (
            <img
              src={logoAltImageSrc}
              alt="Orange logo alt"
              className="site-header__brand site-header__brand--image"
              style={logoAltImageStyle}
            />
          )}
        </>
      )}

      <nav className="site-header__nav" style={navStyle}>
        {navItems.map((item) => (
          <a key={item} href="#" className="site-header__link">
            {item}
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

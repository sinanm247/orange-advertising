import "./Footer.scss";

const tickerItems = [
  "Dubai Office Since 2004",
  "Large Format Digital Printing",
  "Indoor and Outdoor Branding Solutions",
  "Advanced Pre-Press and Finishing",
  "Premium Printing and Installation",
  "Reliable Customer Service Relations",
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__actions">
        <a href="#" className="site-footer__pill">
          Project Inquiries
        </a>
        <a href="#" className="site-footer__pill">
          Make a Call
        </a>
        <a href="#" className="site-footer__pill">
          Chat with Us
        </a>
      </div>

      <div className="site-footer__ticker" aria-label="Company highlights">
        <div className="site-footer__ticker-track">
          {tickerItems.map((item) => (
            <span key={`left-${item}`} className="site-footer__ticker-item">
              {item}
            </span>
          ))}
        </div>
        <div className="site-footer__ticker-track" aria-hidden="true">
          {tickerItems.map((item) => (
            <span key={`right-${item}`} className="site-footer__ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="site-footer__copy">© 2025 Orange Advertising. All rights reserved</p>
    </footer>
  );
}

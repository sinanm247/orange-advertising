import "./Footer.scss";
import AnimatedButton2 from "../../../Styles/AnimatedButton2/AnimatedButton2";

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
    <footer className="site-footer" id="footer">
      <div className="site-footer__actions">
        <AnimatedButton2 href="#" label="Project Inquiries" className="site-footer__pill" />
        <AnimatedButton2 href="#" label="Make a Call" className="site-footer__pill" />
        <AnimatedButton2 href="#" label="Chat with Us" className="site-footer__pill" />
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

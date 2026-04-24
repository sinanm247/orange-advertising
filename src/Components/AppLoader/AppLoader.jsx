import "./AppLoader.scss";
import logo from "../../assets/Logo/Logo-Secondary.png";

export default function AppLoader({ isVisible }) {
  return (
    <div className={`app-loader-container ${isVisible ? "show" : "hide"}`}>
      <img src={logo} alt="Loading" className="logo" />
    </div>
  );
}

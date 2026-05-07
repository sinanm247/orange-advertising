import "./AppLoader.scss";
import logo from "../../assets/Logo/Logo-Secondary-512x512.png";

export default function AppLoader({ phase }) {
  return (
    <div className="app-loader-container" data-phase={phase} aria-hidden="true">
      <img src={logo} alt="" className="app-loader-container__logo" />
    </div>
  );
}

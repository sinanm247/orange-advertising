import { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AppLoader from "./Components/AppLoader/AppLoader";
import AppRouter from "./Components/AppRouter/AppRouter";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import routes from "./Routes/Routes";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import logoSecondary from "./assets/Logo/Logo-Secondary.png";
import logoPrimary from "./assets/Logo/Logo-Primary.png";

// Set to true to show coming soon page, false for normal site
const SHOW_COMING_SOON = false;

export default function App() {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(true);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [nonHomePrimaryWeight, setNonHomePrimaryWeight] = useState(1);
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 1500); // Adjust loader duration

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    if (isHomeRoute || pageLoading) {
      return;
    }

    const updateLayoutPhase = () => {
      setScrollY(window.scrollY);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const anchors = Array.from(document.querySelectorAll("[data-bg-tone]")).map((node) => {
        const offsetRatio = Number(node.getAttribute("data-bg-offset") ?? 0);
        const offsetPx = window.innerHeight * offsetRatio;
        return {
          top: window.scrollY + node.getBoundingClientRect().top + offsetPx,
          tone: Number(node.getAttribute("data-bg-tone")),
        };
      });

      if (anchors.length === 0) {
        setNonHomePrimaryWeight(1);
        return;
      }

      anchors.sort((a, b) => a.top - b.top);
      const probeY = window.scrollY + window.innerHeight * 0.55;

      if (probeY <= anchors[0].top) {
        setNonHomePrimaryWeight(anchors[0].tone);
        return;
      }

      const last = anchors[anchors.length - 1];
      if (probeY >= last.top) {
        setNonHomePrimaryWeight(last.tone);
        return;
      }

      for (let index = 0; index < anchors.length - 1; index += 1) {
        const current = anchors[index];
        const next = anchors[index + 1];
        if (probeY >= current.top && probeY <= next.top) {
          const range = Math.max(next.top - current.top, 1);
          const phase = (probeY - current.top) / range;
          setNonHomePrimaryWeight(current.tone + (next.tone - current.tone) * phase);
          return;
        }
      }
    };

    updateLayoutPhase();
    window.addEventListener("scroll", updateLayoutPhase, { passive: true });
    window.addEventListener("resize", updateLayoutPhase);

    return () => {
      window.removeEventListener("scroll", updateLayoutPhase);
      window.removeEventListener("resize", updateLayoutPhase);
    };
  }, [isHomeRoute, location.pathname, pageLoading]);

  const nonHomeStyles = useMemo(() => {
    if (isHomeRoute) {
      return null;
    }

    const mixChannel = (from, to, phase) => Math.round(from + (to - from) * phase);
    const primary = { r: 254, g: 80, b: 1 };
    const secondary = { r: 255, g: 249, b: 235 };
    const footerNode = document.getElementById("footer");
    const footerRect = footerNode?.getBoundingClientRect();
    const footerBgStart = window.innerHeight * 0.72;
    const footerBgEnd = window.innerHeight * 0.2;
    const footerBgPhase = footerRect
      ? Math.min(Math.max((footerBgStart - footerRect.top) / (footerBgStart - footerBgEnd), 0), 1)
      : 0;
    const footerMotionStart = window.innerHeight * 0.52;
    const footerMotionEnd = window.innerHeight * 0.08;
    const footerMotionPhase = footerRect
      ? Math.min(
          Math.max((footerMotionStart - footerRect.top) / (footerMotionStart - footerMotionEnd), 0),
          1
        )
      : 0;
    const anchoredPrimaryWeight = Math.min(Math.max(nonHomePrimaryWeight, 0), 1);
    const primaryWeight = anchoredPrimaryWeight * (1 - footerBgPhase);
    const bg = {
      r: mixChannel(secondary.r, primary.r, primaryWeight),
      g: mixChannel(secondary.g, primary.g, primaryWeight),
      b: mixChannel(secondary.b, primary.b, primaryWeight),
    };
    const fg = {
      r: mixChannel(primary.r, secondary.r, primaryWeight),
      g: mixChannel(primary.g, secondary.g, primaryWeight),
      b: mixChannel(primary.b, secondary.b, primaryWeight),
    };

    const footerFlipPhase = Math.min(Math.max((footerMotionPhase - 0.02) / 0.34, 0), 1);
    const footerMovePhase = Math.min(Math.max((footerMotionPhase - 0.38) / 0.62, 0), 1);
    const easedFooterMovePhase = 1 - (1 - footerMovePhase) ** 3;
    const easedFooterFlipPhase = 1 - (1 - footerFlipPhase) ** 3;
    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;
    const headerX = viewport.width > 1024 ? 145 : 95;
    const headerY = viewport.width > 1024 ? 48 : 40;
    const baseShiftX = headerX - centerX;
    const baseShiftY = headerY - centerY;
    const headerBrandScale = 0.16;
    const footerTargetX = viewport.width / 2;
    const footerTargetY = viewport.width > 1024 ? 300 : 180;
    const footerShiftX = (footerTargetX - headerX) * easedFooterMovePhase;
    const footerShiftY = (footerTargetY - headerY) * easedFooterMovePhase;
    const finalShiftX = baseShiftX + footerShiftX;
    const finalShiftY = baseShiftY + footerShiftY;
    const finalBrandScale = headerBrandScale * (1 + 5.25 * easedFooterMovePhase);
    const logoTransform = `translate(-50%, -50%) translate(${finalShiftX}px, ${finalShiftY}px) scale(${finalBrandScale})`;
    const imageScaleBoost = 3.6 * (1 - 0.38 * easedFooterMovePhase);
    const imageLogoTransform = `translate(-50%, -50%) translate(${finalShiftX}px, ${finalShiftY}px) scale(${finalBrandScale * imageScaleBoost})`;
    const navWidthEstimate = viewport.width > 1024 ? 620 : 360;
    const horizontalPadding = viewport.width > 1024 ? 40 : 24;
    const maxSafeShift = Math.max(viewport.width / 2 - horizontalPadding - navWidthEstimate / 2, 0);
    const headerNavShift = Math.min(-baseShiftX, maxSafeShift);
    const textOpacity = easedFooterFlipPhase;
    let footerImageOpacity = 1 - easedFooterFlipPhase;
    if (footerFlipPhase > 0.82) {
      footerImageOpacity = 0;
    }
    const secondaryLogoOpacity = footerImageOpacity * primaryWeight;
    const primaryLogoOpacity = footerImageOpacity * (1 - primaryWeight);
    const textRotate = 90 * (1 - easedFooterFlipPhase);
    const imageRotate = -90 * easedFooterFlipPhase;

    return {
      shell: {
        backgroundColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
      },
      headerShell: {
        backgroundColor: `rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.96)`,
        color: `rgba(${fg.r}, ${fg.g}, ${fg.b}, 0.92)`,
      },
      headerNav: {
        transform: `translateX(${headerNavShift * (1 - easedFooterMovePhase)}px)`,
        marginRight: `${80 * (1 - footerMovePhase)}px`,
      },
      logoText: {
        transform: `${logoTransform} rotateY(${textRotate}deg)`,
        color: `rgba(${fg.r}, ${fg.g}, ${fg.b}, 0.92)`,
        opacity: textOpacity,
      },
      logoImage: {
        transform: `${imageLogoTransform} rotateY(${imageRotate}deg)`,
        opacity: secondaryLogoOpacity,
      },
      logoImageAlt: {
        transform: `${imageLogoTransform} rotateY(${imageRotate}deg)`,
        opacity: primaryLogoOpacity,
      },
    };
  }, [isHomeRoute, nonHomePrimaryWeight, scrollY, viewport.height, viewport.width]);

  // Show coming soon page
  if (SHOW_COMING_SOON) {
    return (
      <>
        <AppLoader isVisible={pageLoading} />
        {!pageLoading && <ComingSoon />}
      </>
    );
  }

  // Normal site
  return (
    <>
      <AppLoader isVisible={pageLoading} />
      {!pageLoading && (
        <Fragment>
          {!isHomeRoute && nonHomeStyles && (
            <Header
              className="site-header--shared site-header--page-start"
              style={nonHomeStyles.headerShell}
              navStyle={nonHomeStyles.headerNav}
              hideFollow
              showAnimatedLogo
              logoImageSrc={logoSecondary}
              logoAltImageSrc={logoPrimary}
              logoTextStyle={nonHomeStyles.logoText}
              logoImageStyle={nonHomeStyles.logoImage}
              logoAltImageStyle={nonHomeStyles.logoImageAlt}
            />
          )}
          <div style={!isHomeRoute && nonHomeStyles ? nonHomeStyles.shell : undefined}>
            <AppRouter routes={routes} />
            {!isHomeRoute && <Footer />}
          </div>
        </Fragment>
      )}
    </>
  );
}
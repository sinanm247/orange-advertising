import { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AppLoader from "./Components/AppLoader/AppLoader";
import AppRouter from "./Components/AppRouter/AppRouter";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import routes from "./Routes/Routes";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import logoSecondary from "./assets/Logo/Logo-Icon-Secondary.png";
import logoPrimary from "./assets/Logo/Logo-Icon-Primary.png";

// Set to true to show coming soon page, false for normal site
const SHOW_COMING_SOON = false;

/** Map 0–1 with smooth ends (Ken Perlin), used for delayed bg crossfades. */
function smoothstep01(t) {
  const u = Math.min(Math.max(t, 0), 1);
  return u * u * (3 - 2 * u);
}

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
      const stableViewportHeight = viewport.height || window.innerHeight;
      setScrollY(window.scrollY);

      const anchors = Array.from(document.querySelectorAll("[data-bg-tone]")).map((node) => {
        const rect = node.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const offsetRatio = Number(node.getAttribute("data-bg-offset") ?? 0);
        const offsetPx = stableViewportHeight * offsetRatio;
        const delayRaw = node.getAttribute("data-bg-delay-blend");
        const delayFrac =
          delayRaw != null && delayRaw !== "" ? Number(delayRaw) : Number.NaN;
        const hasDelay =
          Number.isFinite(delayFrac) && delayFrac > 0 && delayFrac <= 1;

        const top = sectionTop + offsetPx;

        const toneAttr = Number(node.getAttribute("data-bg-tone"));
        const tone = Number.isFinite(toneAttr) ? toneAttr : 1;

        return {
          sectionTop,
          top,
          tone,
          nodeEl: hasDelay ? node : null,
          delayBlendFrac: hasDelay ? delayFrac : null,
        };
      });

      if (anchors.length === 0) {
        setNonHomePrimaryWeight(1);
        return;
      }

      // Order by true section position so tall offsets cannot invert narrative (e.g. hero vs visual).
      anchors.sort((a, b) => a.sectionTop - b.sectionTop);
      const probeY = window.scrollY + stableViewportHeight * 0.55;

      const minTop = Math.min(...anchors.map((a) => a.top));
      const maxTop = Math.max(...anchors.map((a) => a.top));

      if (probeY <= minTop) {
        setNonHomePrimaryWeight(anchors[0].tone);
        return;
      }

      if (probeY >= maxTop) {
        setNonHomePrimaryWeight(anchors[anchors.length - 1].tone);
        return;
      }

      for (let index = 0; index < anchors.length - 1; index += 1) {
        const current = anchors[index];
        const next = anchors[index + 1];
        const lo = Math.min(current.top, next.top);
        const hi = Math.max(current.top, next.top);
        if (probeY < lo || probeY > hi) {
          continue;
        }

        if (next.nodeEl != null && next.delayBlendFrac != null) {
          const r = next.nodeEl.getBoundingClientRect();
          const vh = stableViewportHeight;
          const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          const ratio = r.height > 0 ? visible / r.height : 0;
          if (ratio < next.delayBlendFrac) {
            setNonHomePrimaryWeight(current.tone);
            return;
          }
          const span = Math.max(1 - next.delayBlendFrac, 1e-4);
          const ratioT = Math.min(Math.max((ratio - next.delayBlendFrac) / span, 0), 1);
          const segSpan = Math.max(hi - lo, 1);
          const scrollT = Math.min(Math.max((probeY - lo) / segSpan, 0), 1);
          // Visibility alone can jump the new tone in; require both visibility and scroll
          // progress so the incoming tone eases in. Product + smoothstep softens the fade-in.
          const phase = smoothstep01(ratioT) * smoothstep01(scrollT);
          setNonHomePrimaryWeight(current.tone + (next.tone - current.tone) * phase);
          return;
        }

        const toneFrom = current.top <= next.top ? current.tone : next.tone;
        const toneTo = current.top <= next.top ? next.tone : current.tone;
        const range = Math.max(hi - lo, 1);
        const phase = (probeY - lo) / range;
        setNonHomePrimaryWeight(toneFrom + (toneTo - toneFrom) * phase);
        return;
      }
    };

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleResize = () => {
      updateViewport();
      updateLayoutPhase();
    };

    updateViewport();
    updateLayoutPhase();
    window.addEventListener("scroll", updateLayoutPhase, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateLayoutPhase);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHomeRoute, location.pathname, pageLoading, viewport.height]);

  const nonHomeStyles = useMemo(() => {
    if (isHomeRoute) {
      return null;
    }

    const mixChannel = (from, to, phase) => Math.round(from + (to - from) * phase);
    const primary = { r: 254, g: 80, b: 1 };
    const secondary = { r: 255, g: 249, b: 235 };
    const stableViewportHeight = viewport.height || window.innerHeight;
    const footerNode = document.getElementById("footer");
    const footerRect = footerNode?.getBoundingClientRect();
    const footerBgStart = stableViewportHeight * 0.72;
    const footerBgEnd = stableViewportHeight * 0.2;
    const footerBgPhase = footerRect
      ? Math.min(Math.max((footerBgStart - footerRect.top) / (footerBgStart - footerBgEnd), 0), 1)
      : 0;
    const footerMotionStart =
      stableViewportHeight * (viewport.width <= 460 ? 0.22 : 0.52);
    const footerMotionEnd =
      stableViewportHeight * (viewport.width <= 460 ? 0.04 : 0.08);
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
    const headerX = viewport.width > 1024 ? 145 : 85;
    const headerY = viewport.width > 1024 ? 48 : 45;
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
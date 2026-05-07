import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationTransitionContext from "./Context/NavigationTransitionContext.jsx";
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

/** Match AppLoader.scss `$loader-slide-duration` (seconds → ms). */
const LOADER_SLIDE_MS = 720;
const LOADER_HOLD_MS = 880;

/** Match AppLoader.scss `$loader-slide-ease`: cubic-bezier(0.33, 1, 0.53, 1) — maps linear time → eased progress. */
function cssCubicBezierMapping(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleCurveDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;

  function solveCurveX(x, epsilon) {
    let t2 = x;
    for (let i = 0; i < 8; i += 1) {
      const x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) {
        return t2;
      }
      const d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) {
        break;
      }
      t2 -= x2 / d2;
    }

    let t0 = 0;
    let t1 = 1;
    t2 = x;
    for (let i = 0; i < 8; i += 1) {
      const x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 + t0) / 2;
    }
    return t2;
  }

  return function loaderSlideEase(tLinear) {
    if (tLinear <= 0) {
      return 0;
    }
    if (tLinear >= 1) {
      return 1;
    }
    return sampleCurveY(solveCurveX(tLinear, 1 / 1000));
  };
}

const loaderSlideEase = cssCubicBezierMapping(0.33, 1, 0.53, 1);

/**
 * Cross-browser document scroll position. Use this instead of only `window.scrollTo`:
 * some engines apply scroll on `document.scrollingElement`, not the visual viewport.
 */
function getDocumentScrollTop() {
  return (
    window.scrollY ??
    window.pageYOffset ??
    document.documentElement.scrollTop ??
    document.body.scrollTop ??
    0
  );
}

function setDocumentScrollTop(top) {
  const root = document.scrollingElement ?? document.documentElement;
  const maxY = Math.max(0, root.scrollHeight - window.innerHeight);
  const y = Math.min(Math.max(0, top), maxY);
  root.scrollTop = y;
  if (document.body && document.body !== root) {
    document.body.scrollTop = y;
  }
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

/** Cream — Home + tone-0 heroes (e.g. Services). */
const ROUTE_TOP_SHELL_BG = "rgb(255, 249, 235)";

const PRIMARY_RGB = { r: 254, g: 80, b: 1 };
const SECONDARY_RGB = { r: 255, g: 249, b: 235 };

/** Scroll-driven tone weight when anchors are not mounted yet (must match page heroes). */
function getFallbackPrimaryWeightForPathname(pathname) {
  const p = pathname && pathname !== "" ? pathname.split("#")[0] : "/";
  if (p === "/services") {
    return 0;
  }
  if (p === "/") {
    return 0;
  }
  return 1;
}

/** Same shell rgb as `nonHomeStyles.shell` for top-of-page (footer below fold → footer phase 0). */
function shellBackgroundRgbFromToneWeight(nonHomePrimaryWeight, viewport) {
  const stableViewportHeight = viewport.height || window.innerHeight;
  const footerNode = document.getElementById("footer");
  const footerRect = footerNode?.getBoundingClientRect();
  const footerBgStart = stableViewportHeight * 0.72;
  const footerBgEnd = stableViewportHeight * 0.2;
  const footerBgPhase = footerRect
    ? Math.min(Math.max((footerBgStart - footerRect.top) / (footerBgStart - footerBgEnd), 0), 1)
    : 0;
  const anchoredPrimaryWeight = Math.min(Math.max(nonHomePrimaryWeight, 0), 1);
  const primaryWeight = anchoredPrimaryWeight * (1 - footerBgPhase);
  const mixChannel = (from, to, phase) => Math.round(from + (to - from) * phase);
  const bg = {
    r: mixChannel(SECONDARY_RGB.r, PRIMARY_RGB.r, primaryWeight),
    g: mixChannel(SECONDARY_RGB.g, PRIMARY_RGB.g, primaryWeight),
    b: mixChannel(SECONDARY_RGB.b, PRIMARY_RGB.b, primaryWeight),
  };
  return `rgb(${bg.r}, ${bg.g}, ${bg.b})`;
}

function presetShellBgForPathname(pathname, viewport) {
  if ((pathname && pathname.split("#")[0]) === "/") {
    return ROUTE_TOP_SHELL_BG;
  }
  const w = getFallbackPrimaryWeightForPathname(pathname);
  return shellBackgroundRgbFromToneWeight(w, viewport);
}

/**
 * Same tone logic as the scroll listener — returns null if no `[data-bg-tone]` nodes yet.
 */
function computePrimaryWeightFromAnchors(scrollY, viewportHeight) {
  const stableViewportHeight = viewportHeight || window.innerHeight;
  const anchors = Array.from(document.querySelectorAll("[data-bg-tone]")).map((node) => {
    const rect = node.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const offsetRatio = Number(node.getAttribute("data-bg-offset") ?? 0);
    const offsetPx = stableViewportHeight * offsetRatio;
    const delayRaw = node.getAttribute("data-bg-delay-blend");
    const delayFrac =
      delayRaw != null && delayRaw !== "" ? Number(delayRaw) : Number.NaN;
    const hasDelay = Number.isFinite(delayFrac) && delayFrac > 0 && delayFrac <= 1;

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
    return null;
  }

  anchors.sort((a, b) => a.sectionTop - b.sectionTop);
  const probeY = scrollY + stableViewportHeight * 0.55;

  const minTop = Math.min(...anchors.map((a) => a.top));
  const maxTop = Math.max(...anchors.map((a) => a.top));

  if (probeY <= minTop) {
    return anchors[0].tone;
  }

  if (probeY >= maxTop) {
    return anchors[anchors.length - 1].tone;
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
        return current.tone;
      }
      const span = Math.max(1 - next.delayBlendFrac, 1e-4);
      const ratioT = Math.min(Math.max((ratio - next.delayBlendFrac) / span, 0), 1);
      const segSpan = Math.max(hi - lo, 1);
      const scrollT = Math.min(Math.max((probeY - lo) / segSpan, 0), 1);
      const phase = smoothstep01(ratioT) * smoothstep01(scrollT);
      return current.tone + (next.tone - current.tone) * phase;
    }

    const toneFrom = current.top <= next.top ? current.tone : next.tone;
    const toneTo = current.top <= next.top ? next.tone : current.tone;
    const range = Math.max(hi - lo, 1);
    const phase = (probeY - lo) / range;
    return toneFrom + (toneTo - toneFrom) * phase;
  }

  return anchors[0].tone;
}

/** Map 0–1 with smooth ends (Ken Perlin), used for delayed bg crossfades. */
function smoothstep01(t) {
  const u = Math.min(Math.max(t, 0), 1);
  return u * u * (3 - 2 * u);
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  /** True only when navigate() runs after scroll+loader-in (skip repeat enter/on on pathname effect). */
  const pendingExitOnlyRef = useRef(false);
  const preNavTimerRef = useRef(null);
  const preNavRafRef = useRef({ outer: 0, inner: 0 });

  /** 'enter' = panel below fold, 'on' = full cover, 'exit' = slides up off screen, 'off' = unmount loader */
  const [loaderPhase, setLoaderPhase] = useState("enter");
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [nonHomePrimaryWeight, setNonHomePrimaryWeight] = useState(0);
  const [shellBgOverride, setShellBgOverride] = useState(null);
  const isHomeRoute = location.pathname === "/";

  const scrollAnimRafRef = useRef(0);

  const cancelScrollSync = useCallback(() => {
    if (scrollAnimRafRef.current) {
      cancelAnimationFrame(scrollAnimRafRef.current);
      scrollAnimRafRef.current = 0;
    }
  }, []);

  /** Window scroll from current Y to `targetY` over `durationMs`, eased like the loader slide (starts when loader hits phase `on`). */
  const runScrollSyncTo = useCallback(
    (targetY, durationMs) => {
      cancelScrollSync();
      const startY = getDocumentScrollTop();
      const dy = targetY - startY;
      if (Math.abs(dy) < 0.5) {
        setDocumentScrollTop(targetY);
        return;
      }
      const t0 = performance.now();
      const step = (now) => {
        const elapsed = now - t0;
        const u = Math.min(elapsed / durationMs, 1);
        const p = loaderSlideEase(u);
        setDocumentScrollTop(startY + dy * p);
        if (u < 1) {
          scrollAnimRafRef.current = requestAnimationFrame(step);
        } else {
          scrollAnimRafRef.current = 0;
        }
      };
      scrollAnimRafRef.current = requestAnimationFrame(step);
    },
    [cancelScrollSync]
  );

  const navigateWithLoader = useCallback(
    (to) => {
      if (!to || typeof to !== "string") {
        return;
      }

      clearTimeout(preNavTimerRef.current);
      cancelAnimationFrame(preNavRafRef.current.outer);
      cancelAnimationFrame(preNavRafRef.current.inner);
      cancelScrollSync();

      const pathOnly = to.split("#")[0] || "/";
      if (pathOnly === location.pathname) {
        if (to.includes("#")) {
          navigate(to);
        } else {
          runScrollSyncTo(0, LOADER_SLIDE_MS);
        }
        return;
      }

      const vwNav = { width: window.innerWidth, height: window.innerHeight };
      const fwNav = getFallbackPrimaryWeightForPathname(pathOnly);
      setNonHomePrimaryWeight(fwNav);
      setShellBgOverride(presetShellBgForPathname(pathOnly, vwNav));

      setLoaderPhase("enter");

      preNavRafRef.current.outer = requestAnimationFrame(() => {
        preNavRafRef.current.inner = requestAnimationFrame(() => {
          flushSync(() => {
            setLoaderPhase("on");
          });
          runScrollSyncTo(0, LOADER_SLIDE_MS);
          preNavTimerRef.current = window.setTimeout(() => {
            pendingExitOnlyRef.current = true;
            navigate(to);
          }, LOADER_SLIDE_MS);
        });
      });
    },
    [cancelScrollSync, location.pathname, navigate, runScrollSyncTo]
  );

  const navigationContextValue = useMemo(
    () => ({ navigateWithLoader }),
    [navigateWithLoader]
  );

  useEffect(
    () => () => {
      cancelScrollSync();
    },
    [cancelScrollSync]
  );

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- loader shell preset must commit before paint */
  useLayoutEffect(() => {
    const vwPath = { width: window.innerWidth, height: window.innerHeight };
    if (location.pathname === "/") {
      setShellBgOverride(ROUTE_TOP_SHELL_BG);
    } else {
      const fwPath = getFallbackPrimaryWeightForPathname(location.pathname);
      setNonHomePrimaryWeight(fwPath);
      setShellBgOverride(shellBackgroundRgbFromToneWeight(fwPath, vwPath));
    }

    if (pendingExitOnlyRef.current) {
      pendingExitOnlyRef.current = false;
      const exitAt = window.setTimeout(() => {
        setLoaderPhase("exit");
      }, LOADER_HOLD_MS);
      const offAt = window.setTimeout(() => {
        setLoaderPhase("off");
      }, LOADER_HOLD_MS + LOADER_SLIDE_MS);
      return () => {
        clearTimeout(exitAt);
        clearTimeout(offAt);
      };
    }

    setLoaderPhase("enter");

    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        flushSync(() => {
          setLoaderPhase("on");
        });
        runScrollSyncTo(0, LOADER_SLIDE_MS);
      });
    });

    const exitAt = window.setTimeout(() => {
      setLoaderPhase("exit");
    }, LOADER_SLIDE_MS + LOADER_HOLD_MS);

    const offAt = window.setTimeout(() => {
      setLoaderPhase("off");
    }, LOADER_SLIDE_MS + LOADER_HOLD_MS + LOADER_SLIDE_MS);

    return () => {
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
      clearTimeout(exitAt);
      clearTimeout(offAt);
    };
  }, [location.pathname, runScrollSyncTo]);

  useEffect(() => {
    document.documentElement.classList.toggle("app-loader-active", loaderPhase !== "off");
  }, [loaderPhase]);

  /** Refine preset rgb from real anchors while overlay covers the swap (overrides wrong fallback edge cases). */
  useLayoutEffect(() => {
    if (loaderPhase === "off" || isHomeRoute) {
      return;
    }
    const vh = viewport.height || window.innerHeight;
    const fromDom = computePrimaryWeightFromAnchors(window.scrollY, vh);
    if (fromDom === null) {
      return;
    }
    const vwDom = { width: window.innerWidth, height: window.innerHeight };
    setNonHomePrimaryWeight(fromDom);
    setShellBgOverride(shellBackgroundRgbFromToneWeight(fromDom, vwDom));
  }, [loaderPhase, isHomeRoute, location.pathname, viewport.height]);

  /** Match scroll-driven weight before dropping overlay so rgb does not pop after exit. */
  useLayoutEffect(() => {
    if (loaderPhase !== "off" || isHomeRoute) {
      return;
    }
    const vh = viewport.height || window.innerHeight;
    const w =
      computePrimaryWeightFromAnchors(window.scrollY, vh) ??
      getFallbackPrimaryWeightForPathname(location.pathname);
    setNonHomePrimaryWeight(w);
    setShellBgOverride(null);
  }, [loaderPhase, isHomeRoute, location.pathname, viewport.height]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (loaderPhase === "off") {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
      const rootClear = document.getElementById("root");
      if (rootClear) {
        rootClear.style.backgroundColor = "";
      }
      return undefined;
    }

    const vwBg = { width: window.innerWidth, height: window.innerHeight };
    const bg =
      shellBgOverride ??
      presetShellBgForPathname(location.pathname, vwBg);
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.backgroundColor = bg;
    }
    return undefined;
  }, [loaderPhase, shellBgOverride, location.pathname]);

  useEffect(() => {
    if (isHomeRoute) {
      return;
    }

    const updateLayoutPhase = () => {
      const stableViewportHeight = viewport.height || window.innerHeight;
      setScrollY(window.scrollY);

      const w = computePrimaryWeightFromAnchors(window.scrollY, stableViewportHeight);
      if (w === null) {
        setNonHomePrimaryWeight(getFallbackPrimaryWeightForPathname(location.pathname));
        return;
      }
      setNonHomePrimaryWeight(w);
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
  }, [isHomeRoute, location.pathname, viewport.height]);

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

  const routePageShellStyle = useMemo(() => {
    if (isHomeRoute || !nonHomeStyles?.shell) {
      return undefined;
    }
    if (shellBgOverride) {
      return { ...nonHomeStyles.shell, backgroundColor: shellBgOverride };
    }
    return nonHomeStyles.shell;
  }, [isHomeRoute, nonHomeStyles, shellBgOverride]);

  // Show coming soon page
  if (SHOW_COMING_SOON) {
    return (
      <NavigationTransitionContext.Provider value={navigationContextValue}>
        <>
          {loaderPhase !== "off" && <AppLoader phase={loaderPhase} />}
          {loaderPhase === "off" && <ComingSoon />}
        </>
      </NavigationTransitionContext.Provider>
    );
  }

  // Normal site: main app stays mounted so route view can sit under the loader; scroll-to-top runs in sync
  return (
    <NavigationTransitionContext.Provider value={navigationContextValue}>
      <>
        {loaderPhase !== "off" && <AppLoader phase={loaderPhase} />}
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
        <div style={routePageShellStyle}>
          <AppRouter routes={routes} />
          {!isHomeRoute && <Footer />}
        </div>
      </Fragment>
      </>
    </NavigationTransitionContext.Provider>
  );
}
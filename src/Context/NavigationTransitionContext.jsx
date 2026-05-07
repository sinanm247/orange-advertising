import { createContext, useContext } from "react";

/* Context-only module: hook + provider live together for navigation transitions. */
/* eslint-disable react-refresh/only-export-components */

const NavigationTransitionContext = createContext(null);

export function useNavigationTransition() {
  return useContext(NavigationTransitionContext);
}

export default NavigationTransitionContext;

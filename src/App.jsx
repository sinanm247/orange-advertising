import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppLoader from './Components/AppLoader/AppLoader';
import AppRouter from './Components/AppRouter/AppRouter';
import routes from './Routes/Routes';
import ComingSoon from './Components/ComingSoon/ComingSoon';

// Set to true to show coming soon page, false for normal site
const SHOW_COMING_SOON = false;

export default function App() {
  const location = useLocation();
  const [ pageLoading, setPageLoading ] = useState(true);

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 1500); // Adjust loader duration

    return () => clearTimeout(timeout);
  }, [location.pathname]);

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
            <AppRouter routes={routes} />
            {/* <Footer /> */}
          </Fragment>
        )}
    </>
  );
}
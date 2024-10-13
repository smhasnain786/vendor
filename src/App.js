/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import Themeroutes from './routes/Router';
// import Routes from './routes/Router.js';
import { ProfileProvider } from './components/contextProvider/index';
import { LogoutAfterTokenExpire } from './context/logout';

const App = () => {
  const routing = useRoutes(Themeroutes); // React Router routing
  const direction = useSelector((state) => state.customizer.isRTL); // Redux state for RTL
  const isMode = useSelector((state) => state.customizer.isDark); // Redux state for Dark mode

  return (
    <Suspense fallback={<Loader />}> {/* Suspense to handle lazy loading */}
      <LogoutAfterTokenExpire> {/* Handles logout after token expires */}
        <ProfileProvider> {/* Provides profile context to the app */}
          <div
            className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
            dir={direction ? 'rtl' : 'ltr'}
          >
            <ThemeSelector /> {/* Component for theme selection */}
            {routing} {/* React Router routes */}
           
          </div>
        </ProfileProvider>
      </LogoutAfterTokenExpire>
      <Toaster /> {/* Toaster for displaying notifications */}
    </Suspense>
  );
};

export default App;

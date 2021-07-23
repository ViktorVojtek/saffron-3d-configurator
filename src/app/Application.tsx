import React, { StrictMode, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

import { useLocale, useDynamicLangActivate } from './hooks';
import { StoreProvider } from './hooks/useStore/store';
import { LoadingProvider } from './hooks/useIsLoading';
import { NavigationProvider } from './hooks/useNavigation';
import { ModelStateProvider } from './hooks/useModelState';
import GlobalStyle from './components/styled/Global';
import Configurator from './pages/Configurator';
import Summary from './pages/Summary';


export default function App() {
  const locale = useLocale();

  useEffect(() => {
    useDynamicLangActivate(locale || 'en');
  }, [locale]);

  return (
    <StrictMode>
      <GlobalStyle />
      <I18nProvider i18n={i18n}>
        <StoreProvider>
          <LoadingProvider>
            <NavigationProvider>
              <ModelStateProvider>
                <Router>
                  <Switch>
                    <Route path="/summary">
                      <Summary />
                    </Route>
                    <Route path="/">
                      <Configurator />
                    </Route>
                  </Switch>
                </Router>
              </ModelStateProvider>
            </NavigationProvider>
          </LoadingProvider>
        </StoreProvider>
      </I18nProvider>
    </StrictMode>
  );
}

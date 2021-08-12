import React, { StrictMode, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useLocale, useDynamicLangActivate } from './hooks';
import { CameraProvider } from './hooks/useCamera';
import { ControlsProvider } from './hooks/useControls';
import { StoreProvider } from './hooks/useStore/store';
import { LoadingProvider } from './hooks/useLoading';
import { NavigationProvider } from './hooks/useNavigation';
import { ModelStateProvider } from './hooks/useModelState';
import { RendererProvider } from './hooks/useRenderer';
import { SceneProvider } from './hooks/useScene';
import { ScreenshotsProvider } from './hooks/useTakeScreenshot';
import { ThemeProvider } from 'styled-components';
import { defaultTheme as theme } from './components/styled/theme';
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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <I18nProvider i18n={i18n}>
          <StoreProvider>
            <LoadingProvider>
              <Router>
                <Switch>
                  <Route path="/summary">
                    <ScreenshotsProvider>
                      <Summary />
                    </ScreenshotsProvider>
                  </Route>
                  <Route path="/">
                    <NavigationProvider>
                      <ModelStateProvider>
                        <CameraProvider>
                          <RendererProvider>
                            <SceneProvider>
                              <ControlsProvider>
                                <Configurator />
                              </ControlsProvider>
                            </SceneProvider>
                          </RendererProvider>
                        </CameraProvider>
                      </ModelStateProvider>
                    </NavigationProvider>
                  </Route>
                </Switch>
              </Router>
            </LoadingProvider>
          </StoreProvider>
        </I18nProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

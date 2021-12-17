import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';

import createEmotionCache from '../utils/createEmotionCache';
import OrderProvider from '../providers/OrderProvider';
import AuthProvider from '../providers/AuthProvider';
import Navigation from '../components/AppBar';
import PageWrapper from '../components/PageWrapper';
import PageContent from '../components/PageContent';

import theme from '../styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Change title in _app.tsx</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OrderProvider>
              <CssBaseline />
              <PageWrapper>
                <Navigation />
                <PageContent>
                  <Component {...pageProps} />
                </PageContent>
              </PageWrapper>
            </OrderProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

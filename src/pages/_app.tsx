import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { Analytics } from '@vercel/analytics/react';
import 'styles/quill.snow.css';

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <ChakraProvider>
      <Seo />
        {isMounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      <Analytics />
    </ChakraProvider>
  )
}

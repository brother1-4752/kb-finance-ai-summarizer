import { Global, ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/Layout/Layout'
import theme from '@/styles/theme'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KB Finance AI Summarizer</title>
      </Head>

      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

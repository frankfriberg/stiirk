import '../styles/globals.css'
import type { AppProps } from 'next/app'

function StiirkApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default StiirkApp

import type { Session } from 'next-auth'
import type { AppType } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { trpc } from '../utils/trpc'

import '../styles/globals.css'

const StiirkApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(StiirkApp)

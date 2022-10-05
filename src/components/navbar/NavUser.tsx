import { signIn, signOut, useSession } from 'next-auth/react'

export const NavUser = () => {
  const session = useSession()

  return (
    <div>
      {session.data ? (
        <div>
          <p>{session.data.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}

import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession, signIn } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const LoginPage: NextPage = () => {
  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <a href="/signup">Don&apost have a user? Sign up here.</a>
    </div>
  )
}

export default LoginPage

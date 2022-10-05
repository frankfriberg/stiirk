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

const SignUp: NextPage = () => {
  return (
    <div>
      <button onClick={() => signIn('google')}>Sign up with Google</button>
      <button onClick={() => signIn('facebook')}>Sign up with Facebook</button>
    </div>
  )
}

export default SignUp

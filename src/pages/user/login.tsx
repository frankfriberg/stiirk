import { zodResolver } from '@hookform/resolvers/zod'
import Button from 'components/common/Button'
import Form from 'components/common/form/Form'
import FormInput from 'components/common/form/FormInput'
import { loginSchema, LoginSchema } from 'lib/validation/user'
import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DollarSign, Facebook } from 'react-feather'
import { SubmitHandler, useForm } from 'react-hook-form'

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
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const loginSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const { username, password } = data
    const response = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    })

    if (response) {
      if (response.error) {
        setError(response.error)
      } else {
        setError(null)
      }

      if (response.url) router.push(response.url)
    }

    return
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <Form<LoginSchema> methods={methods} onSubmit={loginSubmit}>
        <FormInput name="username" label="Username" />
        <FormInput name="password" label="Password" type="password" />
        <Button type="submit">Sign In</Button>
      </Form>

      <Button icon={DollarSign} callback={() => signIn('google')}>
        Sign in with Google
      </Button>
      <Button icon={Facebook} callback={() => signIn('facebook')}>
        Sign in with Facebook
      </Button>
      <Link href="/user/new">Don&#39;t have a user? Register here.</Link>
    </div>
  )
}

export default LoginPage

import { zodResolver } from '@hookform/resolvers/zod'
import Button from 'components/common/Button'
import Form from 'components/common/form/Form'
import FormInput from 'components/common/form/FormInput'
import useDebounce from 'hooks/useDebounce'
import { RegisterSchema, registerSchema } from 'lib/validation/user'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { unstable_getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { DollarSign, Facebook } from 'react-feather'
import { SubmitHandler, useForm } from 'react-hook-form'
import { trpc } from 'utils/trpc'
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  }
}

const Register = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const methods = useForm<RegisterSchema>({
    defaultValues: {
      name: session?.user.name ? session.user.name : undefined,
    },
    resolver: zodResolver(registerSchema),
  })

  const username = methods.watch('username')
  const debouncedUsername = useDebounce<string>(username, 1500)
  const { error } = methods.getFieldState('username', methods.formState)

  trpc.useQuery(['user.check_username', debouncedUsername], {
    enabled: Boolean(username),
    onSuccess(data) {
      if (!data) {
        return methods.setError('username', {
          type: 'custom',
          message: 'Username not available.',
        })
      }
      if (error?.type == 'custom') methods.clearErrors('username')
    },
  })

  const { mutateAsync } = trpc.useMutation(['user.register'])

  const RegisterSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const result = await mutateAsync({ id: session?.user.id, data: data })
    if (result.status === 201) router.push('/')
  }

  return (
    <div>
      <Form<RegisterSchema> methods={methods} onSubmit={RegisterSubmit}>
        <FormInput
          name="username"
          label="Username"
          options={{
            onChange: () => methods.trigger('username'),
          }}
        />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="confirm" label="Confirm Password" type="password" />
        <Button type="submit">
          {methods.formState.isSubmitting
            ? 'Registering new user...'
            : 'Register'}
        </Button>
      </Form>

      <Button icon={DollarSign} callback={() => signIn('google')}>
        Sign up with Google
      </Button>
      <Button icon={Facebook} callback={() => signIn('facebook')}>
        Sign up with Facebook
      </Button>
    </div>
  )
}

export default Register

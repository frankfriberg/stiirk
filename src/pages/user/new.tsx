import Button from 'components/common/Button'
import Input from 'components/common/Input'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { DollarSign, Facebook } from 'react-feather'

const NewUserPage: NextPage = () => {
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (event: React.SyntheticEvent, email: string) => {
    event.preventDefault()
    const user = await signIn('email', { redirect: false, email: email })

    console.log(user)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, email)}>
        <Input
          name="email"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Button type="submit">Register New User</Button>
      </form>
      <Button icon={DollarSign} callback={() => signIn('google')}>
        Sign in with Google
      </Button>
      <Button icon={Facebook} callback={() => signIn('facebook')}>
        Sign in with Facebook
      </Button>
    </div>
  )
}

export default NewUserPage

import { NavBar } from 'components/navbar/NavBar'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <Link href="/exercises">Exercises</Link>
      <Link href="/daily">Daily</Link>
      <Link href="/workouts">Workouts</Link>
    </div>
  )
}

export default Home

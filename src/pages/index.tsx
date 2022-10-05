import { NavBar } from 'components/navbar/NavBar'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <Link href="/exercises">
        <a>Exercises</a>
      </Link>
      <Link href="/daily">
        <a>Daily</a>
      </Link>
      <Link href="/workouts">
        <a>Workouts</a>
      </Link>
    </div>
  )
}

export default Home

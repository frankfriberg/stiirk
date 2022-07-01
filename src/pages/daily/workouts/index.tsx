import dbConnect from 'lib/dbConnect'
import { getAllDailyWorkouts } from 'modules/daily/daily.controller'
import { HydratedDocument } from 'mongoose'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { DailyWorkout } from 'types/daily.types'

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect()
  const data = await getAllDailyWorkouts()
  const workouts = await data.json()

  return {
    props: { workouts },
  }
}

type DailyWorkoutProps = {
  workout: HydratedDocument<DailyWorkout>
}

const DailyWorkoutsComponent = ({ workout }: DailyWorkoutProps) => {
  return (
    <li>
      <Link href={`/workouts/${workout.id}`}>
        <a>
          <h2>{workout.title}</h2>
          <p>{workout.numberOfExercises}</p>
        </a>
      </Link>
    </li>
  )
}

export default function DailyWorkoutsIndex({
  workouts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Workouts</h1>
      <Link href="workouts/new">
        <button type="button">Create New workout</button>
      </Link>
      <ul>
        {workouts.map((workout: HydratedDocument<DailyWorkout>) => (
          <DailyWorkoutsComponent key={workout.id} workout={workout} />
        ))}
      </ul>
    </div>
  )
}

import dbConnect from 'lib/dbConnect'
import { getAllExercises } from 'modules/exercise/exercise.controller'
import { HydratedDocument } from 'mongoose'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { Exercise } from 'types/exercise.types'

interface ExerciseProps {
  exercise: HydratedDocument<Exercise>
}

export const getServerSideProps: GetServerSideProps<{
  exercises: Array<HydratedDocument<Exercise>>
}> = async () => {
  await dbConnect()
  const data = await getAllExercises()
  const exercises = await data.json()

  return {
    props: { exercises },
  }
}

const ExerciseComponent = ({ exercise }: ExerciseProps) => {
  return (
    <li>
      <Link href={`/exercises/${exercise.slug}`}>
        <a>
          <h2>{exercise.title}</h2>
          <span>{exercise.force}</span>
          {exercise.primary?.map((muscle: string) => (
            <span key={exercise._id.toString() + muscle}>{muscle}</span>
          ))}
        </a>
      </Link>
    </li>
  )
}

export default function ExercisesIndex({
  exercises,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Exercises</h1>
      <Link href="exercises/new">
        <button type="button">Create New Exercise</button>
      </Link>
      <ul>
        {exercises.map((exercise) => {
          return <ExerciseComponent key={exercise.id} exercise={exercise} />
        })}
      </ul>
    </div>
  )
}

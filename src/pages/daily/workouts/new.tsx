import DailyWorkoutForm from 'components/DailyWorkoutForm'
import dbConnect from 'lib/dbConnect'
import { getAllExercises } from 'modules/exercise/exercise.controller'
import { HydratedDocument } from 'mongoose'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Exercise } from 'types/exercise.types'

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

const DailyWorkoutNew = ({
  exercises,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <DailyWorkoutForm method="POST" exercises={exercises} />
    </>
  )
}

export default DailyWorkoutNew

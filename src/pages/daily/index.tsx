import DailyForm from 'components/DailyForm/DailyForm'
import ExerciseContext from 'components/ExerciseContext'
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

const DailyIndex = ({
  exercises,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ExerciseContext.Provider value={exercises}>
      <div className="p-6 prose bg-slate-100">
        <h1>Create new Daily</h1>
        <DailyForm method="POST" />
      </div>
    </ExerciseContext.Provider>
  )
}

export default DailyIndex

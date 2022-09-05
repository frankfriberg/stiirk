import { Exercise } from '@prisma/client'
import DailyForm from 'components/DailyForm/DailyForm'
import ExerciseContext from 'components/ExerciseContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { trpc } from 'utils/trpc'

// export const getServerSideProps: GetServerSideProps<{
//   exercises: Exercise[]
// }> = async () => {

//   return {
//     props: { exercises },
//   }
// }

const DailyIndex = () => {
  const { data } = trpc.useQuery(['exercise.getAll'])
  const exercises = data ? data : []
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

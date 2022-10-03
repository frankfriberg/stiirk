import DailyForm from 'components/daily/DailyForm'
import ExerciseContext from 'context/exerciseContext'
import { trpc } from 'utils/trpc'

// export const getServerSideProps: GetServerSideProps<{
//   exercises: Exercise[]
// }> = async () => {

//   return {
//     props: { exercises },
//   }
// }

const DailyIndex = () => {
  return (
    <div className="p-6 prose bg-slate-100">
      <h1>Create new Daily</h1>
      <DailyForm />
    </div>
  )
}

export default DailyIndex

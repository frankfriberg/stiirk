import { getExerciseBySlug } from 'modules/exercise/exercise.controller'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ExerciseForm from 'components/ExerciseForm'
import dbConnect from 'lib/dbConnect'

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect()
  const slug: string = context.params!.slug as string
  const data: any = await getExerciseBySlug({ slug: slug })

  if (data.statusCode == 404) {
    return {
      notFound: true,
    }
  }

  const exercise = await data.json()

  return {
    props: {
      exercise,
    },
  }
}

export default function ExerciseEdit({
  exercise,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{exercise.title}</h1>
      <ExerciseForm exerciseFill={exercise} put={true} />
    </div>
  )
}

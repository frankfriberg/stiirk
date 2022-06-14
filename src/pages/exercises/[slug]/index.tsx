import dbConnect from 'lib/dbConnect'
import { getExerciseBySlug } from 'modules/exercise/exercise.controller'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect()
  const slug: string = context.params!.slug as string
  const data: any = await getExerciseBySlug({ slug: slug })
  const exercise = await data.json()

  if (!exercise)
    return {
      notFound: true,
    }

  return {
    props: {
      exercise,
    },
  }
}

export default function ExerciseSlug({
  exercise,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{exercise.title}</h1>
}

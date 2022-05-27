// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

enum ExerciseForceEnum {
  Push = 'push',
  Pull = 'pull',
}

interface DatabaseExercise {
  title: string
  slug: string
  primary: string[]
  secondary: string[]
  force: ExerciseForceEnum
}

interface StoredDailyExercise {
  exercise: DatabaseExercise
  max: number
  min: number
  leftright: boolean
}

interface StoredWorkout {
  title: string
  numberOfExercises: number
  exercises: StoredDailyExercise[]
}

interface DailyWorkoutSettings {
  maxReps: number
  startReps: number
  maxSets: number
  repRatio: number[]
}

const databaseExercises: DatabaseExercise[] = [
  {
    title: 'Push Up',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
  {
    title: 'Pull Up',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
  {
    title: 'Reverse Crunch',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
  {
    title: 'Diamond Push Up',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
  {
    title: 'Skullcrusher',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
  {
    title: 'Superman',
    slug: 'pushup',
    primary: ['Pectoralis Major - Sternal'],
    secondary: [
      'Pectoralis Major - Clavicular',
      'Deltoid - Anterior',
      'Tricps Branchii',
    ],
    force: ExerciseForceEnum.Push,
  },
]

const storedWorkout: StoredWorkout = {
  title: 'Test Workout',
  numberOfExercises: 6,
  exercises: [
    {
      exercise: databaseExercises[0],
      max: 20,
      min: 10,
      leftright: false,
    },
    {
      exercise: databaseExercises[1],
      max: 10,
      min: 4,
      leftright: false,
    },
    {
      exercise: databaseExercises[2],
      max: 20,
      min: 10,
      leftright: false,
    },
    {
      exercise: databaseExercises[3],
      max: 20,
      min: 10,
      leftright: false,
    },
    {
      exercise: databaseExercises[4],
      max: 15,
      min: 5,
      leftright: false,
    },
    {
      exercise: databaseExercises[5],
      max: 15,
      min: 5,
      leftright: false,
    },
  ],
}

interface ReturningExercise {
  name: string
  reps: number[]
}

interface ReturningWorkout {
  title: string
  numberOfExercises: number
  todaysReps: number
  exercises: ReturningExercise[]
}

const storedSets = [storedWorkout, storedWorkout, storedWorkout, storedWorkout]

const dailySettings: DailyWorkoutSettings = {
  startReps: 35,
  maxReps: 20,
  maxSets: 3,
  repRatio: [40, 34, 26],
}

const getExercisesAmount = (sets: number, maxSets: number) =>
  sets > maxSets * 2 ? sets / maxSets : sets / 2

const getExercisesReps = (exercisesAmount: number, reps: number) =>
  reps / Math.round(exercisesAmount)

const getRepRatio = (
  exercise: StoredDailyExercise,
  reps: number,
  maxReps: number
) => (exercise.max / maxReps) * reps

function getTodaysReps(
  date: string,
  startReps: number,
  numberOfExercises: number
) {
  const startDate = new Date(date).getTime()
  const today = new Date().getTime()
  const daysDifference = Math.floor((today - startDate) / (1000 * 3600 * 24))

  return {
    todaysReps: daysDifference + startReps,
    todaysSet: daysDifference % numberOfExercises,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturningWorkout>
) {
  // TODO: Change to require slug instead of date
  // const slug = req.query.slug as string
  const date = req.query.date as string

  // TODO: Get dailySettings, storedSets and other data

  const { todaysReps, todaysSet } = getTodaysReps(
    date,
    dailySettings.startReps,
    storedWorkout.numberOfExercises
  )
  const set = storedSets[todaysSet]
  const setsAmount = Math.round(todaysReps / dailySettings.maxReps)

  const exercisesAmount = Math.round(
    getExercisesAmount(setsAmount, dailySettings.maxSets)
  )
  const exercisesReps = getExercisesReps(exercisesAmount, todaysReps)
  const exerciseSets = Math.round(setsAmount / exercisesAmount)
  const workout: ReturningWorkout = {
    title: set.title,
    numberOfExercises: exercisesAmount,
    todaysReps: todaysReps,
    exercises: [],
  }

  for (let i = 0; i < exercisesAmount; i++) {
    const dailyExercise = set.exercises[i]
    const exercise = dailyExercise.exercise
    const exerciseRepRatio = getRepRatio(
      dailyExercise,
      exercisesReps,
      dailySettings.maxReps
    )
    const exerciseReps = Math.round(exerciseRepRatio / exerciseSets)

    const reps: number[] = []
    for (const ratio of dailySettings.repRatio) {
      const calcReps = Math.round((exerciseRepRatio / 100) * ratio)
      reps.push(calcReps < dailyExercise.min ? dailyExercise.min : calcReps)
    }

    workout.exercises.push({
      name: dailyExercise.leftright ? `LR ${exercise.title}` : exercise.title,
      reps: reps,
    })
  }

  res.status(200).json(workout)
}

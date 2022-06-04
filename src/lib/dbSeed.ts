import dbConnect from './dbConnect'
import { ExerciseModel } from 'models/exercise.model'
import { DailyModel, DailyWorkoutModel } from 'models/daily.model'
import { Exercise, ExerciseForceEnum } from 'types/exercise.types'
import { Daily, DailyWorkout } from 'types/daily.types'

async function seedExercises(): Promise<Exercise[] | null> {
  return ExerciseModel.insertMany([
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
  ])
    .then((exercises) => {
      console.log(`Seeded ${exercises.length} exercises`)
      return exercises
    })
    .catch((error) => error)
}

async function seedWorkouts(
  exercises: Exercise[]
): Promise<DailyWorkout | null> {
  const workoutExercises = []

  for (const exercise of exercises) {
    workoutExercises.push({
      exercise: exercise._id,
      max: Math.random() * 30 + 10,
      min: Math.random() * 10 + 1,
      leftright: Math.random() ? true : false,
    })
  }

  return DailyWorkoutModel.create({
    title: 'Test Workout',
    numberOfExercises: 6,
    exercises: workoutExercises,
  })
    .then((workout) => {
      console.log(`Seeded Workout: ${workout.title}`)
      return workout
    })
    .catch((error) => error)
}

export async function seedDaily(): Promise<Daily | null> {
  const seededExercises = await seedExercises()
  if (seededExercises != null) {
    const seededWorkout = await seedWorkouts(seededExercises)

    return DailyModel.create({
      slug: 'testdaily',
      startDate: new Date('2022-04-18'),
      settings: {
        startReps: 35,
        maxReps: 20,
        maxSets: 3,
        repRatio: [40, 34, 26],
      },
      workouts: [
        seededWorkout,
        seededWorkout,
        seededWorkout,
        seededWorkout,
        seededWorkout,
      ],
    }).then((daily) => {
      console.log(`Seeded daily: ${daily.slug}`)
      return daily
    })
  }
  return null
}

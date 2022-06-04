import { Daily, DailyExercise, ReturnedDailyWorkout } from 'types/daily.types'

const getExercisesAmount = (sets: number, maxSets: number) =>
  sets > maxSets * 2 ? sets / maxSets : sets / 2

const getExercisesReps = (exercisesAmount: number, reps: number) =>
  reps / Math.round(exercisesAmount)

const getRepRatio = (exercise: DailyExercise, reps: number, maxReps: number) =>
  (exercise.max / maxReps) * reps

function getTodaysReps(date: Date, startReps: number, numberOfSets: number) {
  const startDate = date.getTime()
  const today = new Date().getTime()
  const daysDifference = Math.floor((today - startDate) / (1000 * 3600 * 24))

  return {
    todaysNumber: daysDifference,
    todaysReps: daysDifference + startReps,
    todaysSet: daysDifference % numberOfSets,
  }
}

async function createDaily(daily: Daily): Promise<ReturnedDailyWorkout> {
  const { workouts, settings } = daily
  const { todaysNumber, todaysReps, todaysSet } = getTodaysReps(
    daily.startDate,
    settings.startReps,
    workouts.length
  )
  const todaysWorkout = workouts[todaysSet]
  const setsAmount = Math.round(todaysReps / settings.maxReps)
  const exercisesAmount = Math.round(
    getExercisesAmount(setsAmount, settings.maxSets)
  )
  const exercisesReps = getExercisesReps(exercisesAmount, todaysReps)
  // const exerciseSets = Math.round(setsAmount / exercisesAmount)
  const workout: ReturnedDailyWorkout = {
    title: todaysWorkout.title,
    numberOfExercises: exercisesAmount,
    todaysReps: todaysReps,
    todaysNumber: todaysNumber,
    exercises: [],
  }

  for (let i = 0; i < exercisesAmount; i++) {
    const dailyExercise = todaysWorkout.exercises[i]
    const exercise = dailyExercise.exercise
    const exerciseRepRatio = getRepRatio(
      dailyExercise,
      exercisesReps,
      settings.maxReps
    )

    const reps: number[] = []
    for (const ratio of settings.repRatio) {
      const calcReps = Math.round((exerciseRepRatio / 100) * ratio)
      reps.push(calcReps < dailyExercise.min ? dailyExercise.min : calcReps)
    }

    workout.exercises.push({
      name: dailyExercise.leftright ? `LR ${exercise.title}` : exercise.title,
      reps: reps,
    })
  }

  return workout
}

export default createDaily

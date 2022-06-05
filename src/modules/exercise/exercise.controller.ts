import { ExerciseModel } from './exercise.model'
// TODO: #3 Add Exercise functionality to API
export async function addExercise() {}

export async function editExercise(id: string) {
  const exercise = await ExerciseModel.findByIdAndUpdate(id, {
    new: true,
  })

  if (!exercise) throw new Error(`Exercise ${id} not found.`)
}

export async function deleteExercise() {}

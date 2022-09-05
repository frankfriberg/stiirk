import { HydratedDocument } from 'mongoose'
import React from 'react'
import { Exercise } from 'types/exercise.types'

const ExerciseContext = React.createContext<
  Array<HydratedDocument<Exercise>> | []
>([])

export default ExerciseContext

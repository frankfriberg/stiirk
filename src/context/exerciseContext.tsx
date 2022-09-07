import { Exercise } from '@prisma/client'
import React from 'react'

const ExerciseContext = React.createContext<Array<Exercise> | []>([])

export default ExerciseContext

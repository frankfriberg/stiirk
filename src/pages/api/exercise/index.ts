import {
  createExercise,
  deleteAllExercises,
  listExercises,
} from 'modules/exercise/exercise.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: listExercises,
  post: createExercise,
  delete: deleteAllExercises,
})

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect()
//   const { method } = req
//   const { slug } = req.query
//   const data = req.body

//   switch (method) {
//     case 'GET':
//       return listExercises()
//         .then((exercises) => res.status(200).json(exercises))
//         .catch((error) => res.status(400).json(error))
//     case 'POST':
//       return createExercise(data)
//         .then((exercise) => res.status(201).json(exercise))
//         .catch((error) => res.status(error.code).json(error))
//     case 'DELETE':
//       return deleteAllExercises()
//         .then((message) => res.status(200).json(message))
//         .catch((error) => res.status(400).json(error))
//     default:
//       return res.status(400).json({ success: false })
//       break
//   }
// }

import { Types } from 'mongoose'

export interface StiirkDocument {
  _id: Types.ObjectId
  id: string
  createdAt: Date
  updatedAt: Date
}

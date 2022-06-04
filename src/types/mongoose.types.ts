import { Types } from 'mongoose'

export interface StiirkDocument {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

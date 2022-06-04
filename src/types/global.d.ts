import { Connection } from 'mongoose'

interface dbConnection extends Connection {
  conn: string
}

declare global {
  var mongoose = dbConnection
}

import { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

interface StiirkError {
  code: number
  time: string
  message: string
  validators?: { [key: string]: string }
}

export class ValidationError extends ApiError {
  validator: { [key: string]: string }
  constructor(
    statusCode: number,
    message: string,
    validator: { [key: string]: string }
  ) {
    super(statusCode, message)
    Object.setPrototypeOf(this, ValidationError.prototype)
    this.validator = validator
  }
}

function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiError ? exception.statusCode : 500
}

function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`
}

function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined
}

function getValidatiors(exception: unknown) {
  return exception instanceof ValidationError ? exception.validator : undefined
}

function isError(exception: unknown): exception is Error {
  return exception instanceof Error
}

export function apiErrorHandler(exception: unknown, res: NextApiResponse) {
  const timestamp = new Date().toISOString()

  const statusCode = getExceptionStatus(exception)
  const message = getExceptionMessage(exception)
  const stack = getExceptionStack(exception)
  const validators = getValidatiors(exception)

  const response: StiirkError = {
    code: statusCode,
    time: timestamp,
    message: message,
  }

  if (validators) response.validators = validators

  return res.status(statusCode).json(response)
}

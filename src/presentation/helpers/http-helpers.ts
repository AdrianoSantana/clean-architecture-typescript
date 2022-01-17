import { MissingParamError } from '../errors/missing-param-error'

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error
})
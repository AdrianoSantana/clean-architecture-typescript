import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { SignUpController } from './signUp'

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator
}
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provide', () => {
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const { sut } = makeSut()
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provide', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const { sut } = makeSut()
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provide', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }
    const { sut } = makeSut()
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provide', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    const { sut } = makeSut()
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provide', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})

import { SignUpController } from './signUp'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provides', () => {
    const httpRequest = {
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})

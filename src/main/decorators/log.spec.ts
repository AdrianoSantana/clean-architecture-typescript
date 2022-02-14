import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('LogControllerDecorator should call Controller Handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          body: {
            name: 'any_name',
          },
          statusCode: 200
        }
        return new Promise((resolve) => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
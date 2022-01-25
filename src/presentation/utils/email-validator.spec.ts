import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator', () => {
  test('Should return false if email validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    var isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if email validator returns true', () => {
    const sut = makeSut()
    var isValid = sut.isValid('valid_email@gmail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@gmail.com')
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})

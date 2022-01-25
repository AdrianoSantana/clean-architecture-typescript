import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(email: string): boolean {
    return true
  }
}))
describe('Email Validator', () => {
  test('Should return false if email validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    var isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if email validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    var isValid = sut.isValid('valid_email@gmail.com')
    expect(isValid).toBe(true)
  })
})

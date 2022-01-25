import { EmailValidatorAdapter } from "./email-validator"

describe('Email Validator', () => {
  test('Should return false if email validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    var isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})

import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hashedValue'))
    }
}))

const SALT = 12
const makeSut = () => {
    return new BcryptAdapter(SALT)
}
describe('bcrypt adapter', () => {
    test('Should call bcrypt with correct value', async() => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toBeCalledWith('any_value', SALT)
    })

    test('Should return a hash on success', async() => {
        const sut = makeSut()
        const hashedValue = await sut.encrypt('any_value')
        expect(hashedValue).toBe('hashedValue')
    })

    test('Should throw if bcrypt throws', async() => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
            () => {
              throw new Error()
            }
        )
        const promise = sut.encrypt('any_value')
        await expect(promise).rejects.toThrow()
    })
})
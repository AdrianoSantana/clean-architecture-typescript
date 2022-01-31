import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('bcrypt adapter', () => {
    test('Should call bcrypt with correct value', async() => {
        const SALT = 12
        const sut = new BcryptAdapter(SALT)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toBeCalledWith('any_value', SALT)
    })
})
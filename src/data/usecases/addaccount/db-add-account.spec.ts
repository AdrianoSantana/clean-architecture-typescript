import { AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('SignUp Controller', () => {
  test('Should call encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
      }
    }

    const encryptStub = new EncrypterStub()
    const sut = new DbAddAccount(encryptStub)

    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData: AddAccountModel = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
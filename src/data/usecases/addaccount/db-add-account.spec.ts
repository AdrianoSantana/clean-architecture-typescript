import { AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountRepository } from './db-add-account-protocol'

interface SutTypes {
  sut: DbAddAccount,
  encrypterStub: Encrypter,
  addAccountRepositoryStub: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = {
        email: 'any_email@mail.com',
        id: 'any_id',
        name: 'any_name',
        password: 'any_password'
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}
describe('SignUp Controller', () => {
  test('Should call encrypter with correct password', async () => {
    
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData: AddAccountModel = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should call add account repository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData: AddAccountModel = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password'
    })
  })
  
  test('Should throw if add account repository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData: AddAccountModel = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
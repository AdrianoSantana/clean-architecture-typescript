import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocol';


export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(addAccount.password)
    const account = await this.addAccountRepository.add(Object.assign({}, addAccount, { password: hashedPassword } ))
    return account
  }
}
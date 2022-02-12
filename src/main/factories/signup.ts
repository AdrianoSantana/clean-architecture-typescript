import { DbAddAccount } from '../../data/usecases/addaccount/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const SALT = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  return new SignUpController(emailValidator, addAccount)
}

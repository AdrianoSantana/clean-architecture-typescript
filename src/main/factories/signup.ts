import { DbAddAccount } from '../../data/usecases/addaccount/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log-mongo-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const SALT = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}

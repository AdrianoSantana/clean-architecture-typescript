import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
 })

 afterAll(async () => {
   await MongoHelper.disconnect()
 })

 beforeEach(async () => {
   const accountCollection = MongoHelper.getCollection('accounts')
   accountCollection.deleteMany({})
 })

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Any User',
        email: 'any_email@gmail.com',
        password: '123',
        password_confirmation: '123'
      })
      .expect(200)
  })
})
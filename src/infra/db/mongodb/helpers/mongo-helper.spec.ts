import { MongoHelper as sut } from './mongo-helper'

describe('Mongo helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let account = await sut.getCollection('accounts')
    expect(account).toBeTruthy()
    await sut.disconnect()
    account = await sut.getCollection('accounts')
    expect(account).toBeTruthy()    
  })
})
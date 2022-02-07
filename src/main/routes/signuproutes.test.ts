import request from 'supertest'
import app from '../config/app'

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
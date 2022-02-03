import request from 'supertest'
import app from '../../config/app'

describe('CORS Middleware', () => {
  app.post('/test_cors', (req, res) => {
    res.send()
  })
  test('Should enable CORS', async () => {
    await request(app)
      .get('/test_cors')
      .expect('acess-control-allow-origin', '*')
      .expect('acess-control-allow-headers', '*')
      .expect('acess-control-allow-methods', '*')
  })
})
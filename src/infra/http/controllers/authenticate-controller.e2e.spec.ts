import request from 'supertest'

import { App } from '@/main.ts'

describe('Authenticate (E2E)', async () => {
  const app = new App()
  await app.start()

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const response = await request(app.instance.server).get('/auth')

    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
  })
})

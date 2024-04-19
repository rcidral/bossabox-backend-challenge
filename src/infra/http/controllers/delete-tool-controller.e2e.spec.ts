import request from 'supertest'

import { App } from '@/main.ts'

import { prisma } from '../database/prisma/prisma.ts'

describe('Delete Tool (E2E)', async () => {
  const app = new App()
  await app.start()

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a tool', async () => {
    const tool = await prisma.tool.create({
      data: {
        title: 'google',
        link: 'https://google.com.br',
        description: 'The best search engine',
        tags: ['search', 'engine'],
      },
    })

    const tokenResponse = await request(app.instance.server).get('/auth')

    const response = await request(app.instance.server)
      .delete(`/tools/${tool.id}`)
      .set('Authorization', `Bearer ${tokenResponse.body.token}`)

    expect(response.status).toBe(200)
  })
})

import request from 'supertest'

import { App } from '@/main.ts'

import { prisma } from '../database/prisma/prisma.ts'

describe('Get Tools (E2E)', async () => {
  const app = new App()
  await app.start()

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get tools', async () => {
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
      .get('/tools')
      .set('Authorization', `Bearer ${tokenResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tool.id,
          title: tool.title,
          link: tool.link,
          description: tool.description,
          tags: tool.tags,
        }),
      ]),
    )

    const responseWithTag = await request(app.instance.server)
      .get('/tools?tag=engine')
      .set('Authorization', `Bearer ${tokenResponse.body.token}`)

    expect(responseWithTag.status).toBe(200)
    expect(responseWithTag.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tool.id,
          title: tool.title,
          link: tool.link,
          description: tool.description,
          tags: tool.tags,
        }),
      ]),
    )
  })
})

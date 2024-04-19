import request from 'supertest'

import { App } from '@/main.ts'

import { prisma } from '../database/prisma/prisma.ts'

describe('Create Tool (E2E)', async () => {
  const app = new App()
  await app.start()

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new tool', async () => {
    const toolData = {
      title: 'google',
      link: 'https://google.com.br',
      description: 'The best search engine',
      tags: ['search', 'engine'],
    }

    const tokenResponse = await request(app.instance.server).get('/auth')

    const response = await request(app.instance.server)
      .post('/tools')
      .send(toolData)
      .set('Authorization', `Bearer ${tokenResponse.body.token}`)

    expect(response.status).toBe(201)

    const tool = await prisma.tool.findFirst({
      where: { title: toolData.title },
    })

    expect(tool).toBeTruthy()
    expect(tool?.title).toBe(toolData.title)
    expect(tool?.link).toBe(toolData.link)
    expect(tool?.description).toBe(toolData.description)
    expect(tool?.tags).toEqual(toolData.tags)
  })
})

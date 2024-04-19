import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify'

import { type HttpMethods } from '@/core/types/http-methods.ts'
import { env } from '@/infra/env/index.ts'

import { type HttpRequest } from '../http-request.ts'
import { type HttpResponse } from '../http-response.ts'
import { type HttpServer } from '../http-server.ts'
import { FastifyHttpRequestAdapter } from './fastify-http-request-adapter.ts'
import { FastifyHttpResponseAdapter } from './fastify-http-response-adapter.ts'

export class FastifyAdapter implements HttpServer {
  app: FastifyInstance

  constructor() {
    this.app = fastify()
  }

  start(port: number, callback: () => void) {
    this.app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
      sign: {
        expiresIn: '60m',
      },
    })
    this.app.register(fastifyCookie)

    this.app.listen(
      {
        host: '0.0.0.0',
        port,
      },
      callback,
    )
  }

  async close() {
    await this.app.close()
  }

  async verifyJwt(request: HttpRequest) {
    try {
      await request.jwtVerify()
    } catch (error) {
      return false
    }

    return true
  }

  register(
    method: HttpMethods,
    url: string,
    handler: (request: HttpRequest, reply: HttpResponse) => Promise<void>,
    verifyJwt?: boolean,
  ) {
    this.app[method](
      url,
      async (request: FastifyRequest, reply: FastifyReply) => {
        const wrappedRequest = new FastifyHttpRequestAdapter(request)
        const wrappedResponse = new FastifyHttpResponseAdapter(reply)

        if (verifyJwt === true) {
          const isJwtValid = await this.verifyJwt(wrappedRequest)

          if (!isJwtValid) {
            return wrappedResponse.status(401).json({ message: 'Unauthorized' })
          }
        }

        await handler(wrappedRequest, wrappedResponse)
      },
    )
  }
}

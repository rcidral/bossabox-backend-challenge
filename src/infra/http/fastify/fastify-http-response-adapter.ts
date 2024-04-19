import { type FastifyReply } from 'fastify'

import { type HttpResponse } from '../http-response.ts'

export class FastifyHttpResponseAdapter implements HttpResponse {
  private response: FastifyReply

  constructor(response: FastifyReply) {
    this.response = response
  }

  json(data: object | undefined): this {
    this.response.send(data)
    return this
  }

  send(): this {
    this.response.send()
    return this
  }

  status(code: number): this {
    this.response.status(code)
    return this
  }

  jwtSign(data: object, { sign }: { sign: { sub: string } }): Promise<string> {
    return this.response.jwtSign(data, sign)
  }
}

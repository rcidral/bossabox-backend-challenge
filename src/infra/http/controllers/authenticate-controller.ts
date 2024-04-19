import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'

import { type HttpRequest } from '../http-request.ts'
import { type HttpResponse } from '../http-response.ts'

export class AuthenticateController {
  async execute(_: HttpRequest, res: HttpResponse) {
    const token = await res.jwtSign(
      { auth: 'user' },
      { sign: { sub: new UniqueEntityID().toString() } },
    )

    res.status(200).json({ token })
  }
}

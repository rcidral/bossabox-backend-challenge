import { type HttpMethods } from '@/core/types/http-methods.ts'

import { type HttpRequest } from './http-request.ts'
import { type HttpResponse } from './http-response.ts'

export interface HttpServer {
  app: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server: any
  }
  start(port: number, callback: () => void): void
  close(): Promise<void>
  verifyJwt(request: HttpRequest): Promise<boolean>
  register(
    method: HttpMethods,
    url: string,
    handler: (request: HttpRequest, reply: HttpResponse) => Promise<void>,
    verifyJwt?: boolean,
  ): void
}

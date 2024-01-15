import { type Request } from 'express'
import { type IHttpRequest } from './iHttpRequest'

export default class ExpressRequestAdapter implements IHttpRequest {
  constructor(readonly req: Request) {}

  get body(): any {
    return this.req.body
  }

  get params(): any {
    return this.req.params
  }

  get query(): any {
    return this.req.query
  }

  get headers(): any {
    return this.req.headers
  }
}

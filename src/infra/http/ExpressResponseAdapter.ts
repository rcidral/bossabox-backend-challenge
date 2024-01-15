import { type Response } from 'express'
import { type IHttpResponse } from './iHttpResponse'

export default class ExpressResponseAdapter implements IHttpResponse {
  constructor(readonly res: Response) {}

  send(data: any): this {
    this.res.send(data)
    return this
  }

  json(data: any): this {
    this.res.json(data)
    return this
  }

  status(code: number): this {
    this.res.status(code)
    return this
  }
}

export interface IHttpResponse {
  send(data: any): this
  json(data: any): this
  status(code: number): this
}

type Sign = {
  sign: {
    sub: string
  }
}

export interface HttpResponse {
  json(data: object | undefined): this
  send(): this
  status(code: number): this
  jwtSign(data: object, { sign }: Sign): Promise<string>
}

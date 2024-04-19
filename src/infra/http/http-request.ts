export interface HttpRequest {
  body: object | undefined
  query: {
    [key: string]: string
  }
  params: {
    [key: string]: string
  }
  jwtVerify(): Promise<void>
}

export interface IHttpServer {
  on(
    method: string,
    url: string,
    calback: (req: any, res: any, next: any) => void,
  ): void
  listen(port: number): void
  close(): void
}

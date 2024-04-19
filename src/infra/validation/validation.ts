export interface Validation<T> {
  validate: (input: object | undefined) => T
}

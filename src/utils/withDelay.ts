type AsyncFunction<T> = (
  resolve: (value: PromiseLike<T> | T) => void,
  reject: (reason?: unknown) => void
) => void

export function withDelay<T>(fn: AsyncFunction<T>, ms = 500): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        fn(resolve, reject)
      } catch (error) {
        reject(error)
      }
    }, ms)
  })
}

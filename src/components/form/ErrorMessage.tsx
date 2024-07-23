type ErrorMessageProps = {
  children?: string
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  if (!children) return null

  return <span className="text-sm text-destructive">{children}</span>
}

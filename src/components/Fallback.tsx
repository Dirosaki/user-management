import { LoaderCircle } from 'lucide-react'

export function FallbackLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoaderCircle className="animate-spin text-primary" size={32} />
    </div>
  )
}

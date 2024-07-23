import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../Button'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const isPasswordType = type === 'password'

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : type}
          className={cn(
            'peer flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isPasswordType && 'not-placeholder:pr-12',
            className
          )}
          {...props}
        />

        {!!isPasswordType && (
          <Button
            aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            className="absolute right-0 top-0 size-10 rounded-md text-muted-foreground transition-colors peer-placeholder-shown:hidden hover:bg-transparent hover:text-foreground focus-visible:text-foreground"
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

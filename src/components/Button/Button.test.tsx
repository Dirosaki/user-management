import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '.'

describe('Button', () => {
  test('should render the button with text', () => {
    render(<Button>Botão</Button>)

    expect(screen.getByText('Botão')).toBeInTheDocument()
  })

  test('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique aqui</Button>)

    const button = screen.getByText('Clique aqui')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('should render as a different component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#test">Link como botão</a>
      </Button>
    )

    const link = screen.getByText('Link como botão')
    expect(link.tagName).toBe('A')
  })
})

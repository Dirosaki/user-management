import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Switch } from '.'

describe('Switch Component', () => {
  it('should render the switch', () => {
    render(<Switch aria-label="Toggle switch" />)

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('should toggle the switch', () => {
    render(<Switch aria-label="Toggle switch" />)

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')

    fireEvent.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'checked')

    fireEvent.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })
})

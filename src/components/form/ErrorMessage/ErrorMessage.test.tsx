import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ErrorMessage } from '.'

describe('ErrorMessage', () => {
  test('should render the error message when children are provided', () => {
    render(<ErrorMessage>Validation error</ErrorMessage>)

    expect(screen.getByText('Validation error')).toBeInTheDocument()
  })

  test('should not render anything when children are not provided', () => {
    const { container } = render(<ErrorMessage />)

    expect(container.firstChild).toBeNull()
  })
})

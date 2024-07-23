import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Input } from '.'

describe('Input', () => {
  test('should render the input with the correct type', () => {
    render(<Input placeholder="Enter text" type="text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveAttribute('type', 'text')
  })

  test('should toggle password visibility', () => {
    render(<Input placeholder="Enter password" type="password" />)
    const button = screen.getByRole('button', { name: /Mostrar senha/i })
    const input = screen.getByPlaceholderText('Enter password')

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(button)
    expect(input).toHaveAttribute('type', 'text')

    fireEvent.click(button)
    expect(input).toHaveAttribute('type', 'password')
  })
})

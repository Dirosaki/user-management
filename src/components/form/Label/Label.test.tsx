import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, test } from 'vitest'

import { Label } from '.'

describe('Label', () => {
  test('should render the label with the correct text', () => {
    render(<Label>Test Label</Label>)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  test('should be accessible with ref', () => {
    const ref = createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Ref Label</Label>)

    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })
})

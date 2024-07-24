import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Badge } from '.'

describe('Badge', () => {
  test('should render the badge with text', () => {
    render(<Badge>Badge</Badge>)

    expect(screen.getByText('Badge')).toBeInTheDocument()
  })
})

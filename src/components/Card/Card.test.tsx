import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.'

describe('Card Components', () => {
  test('should render the Card with children', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
          <CardDescription>Descrição do Card</CardDescription>
        </CardHeader>
        <CardContent>Conteúdo do Card</CardContent>
        <CardFooter>Footer do Card</CardFooter>
      </Card>
    )

    expect(screen.getByText('Título do Card')).toBeInTheDocument()
    expect(screen.getByText('Descrição do Card')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument()
    expect(screen.getByText('Footer do Card')).toBeInTheDocument()
  })
})

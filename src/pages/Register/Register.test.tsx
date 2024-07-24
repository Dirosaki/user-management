import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { Register } from '.'

function RegisterWithRoutes() {
  return (
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )
}

describe('Register Component', () => {
  test('renders the register form with correct fields and labels', () => {
    render(<RegisterWithRoutes />)

    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument()
    expect(screen.getByText('Já possuí uma conta?')).toBeInTheDocument()
    expect(screen.getByText('Faça login')).toBeInTheDocument()
  })

  test('displays error messages when fields are invalid', async () => {
    render(<RegisterWithRoutes />)

    fireEvent.submit(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByText('O nome é obrigatório.')).toBeInTheDocument()
      expect(screen.getByText('O e-mail é obrigatório.')).toBeInTheDocument()
      expect(screen.getByText('A senha deve ter ao menos 6 caracteres.')).toBeInTheDocument()
    })
  })

  test('enables submit button when form is valid and shows spinner when submitting', async () => {
    render(<RegisterWithRoutes />)

    fireEvent.input(screen.getByLabelText('Nome completo'), { target: { value: 'Diego Gomes' } })
    fireEvent.input(screen.getByLabelText('E-mail'), { target: { value: 'softplan@example.com' } })
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: 'password123' } })

    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })

    expect(screen.queryByRole('button', { name: 'Cadastrar' })).not.toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('navigates to login page when the link is clicked', () => {
    render(<RegisterWithRoutes />)

    const loginLink = screen.getByText('Faça login')
    fireEvent.click(loginLink)

    expect(window.location.pathname).toBe('/login')
  })
})

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { Login } from '.'

function LoginWithRoutes() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
}

describe('Login Component', () => {
  test('renders the login form with correct fields and labels', () => {
    render(<LoginWithRoutes />)

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument()
    expect(screen.getByText('Não possuí uma conta?')).toBeInTheDocument()
    expect(screen.getByText('Cadastre-se')).toBeInTheDocument()
  })

  test('displays error messages when fields are invalid', async () => {
    render(<LoginWithRoutes />)

    fireEvent.submit(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(screen.getByText('O e-mail é obrigatório.')).toBeInTheDocument()
      expect(screen.getByText('A senha deve ter ao menos 6 caracteres.')).toBeInTheDocument()
    })
  })

  test('enables submit button when form is valid and shows spinner when submitting', async () => {
    render(<LoginWithRoutes />)

    fireEvent.input(screen.getByLabelText('E-mail'), { target: { value: 'example@example.com' } })
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: 'password123' } })

    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })

    expect(screen.queryByRole('button', { name: 'Entrar' })).not.toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('navigates to register page when the link is clicked', () => {
    render(<LoginWithRoutes />)

    const registerLink = screen.getByText('Cadastre-se')
    fireEvent.click(registerLink)

    expect(window.location.pathname).toBe('/register')
  })
})

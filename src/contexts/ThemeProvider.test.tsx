import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ThemeContext, ThemeProvider } from './ThemeProvider'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value || ''
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }),
})

describe('ThemeProvider Component', () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.className = ''
  })

  it('renders with default theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(context) => (
            <div>
              <span data-testid="theme-text">Current theme: {context.theme}</span>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )

    const themeText = screen.getByTestId('theme-text')
    expect(themeText).toBeInTheDocument()

    expect(
      document.documentElement.classList.contains('light') ||
        document.documentElement.classList.contains('dark')
    ).toBe(true)
  })

  it('renders with a specified default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeContext.Consumer>
          {(context) => (
            <div>
              <span data-testid="theme-text">Current theme: {context.theme}</span>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )

    const themeText = screen.getByTestId('theme-text')
    expect(themeText).toBeInTheDocument()
    expect(themeText.textContent).toBe('Current theme: dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('sets and retrieves theme from localStorage', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeContext.Consumer>
          {(context) => (
            <div>
              <button
                data-testid="set-dark-theme"
                type="button"
                onClick={() => context.setTheme('dark')}
              >
                Set Dark Theme
              </button>
              <span data-testid="theme-text">Current theme: {context.theme}</span>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )

    const themeText = screen.getByTestId('theme-text')
    expect(themeText).toBeInTheDocument()
    expect(themeText.textContent).toBe('Current theme: light')
    expect(document.documentElement.classList.contains('light')).toBe(true)

    act(() => {
      screen.getByTestId('set-dark-theme').click()
    })

    expect(themeText.textContent).toBe('Current theme: dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeContext.Consumer>
          {(context) => (
            <div>
              <span data-testid="theme-text">Current theme: {context.theme}</span>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )

    expect(themeText.textContent).toBe('Current theme: dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

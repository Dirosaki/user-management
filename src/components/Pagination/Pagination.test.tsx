import { Table } from '@tanstack/react-table'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '.'

const mockTable = (overrides = {}) =>
  ({
    getState: vi.fn(() => ({
      pagination: {
        pageIndex: 0,
      },
    })),
    getPageCount: vi.fn(() => 5),
    getCanPreviousPage: vi.fn(() => true),
    getCanNextPage: vi.fn(() => true),
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    setPageIndex: vi.fn(),
    ...overrides,
  }) as unknown as Table<{ id: string }>

describe('Pagination Component', () => {
  it('renders pagination component with correct page info and buttons', () => {
    render(<Pagination table={mockTable()} />)

    expect(screen.getByText('Página 1 de 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir para a primeira página')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir para a página anterior')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir para a próxima página')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir para a última página')).toBeInTheDocument()
  })

  it('calls the correct functions when buttons are clicked', () => {
    const mockFunctions = {
      getCanPreviousPage: vi.fn(() => true),
      getCanNextPage: vi.fn(() => true),
      previousPage: vi.fn(),
      nextPage: vi.fn(),
      setPageIndex: vi.fn(),
    }

    render(<Pagination table={mockTable(mockFunctions)} />)

    fireEvent.click(screen.getByLabelText('Ir para a página anterior'))
    expect(mockFunctions.previousPage).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Ir para a próxima página'))
    expect(mockFunctions.nextPage).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Ir para a primeira página'))
    expect(mockFunctions.setPageIndex).toHaveBeenCalledWith(0)

    fireEvent.click(screen.getByLabelText('Ir para a última página'))
    expect(mockFunctions.setPageIndex).toHaveBeenCalledWith(4)
  })
})

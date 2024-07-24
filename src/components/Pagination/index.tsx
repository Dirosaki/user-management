import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from '@/components/Button'

type PaginationProps<TData> = {
  table: Table<TData>
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <footer className="flex items-center justify-end space-x-4 py-4">
      <span className="flex items-center justify-center text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </span>

      <div className="flex items-center space-x-2">
        <Button
          aria-label="Ir para a primeira página"
          className="hidden size-8 p-0 md:flex"
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          aria-label="Ir para a página anterior"
          className="size-8 p-0"
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          onClick={() => table.previousPage()}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          aria-label="Ir para a próxima página"
          className="size-8 p-0"
          disabled={!table.getCanNextPage()}
          variant="outline"
          onClick={() => table.nextPage()}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          aria-label="Ir para a última página"
          className="hidden size-8 p-0 md:flex"
          disabled={!table.getCanNextPage()}
          variant="outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </footer>
  )
}

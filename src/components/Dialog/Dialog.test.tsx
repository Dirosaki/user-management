import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '.'

describe('Dialog Component', () => {
  test('should render dialog trigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const trigger = screen.getByText('Open Dialog')
    expect(trigger).toBeInTheDocument()
  })

  test('should open and close the dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogClose>Close Modal</DialogClose>
        </DialogContent>
      </Dialog>
    )

    const trigger = screen.getByText('Open Dialog')
    fireEvent.click(trigger)

    const title = screen.getByText('Dialog Title')
    const description = screen.getByText('Dialog Description')
    const closeButton = screen.getByText('Close Modal')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)
    expect(title).not.toBeInTheDocument()
  })
})

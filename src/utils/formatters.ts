export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))

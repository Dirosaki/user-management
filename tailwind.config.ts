import twScrollbar from 'tailwind-scrollbar'
import twAnimate from 'tailwindcss-animate'
import plugin from 'tailwindcss/plugin'
import { Config } from 'tailwindcss/types/config'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [
    twAnimate,
    twScrollbar,
    plugin(({ matchVariant }) => {
      matchVariant('not', (value) => `&:not(${value})`, {
        values: {
          disabled: ':disabled',
          checked: ':checked',
          placeholder: ':placeholder-shown',
        },
      })
    }),
  ],
} satisfies Config

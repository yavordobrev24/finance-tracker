import { render, screen } from '@testing-library/react'
import App from './App'

it('should have Vite test', () => {
  render(<App />)
  const message = screen.queryByText(/Vite/i)
  expect(message).toBeVisible()
})

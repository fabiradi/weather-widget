import { render, screen } from '@testing-library/react'
import App from './App'

test('renders "Open Weather Map" text', () => {
  render(<App />)
  const headerText = screen.getByText(/open weather map/i)
  expect(headerText).toBeInTheDocument()
})

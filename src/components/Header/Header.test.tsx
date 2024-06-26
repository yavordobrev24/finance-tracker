import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './Header'

describe('Header component', () => {
  beforeEach(() => {
    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))
  })

  it('should render correctly', () => {
    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    )

    expect(screen.getByText(/Finance Tracker/i)).toBeInTheDocument()
  })

  it('should display correct links when screen width is larger than 900px', () => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))

    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    )

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Transactions/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Transaction/i)).toBeInTheDocument()
  })

  it('should display menu button and menu items when screen width is smaller than 900px', () => {
    window.innerWidth = 800
    window.dispatchEvent(new Event('resize'))

    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    )

    const menuButton = screen.getByLabelText('Options')
    expect(menuButton).toBeInTheDocument()

    fireEvent.click(menuButton)

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Transactions/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Transaction/i)).toBeInTheDocument()
  })

  it('should navigate to correct routes', () => {
    window.innerWidth = 800
    window.dispatchEvent(new Event('resize'))

    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    )

    const menuButton = screen.getByLabelText('Options')
    fireEvent.click(menuButton)

    const dashboardLink = screen.getByText(/Dashboard/i)
    const transactionsLink = screen.getByText(/Transactions/i)
    const addTransactionLink = screen.getByText(/Add Transaction/i)

    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/')
    expect(transactionsLink.closest('a')).toHaveAttribute(
      'href',
      '/transactions'
    )
    expect(addTransactionLink.closest('a')).toHaveAttribute(
      'href',
      '/transactions/create'
    )
  })
})

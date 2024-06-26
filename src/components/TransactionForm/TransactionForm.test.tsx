import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import TransactionForm from './TransactionForm'
import { describe, it, expect } from 'vitest'

describe('TransactionForm', () => {
  it('should render form correctly', () => {
    let initState = {
      transactions: [],
      filteredTransactions: [],
      category: 'All',
    }
    const mockStore = configureMockStore()
    const store = mockStore(initState)
    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter>
            <TransactionForm />
          </MemoryRouter>
        </ChakraProvider>
      </Provider>
    )
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

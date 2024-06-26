import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import TransactionList from './TransactionList'

/*TESTS NOT WORKING*/
describe('TransactionList component', () => {
  it('should render transactions correctly', () => {
    let initState = {
      transactions: [],
      filteredTransactions: [],
      category: 'All',
    }
    const mockStore = configureStore()
    const store = mockStore(initState)

    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionList />
        </ChakraProvider>
      </Provider>
    )

    expect(screen.getByText(/Income/i)).toBeInTheDocument()
    expect(screen.getByText(/\$100\.00/i)).toBeInTheDocument()
    expect(screen.getByText(/Expense/i)).toBeInTheDocument()
    expect(screen.getByText(/\$50\.00/i)).toBeInTheDocument()
  })

  it('should show no transactions message when list is empty', () => {
    let initState = {
      transactions: [],
      filteredTransactions: [],
      category: 'All',
    }
    const mockStore = configureStore()
    const store = mockStore(initState)

    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionList />
        </ChakraProvider>
      </Provider>
    )

    expect(
      screen.getByText(/There are no transactions yet/i)
    ).toBeInTheDocument()
  })
})

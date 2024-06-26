import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import Summary from './Summary'
import configureStore from 'redux-mock-store'

/*TESTS NOT WORKING*/
describe('Summary', () => {
  it('should render correctly', () => {
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
          <Summary />
        </ChakraProvider>
      </Provider>
    )

    expect(screen.getByText(/Summary/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Income/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Expenses/i)).toBeInTheDocument()
    expect(screen.getByText(/Balance/i)).toBeInTheDocument()
  })
})

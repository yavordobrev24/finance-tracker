// TransactionDetails.test.jsx
import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TransactionDetails from './TransactionDetails'

/*TESTS NOT WORKING*/
describe('TransactionDetails', () => {
  it('should render transaction details correctly', () => {
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
          <MemoryRouter initialEntries={['/transactions/10']}>
            <Routes>
              <Route
                path="/transactions/:id"
                element={<TransactionDetails />}
              />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </Provider>
    )

    expect(screen.getByText(/Test Transaction/i)).toBeInTheDocument()
    expect(screen.getByText(/Type/i)).toBeInTheDocument()
    expect(screen.getByText(/salary/i)).toBeInTheDocument()
    expect(screen.getByText(/2023-06-25/i)).toBeInTheDocument()
    expect(screen.getByText(/\$100\.00/i)).toBeInTheDocument()
  })
})

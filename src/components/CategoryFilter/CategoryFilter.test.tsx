import { render, screen } from '@testing-library/react'
import CategoryFilter from './CategoryFilter'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

/*TESTS NOT WORKING*/
describe('CategoryFilter', () => {
  it('should render category All', () => {
    let initState = {
      transactions: [],
      filteredTransactions: [],
      category: 'All',
    }
    const mockStore = configureStore()
    const store = mockStore(initState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoryFilter />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByRole('combobox').tagName).toBe('SELECT')
  })
})

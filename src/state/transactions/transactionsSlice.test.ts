import { expect } from 'vitest'
import transactionsReducer, {
  changeCategory,
  initialState,
} from './transactionsSlice'
import { Transaction } from '../../types'

const mockTransactions: Transaction[] = [
  {
    id: 1,
    category: 'Food',
    description: 'Groceries',
    amount: -100,
    type: 'expense',
    date: '2024-06-26',
  },
  {
    id: 2,
    category: 'Bills',
    description: 'Electricity',
    amount: -50,
    type: 'expense',
    date: '2024-06-25',
  },
  {
    id: 3,
    category: 'Food',
    description: 'Restaurant',
    amount: -75,
    type: 'expense',
    date: '2024-06-24',
  },
]
describe('transactionSlice', () => {
  it('should set initialState correctly', () => {
    expect(transactionsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should update category and set filteredTransactions', () => {
    const state = {
      ...initialState,
      transactions: mockTransactions,
      category: 'Food',
    }

    const newState = transactionsReducer(state, changeCategory('All'))

    expect(newState.category).toBe('All')
    expect(newState.filteredTransactions).toEqual(mockTransactions)
  })
})

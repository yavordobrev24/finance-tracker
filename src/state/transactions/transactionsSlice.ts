import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types'

type TransactionsState = {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  category: string
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
  category: 'All',
}
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload
      if (action.payload == 'All') {
        state.filteredTransactions = state.transactions
      } else {
        state.filteredTransactions = state.transactions.filter(
          (transaction) => transaction.category == action.payload
        )
      }
    },
  },

})
export const { changeCategory } = transactionsSlice.actions
export default transactionsSlice.reducer

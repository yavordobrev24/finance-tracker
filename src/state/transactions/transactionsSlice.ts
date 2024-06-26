import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types'
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/react'

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
  extraReducers: (builder) => {
    builder.addCase(
      fetchTransactions.fulfilled,
      (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload
        if (state.category == 'All' || state.category == '')
          state.filteredTransactions = action.payload
        else
          state.filteredTransactions = action.payload.filter(
            (transaction) => transaction.category == state.category
          )
      }
    )

  },
})
export const fetchTransactions: AsyncThunk<Transaction[], void, {}> =
  createAsyncThunk('transactions/fetchTransactions', async () => {
    const response = await fetch('http://localhost:3000/transactions')
    const data: Transaction[] = await response.json()
    return data
  })
export const { changeCategory } = transactionsSlice.actions
export default transactionsSlice.reducer

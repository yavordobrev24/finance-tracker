import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Transaction, TransactionFormType } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit/react'

type TransactionsState = {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  category: string
}

export const initialState: TransactionsState = {
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
    builder.addCase(
      deleteTransaction.fulfilled,
      (state, action: PayloadAction<number>) => {
        console.log(action.payload)
        state.transactions = [
          ...state.transactions.filter(
            (transaction) => transaction.id != action.payload
          ),
        ]

        const transactionCategory = state.filteredTransactions.find(
          (transaction) => transaction.id == action.payload
        )?.category
        const sameCategoryTransactions = state.filteredTransactions.filter(
          (transaction) => transaction.category == transactionCategory
        )
        if (sameCategoryTransactions.length == 1) {
          state.category == 'All'
          state.filteredTransactions = state.transactions
        } else {
          state.filteredTransactions = [
            ...state.filteredTransactions.filter(
              (transaction) => transaction.id != action.payload
            ),
          ]
        }
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
export const addTransaction: AsyncThunk<
  Transaction[],
  TransactionFormType,
  {}
> = createAsyncThunk(
  'transactions/addTransaction',
  async (values: TransactionFormType) => {
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: values.description,
        amount: Number(values.amount),
        type: values.type,
        category: values.category,
        date: values.date,
      }),
    })
    const data = await response.json()
    return data
  }
)
export const deleteTransaction: AsyncThunk<number, number, {}> =
  createAsyncThunk(
    'transactions/deleteTransaction',
    async (transactionId: number) => {
      await fetch(`http://localhost:3000/transactions/${transactionId}`, {
        method: 'DELETE',
      })
      return transactionId
    }
  )
export const { changeCategory } = transactionsSlice.actions
export default transactionsSlice.reducer

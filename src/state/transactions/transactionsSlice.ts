import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types'

const initialState: Transaction[] = []

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
})

export default transactionsSlice.reducer

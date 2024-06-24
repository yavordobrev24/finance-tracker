import { configureStore } from '@reduxjs/toolkit'
import transactionsSlice from './transactions/transactionsSlice'

const store = configureStore({
  reducer: { transactions: transactionsSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

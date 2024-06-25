export type Transaction = {
  id: number
  description: string
  amount: number
  type: 'expense' | 'income'
  category: string
  date: string
}
export type TransactionFormType = {
  description: string
  amount: string
  type: string
  category: string
  date: string
}

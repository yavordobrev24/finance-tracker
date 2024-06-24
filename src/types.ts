export type Transaction = {
  id: number
  description: string
  amount: number
  type: 'expense' | 'income'
  category: string
  date: string
}

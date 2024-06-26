import { Select } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store'
// import { filterCategory } from '../../state/transactions/transactionsSlice'
import { useEffect, useState } from 'react'
import { changeCategory } from '../../state/transactions/transactionsSlice'

function CategoryFilter() {
  const { transactions, category } = useSelector(
    (state: RootState) => state.transactions
  )

  const dispatch = useDispatch<AppDispatch>()
  const [categories, setCategories] = useState<string[]>()

  useEffect(() => {
    if (transactions) {
      setCategories([
        ...new Set(transactions.map((transaction) => transaction.category)),
      ])
    }
  }, [transactions, category])
  return (
    <>
      {transactions && (
        <Select
          value={category}
          onChange={(e) => {
            dispatch(changeCategory(e.target.value))
          }}
        >
          <option value="All" key="All">
            All
          </option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      )}
    </>
  )
}

export default CategoryFilter

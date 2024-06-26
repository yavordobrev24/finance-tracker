import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { TransactionFormType } from '../../types'
import { useDispatch } from 'react-redux'
import { addTransaction } from '../../state/transactions/transactionsSlice'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../state/store'

function TransactionForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      description: '',
      amount: '',
      type: 'income',
      category: '',
      date: '',
    },
  })

  function onSubmit(values: TransactionFormType) {
    dispatch(addTransaction(values))
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction="column"
        gap="20px"
        maxW="600px"
        mx="auto"
        textAlign="center"
      >
        <Heading>Add Transaction</Heading>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="description"
            required
            {...register('description')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            type="number"
            id="amount"
            placeholder="amount"
            required
            {...register('amount')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Select id="type" defaultValue="income" {...register('type')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Input
            id="category"
            required
            placeholder="category"
            {...register('category')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            type="date"
            id="date"
            required
            placeholder="date"
            {...register('date')}
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Add transaction
        </Button>
      </Flex>
    </form>
  )
}

export default TransactionForm

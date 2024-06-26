import { Flex, Heading, Text, Box } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../../state/transactions/transactionsSlice'
import { AppDispatch, RootState } from '../../state/store'

function Summary() {
  const { transactions } = useSelector((state: RootState) => state.transactions)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const totalIncome = useMemo(() => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type != 'expense'
    )
    const income = incomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )
    return income
  }, [transactions])

  const totalExpenses = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type == 'expense'
    )
    const expenses = expenseTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )
    return expenses
  }, [transactions])

  return (
    <Flex
      direction="column"
      gap="20px"
      alignItems="center"
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      maxW="lg"
      mx="auto"
      mt={5}
    >
      <Heading as="h2" size="lg" mb={5}>
        Summary
      </Heading>
      <Box bg="green.50" p={3} borderRadius="md" w="100%">
        <Text fontSize="20px" fontWeight="bold">
          Total Income:{' '}
          <Text as="span" fontWeight="normal">
            ${totalIncome.toFixed(2)}
          </Text>
        </Text>
      </Box>
      <Box bg="red.50" p={3} borderRadius="md" w="100%">
        <Text fontSize="20px" fontWeight="bold">
          Total Expenses:{' '}
          <Text as="span" fontWeight="normal">
            ${totalExpenses.toFixed(2)}
          </Text>
        </Text>
      </Box>
      <Box bg="blue.50" p={3} borderRadius="md" w="100%">
        <Text fontSize="20px" fontWeight="bold">
          Balance:{' '}
          <Text as="span" fontWeight="normal">
            ${(totalIncome + totalExpenses).toFixed(2)}
          </Text>
        </Text>
      </Box>
    </Flex>
  )
}

export default Summary

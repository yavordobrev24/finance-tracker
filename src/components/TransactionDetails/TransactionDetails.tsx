import { Box, Text, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { Transaction } from '../../types'

function TransactionDetails() {
  const { id } = useParams()
  const { transactions } = useSelector((state: RootState) => state.transactions)
  const [transaction, setTransaction] = useState<Transaction>()
  useEffect(() => {
    const transaction = transactions.find(
      (transaction: Transaction) => transaction.id == Number(id)
    )
    setTransaction(transaction)
  }, [id])

  return (
    <>
      {transaction && (
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          maxW="lg"
          mx="auto"
          mt={5}
        >
          <VStack spacing={3} align="start">
            <Heading as="h2" size="lg">
              {transaction.description}
            </Heading>
            <Text fontWeight="bold">
              Type:{' '}
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {transaction.type}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Category:{' '}
              <Text as="span" fontWeight="normal">
                {transaction.category}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Date:{' '}
              <Text as="span" fontWeight="normal">
                {transaction.date}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Amount:{' '}
              <Text as="span" fontWeight="normal">
                ${transaction.amount.toFixed(2)}
              </Text>
            </Text>
          </VStack>
        </Box>
      )}
    </>
  )
}

export default TransactionDetails

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTransaction,
  fetchTransactions,
} from '../../state/transactions/transactionsSlice'
import { AppDispatch, RootState } from '../../state/store'
import { useEffect } from 'react'
import { Transaction } from '../../types'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CalendarIcon, DeleteIcon } from '@chakra-ui/icons'
import CategoryFilter from '../CategoryFilter/CategoryFilter'

function TransactionList() {
  const { filteredTransactions } = useSelector(
    (state: RootState) => state.transactions
  )
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  return (
    <>
      <CategoryFilter />
      <SimpleGrid
        py="20px"
        spacing={10}
        templateColumns={{
          xl: 'repeat(4, 1fr)',
          lg: 'repeat(3, 1fr)',
          md: 'repeat(2, 1fr)',
          base: '1fr',
        }}
      >
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction: Transaction) => (
            <Card
              key={transaction.id}
              borderTop="8px"
              borderColor={
                transaction.type == 'income' ? 'green.500' : 'red.500'
              }
              _hover={{
                background: 'gray.50',
                transition: '300ms',
              }}
              pos="relative"
            >
              <Link to={`/transactions/${transaction.id}`}>
                <Icon
                  pos="absolute"
                  bottom="20px"
                  right="20px"
                  gap="5px"
                  _hover={{ color: 'gray.500', transition: '300ms' }}
                  as={DeleteIcon}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    dispatch(deleteTransaction(transaction.id))
                  }}
                ></Icon>

                <CardHeader>
                  <HStack>
                    <Text fontSize="24px" fontWeight="bold">
                      {transaction.description}
                    </Text>
                  </HStack>
                </CardHeader>
                <CardBody textTransform="capitalize" fontSize="18px">
                  <Flex gap="5px" alignItems="center">
                    <Text>{transaction.type}:</Text>
                    <Text>{transaction.amount.toFixed(2)}</Text>
                  </Flex>
                </CardBody>
                <Divider borderColor="gray.300" />
                <CardFooter>
                  <Flex alignItems="center" gap="5px">
                    <Icon as={CalendarIcon}></Icon>
                    <Text>{transaction.date}</Text>
                  </Flex>
                </CardFooter>
              </Link>
            </Card>
          ))
        ) : (
          <Text fontSize="20px">There are no transactions yet.</Text>
        )}
      </SimpleGrid>
    </>
  )
}

export default TransactionList

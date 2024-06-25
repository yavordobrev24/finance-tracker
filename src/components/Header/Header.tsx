import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  List,
  ListItem,
  Link as ChakraLink,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Header() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
  return (
    <>
      <Box bg="gray.800" color="white" fontSize="18px" boxShadow="md">
        <Flex
          maxW="1200"
          mx="auto"
          justify="space-between"
          alignItems="center"
          py="20px"
          px="40px"
        >
          <Box>
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }}>
              Finance Tracker
            </ChakraLink>
          </Box>
          {isLargerThan900 ? (
            <Box>
              <List as={Flex} gap={8} alignItems="center">
                <ListItem>
                  <ChakraLink as={Link} to="/">
                    Dashboard
                  </ChakraLink>
                </ListItem>
                <ListItem>
                  <ChakraLink as={Link} to="/transactions">
                    Transactions
                  </ChakraLink>
                </ListItem>
                <ListItem>
                  <ChakraLink as={Link} to="/transactions/create">
                    Add Transaction
                  </ChakraLink>
                </ListItem>
              </List>
            </Box>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                color="black"
              />
              <MenuList>
                <MenuItem color="black">
                  <Link to="/">Dashboard</Link>
                </MenuItem>
                <MenuItem color="black">
                  <Link to="/transactions">Transactions</Link>
                </MenuItem>
                <MenuItem color="black">
                  <Link to="/transactions/create">Add Transaction</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default Header

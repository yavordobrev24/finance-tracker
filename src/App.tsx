import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import './App.css'
import Summary from './components/Summary/Summary'
import TransactionDetails from './components/TransactionDetails/TransactionDetails'
import TransactionList from './components/TransactionList/TransactionList'
import TransactionForm from './components/TransactionForm/TransactionForm'
import { Container } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Header />
      <Container maxW="1200px" py="30px">
        <Routes>
          <Route index element={<Summary />} />
          <Route path="transactions">
            <Route index element={<TransactionList />} />
            <Route path=":id" element={<TransactionDetails />} />
            <Route path="create" element={<TransactionForm />} />
          </Route>
        </Routes>
      </Container>
    </>
  )
}

export default App

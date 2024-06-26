import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './state/store'

describe('App', () => {
  it('should render App', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    screen.debug()
  })
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/index'
import { injectStore } from './api/api'
/* https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files */
injectStore(store)

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

)

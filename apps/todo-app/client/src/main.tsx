import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './assets/magic-master/magic.css'
import PageLoader from './components/loaders/PageLoader.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />} >
      <App />
    </Suspense>
  </StrictMode>,
)


// const store = configureStore({})

// const renderApp = () =>
//   createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//       <Suspense fallback={<PageLoader />} >
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </Suspense>
//     </StrictMode>,
//   )

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./components/App', renderApp)
// }

// renderApp()
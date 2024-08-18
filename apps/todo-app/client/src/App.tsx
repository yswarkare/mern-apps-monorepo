import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { initFlowbite } from 'flowbite'

function App() {
  const router = createBrowserRouter(routes)

  useEffect(()=>{
    initFlowbite()
  }, [])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

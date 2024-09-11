import { CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './router'

function App() {
  const theme = 'light'
  const router = createBrowserRouter(routes)
  const theme = useMemo(() => createTheme(themeSettings('dark')), ['dark']);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  )
}

export default App

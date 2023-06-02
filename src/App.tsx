import { MantineProvider } from '@mantine/core'
import { theme } from './theme/theme'
import { SnackbarProvider } from 'notistack'
import { SnackbarManagerConfigurator } from './utils/snackbarManager'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from './models'
import { Login } from './pages/login'
import { Register } from './pages/register';


function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <SnackbarProvider>
        <SnackbarManagerConfigurator />
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to={publicRoutes.login} />} />
            <Route path={publicRoutes.login} element={<Login />} />
            <Route path={publicRoutes.register} element={<Register />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>

    </MantineProvider>
  )
}

export default App

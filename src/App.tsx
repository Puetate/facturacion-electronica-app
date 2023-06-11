import { MantineProvider } from '@mantine/core'
import { theme } from './theme/theme'
import { SnackbarProvider } from 'notistack'
import { SnackbarManagerConfigurator } from './utils/snackbarManager'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminRoutes, PublicRoutes, superRoutes, UserRoutes } from './models'
import { Login } from './pages/login'
import { Register } from './pages/register';
import { Sales } from './pages/Sales';
import { CreditNote } from './pages/CreditNote';
import { Products } from './pages/Products';
import { AppLayout } from './layouts';
import { Categories } from './pages/Categories';
import { Clients } from './pages/Clients';
import { RequireAuth } from './components';


function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <SnackbarProvider>
        <SnackbarManagerConfigurator />
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to={PublicRoutes.login} />} />
            <Route path={PublicRoutes.login} element={<Login />} />
            <Route path={PublicRoutes.register} element={<Register />} />

            <Route element={<RequireAuth />}>
              <Route path={UserRoutes.sales} element={<AppLayout />}>
                <Route index element={<Sales />} />
                <Route path={UserRoutes.creditNote} element={<CreditNote />} />
                <Route path={UserRoutes.products} element={<Products />} />
                <Route path={UserRoutes.categories} element={<Categories />} />
                <Route path={UserRoutes.clients} element={<Clients />} />
              </Route>
              {/* <Route path={superRoutes.companies} element={<AppLayout />}>
                <Route index element={<Comapnies />} />
              </Route> */}
            </Route>
            <Route path="*" element={<Navigate to={PublicRoutes.login} />} />

          </Routes>

        </BrowserRouter>
      </SnackbarProvider>

    </MantineProvider>
  );
}

export default App

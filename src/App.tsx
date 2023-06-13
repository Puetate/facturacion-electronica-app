import { MantineProvider } from '@mantine/core'
import { theme } from './theme/theme'
import { SnackbarProvider } from 'notistack'
import { SnackbarManagerConfigurator } from './utils/snackbarManager'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminRoutes, PublicRoutes, superRoutes, UserRoutes } from './models'
import { Sales } from './pages/Sales';
import { CreditNote } from './pages/CreditNote';
import { Products } from './pages/Products';
import { AppLayout } from './layouts';
import { Categories } from './pages/Categories';
import { RequireAuth } from './components';
import Clients from './pages/Clients/Clients';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Companies from './pages/Companies/Companies';
import Reports from './pages/Reports/Reports';
import Tax from './pages/Tax/Tax';
import Providers from './pages/Providers/Providers';
import Purchases from './pages/Purchases/Purchases';
import Promotions from './pages/Promotions/Promotions';
import Users from './pages/Users/Users';


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
              <Route path={superRoutes.companies} element={<AppLayout />}>
                <Route index element={<Companies />} />
              </Route>

              <Route path={AdminRoutes.reports} element={<AppLayout />}>
                <Route index element={<Reports />} />
                <Route path={AdminRoutes.categories} element={<Categories />} />
                <Route path={AdminRoutes.products} element={<Products />} />
                <Route path={AdminRoutes.tax} element={<Tax />} />
                <Route path={AdminRoutes.clients} element={<Clients />} />
                <Route path={AdminRoutes.providers} element={<Providers />} />
                <Route path={AdminRoutes.purchases} element={<Purchases />} />
                <Route path={AdminRoutes.promotions} element={<Promotions />} />
                <Route path={AdminRoutes.users} element={<Users />} />
              </Route>

              <Route path={UserRoutes.sales} element={<AppLayout />}>
                <Route index element={<Sales />} />
                <Route path={UserRoutes.creditNote} element={<CreditNote />} />
                <Route path={UserRoutes.products} element={<Products />} />
                <Route path={UserRoutes.categories} element={<Categories />} />
                <Route path={UserRoutes.clients} element={<Clients />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to={PublicRoutes.login} />} />

          </Routes>

        </BrowserRouter>
      </SnackbarProvider>

    </MantineProvider>
  );
}

export default App

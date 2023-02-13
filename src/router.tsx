import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as Page from './pages/index';
import * as Components from './components/index';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import 'react-tooltip/dist/react-tooltip.css';

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Page.Login />} />
          <Route element={<Components.PrivateRoute />}>
            <Route path='/inicial' element={<Page.Home />} />
            <Route path='/cadastrar-produto' element={<Page.AddProduct />} />
            <Route path='/editar-produto' element={<Page.EditProduct />} />
            <Route path='/editar-perfil' element={<Page.EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;

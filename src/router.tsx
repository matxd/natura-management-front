import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import * as Page from './pages/index';

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
          <Route path='/inicial' element={<Page.Home />} />
          <Route path='/cadastrar-produto' element={<Page.AddProduct />} />
          <Route path='/editar-produto' element={<Page.EditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;

import { useEffect } from "react";

import { Stack, Box } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import * as Components from '../../components/index';

import logo from '../../assets/logo.svg';

import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";


export const Header = () => {
  const { pathname } = useLocation();
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleExpiredToken = (token: string) => {        
    const decode = JSON.parse(atob(token.split('.')[1]));

    if(decode.exp * 1000 < new Date().getTime()) {
      localStorage.removeItem('token');
      navigate('/');
      toast.error("Acesso expirado, faça login novamente!", toastConfig);
    }
  };

  useEffect(() => {
    const expired = setInterval(handleExpiredToken, 60000, token);
    
    return () => {
      clearInterval(expired);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, paddingBottom: '10px', height: '10vh', paddingTop: 1 }}>
        <Stack spacing={{ xs: 0, md: 2 }} direction='row' alignItems='center'>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img src={logo} alt="Logo Natura Management" width='150px' style={{ cursor: 'pointer' }} onClick={() => navigate('/inicial')} />
          </Box>
          {pathname === '/inicial' && (<Components.SearchProduct />)} 
        </Stack>
        <Components.AccountSettings />
      </Box>
    </>
  )
}

import { Stack, Box } from "@mui/material";

import { useLocation } from "react-router-dom";

import * as Components from '../../components/index';

import logo from '../../assets/logo.svg';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, paddingBottom: '20px' }}>
        <Stack spacing={{ xs: 0, md: 2 }} direction='row' alignItems='center'>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img src={logo} alt="Logo Natura Management" width='150px' />
          </Box>
          {pathname === '/inicial' && (<Components.SearchProduct />)} 
        </Stack>
        <Components.AccountSettings />
      </Box>
    </>
  )
}

import { Avatar, Stack, Box } from "@mui/material";

import { useLocation } from "react-router-dom";

import * as Components from '../../components/index';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack spacing={4} direction='row' alignItems='center'>
          <Avatar sx={{ bgcolor: 'gray' }} alt="Logo Natura Management" src="">NM</Avatar>
          {pathname === '/inicial' && (<Components.SearchProduct />)} 
        </Stack>
        <Components.AccountSettings />
      </Box>
    </>
  )
}

import { Avatar, Stack } from "@mui/material";
import { Box } from "@mui/system";

import * as Components from '../../components/index';

export const Header = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack spacing={4} direction='row' alignItems='center'>
          <Avatar sx={{ bgcolor: 'gray' }} alt="Logo Natura Management" src="">NM</Avatar>
          <Components.SearchProduct />
        </Stack>
        <Components.AccountSettings />
      </Box>
    </>
  )
}

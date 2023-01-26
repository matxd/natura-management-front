import { useState } from 'react';

import { Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, Stack } from '@mui/material';
import { Edit, Logout } from '@mui/icons-material';

export const AccountSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  return (
    <>
      <Stack spacing={4} direction='row' alignItems='center'>
        <Typography variant="body1" sx={{ fontWeight: '700' }}>Olá, Matheus</Typography>
        <Tooltip title="Configurações da conta">
          <IconButton onClick={handleClick} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} sx={{ width: '40px', height: '40px' }}>
            <Avatar sx={{ bgcolor: 'gray' }} alt="User Avatar" src="">M</Avatar>
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 }, '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 125, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, }, }, }}>
        <MenuItem  onClick={handleClose}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Editar perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  )
}

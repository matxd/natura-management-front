import { Box, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

export const SearchProduct = () => {
  return (
    <>
      <Box sx={{ backgroundColor: 'white', borderRadius: '7px' }}>
        <TextField variant='outlined' placeholder='Pesquisar produtos' size='small' InputProps={{endAdornment: <Search /> }} sx={{ width: '270px' }} />
      </Box>
    </>
  )
}

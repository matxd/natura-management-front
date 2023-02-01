import { useState } from "react";

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search, HighlightOff } from '@mui/icons-material';

import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/reducers/productSlice";

export const SearchProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [sought, setSought] = useState<boolean>(false);

  const changeName = (value: string) => {
    if(!value) {dispatch(changeFilter("")); setSought(false)}
    setName(value);
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'white', borderRadius: '7px' }}>
        <TextField onChange={(e) => changeName(e.target.value)}
        value={name}
        variant='outlined'
        placeholder='Pesquisar produtos'
        size='small'
        InputProps={{
          endAdornment:
        <InputAdornment position="end">
          {sought ?
          <IconButton onClick={() => {dispatch(changeFilter("")); setSought(false); setName("")}}>
            <HighlightOff />
          </IconButton>
          :
          <IconButton onClick={() => {dispatch(changeFilter(name)); setSought(true)}}>
            <Search />
          </IconButton>
          }
      </InputAdornment> }}
        sx={{ width: '270px' }} />
      </Box>
    </>
  )
}

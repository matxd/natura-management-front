import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { PostAdd } from '@mui/icons-material';

import { Tooltip } from 'react-tooltip';

export const CardAddProduct = () => {
  const navigate = useNavigate();

  return (
    <>
      <Tooltip anchorId='icon' style={{ width: '225px', zIndex: 999 }} />
      <Box sx={{ border: '3px solid #efebed', borderRadius: '5px', backgroundColor: '#efebed', color: '#000', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '250px', height: '363px', justifyContent: 'center', alignItems: 'center' }}>
        <PostAdd id='icon' data-tooltip-content='Cadastrar produto' sx={{ fontSize: '64px', cursor: 'pointer', '&:hover': { opacity: '0.7' } }} onClick={() => navigate('/cadastrar-produto')} />
      </Box>
    </>
  )

}
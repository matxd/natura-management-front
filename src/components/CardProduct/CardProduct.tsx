import { FC } from 'react';

import { Box, Divider, SpeedDial, SpeedDialAction, Stack, Typography } from '@mui/material';
import { Edit, Delete, Settings } from '@mui/icons-material';

import { InsertPhoto } from '@mui/icons-material';

import { Tooltip } from 'react-tooltip';

import productAPI from '../../redux/reducers/productApi';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { ICards } from '../../utils/interface';

import { useNavigate } from 'react-router-dom';

export const CardProduct: FC<ICards> = (item) => {
  const navigate = useNavigate();

  const [useDeleteProduct, { data, isSuccess }] = productAPI.useDeleteProductMutation();

  const HandleDelete = (id: string) => {
    useDeleteProduct(id);
  };

  if(data && isSuccess) toast.success(data.message, toastConfig);

  return (
    <> 
      <Tooltip anchorId={item._id} style={{ width: '225px', zIndex: 999 }} />
      <Box sx={{ border: '3px solid white', borderRadius: '5px', backgroundColor: '#fff', color: '#000', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '250px', gap: 1, position: 'relative' }}>
        <Stack sx={{ width: '100%' }}>
          {item.image 
            ? ( <img src={typeof item.image === 'object' ? URL.createObjectURL(item.image) : item.image ? `${item.image}` : ''} alt="Card Img Product" height='200px' /> ) 
            : ( <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InsertPhoto sx={{ fontSize: '100px', color: '#808080' }} />
                </Box> 
              )
          }
        </Stack>
        <Divider />
        <Stack spacing={1} flexDirection='column' sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5px', paddingRight: '5px' }}>
            <Typography variant='body1' id={item._id} data-tooltip-content={item.name} sx={{ textAlign: 'start', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#efebed', padding: '5px' }}>
            <Typography variant='body1'>Estoque: <strong>{item.amountStorage}</strong></Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px', paddingRight: '5px' }}>
            <Typography variant='body1' sx={{ fontWeight: '700' }}>R$ {item.price}</Typography>
            <Typography variant='body1' sx={{ textTransform: 'uppercase' }}>{item.genre}</Typography>
            {item._id && (
              <SpeedDial direction='down' sx={{ '& .MuiFab-primary': { width: 40, height: 40, backgroundColor: '#efebed', color: '#000' }, position: 'absolute', top: 5, right: 0 }} ariaLabel='qualquer-texto' icon={<Settings />}>
                <SpeedDialAction sx={{ width: 35, height: 35 }} key='edit' icon={<Edit />} tooltipTitle='Editar' onClick={() => {
                  navigate('/editar-produto', { state: item })
                }} />
                <SpeedDialAction sx={{ width: 35, height: 35 }} key='delete' icon={<Delete />} tooltipTitle='Deletar' onClick={() => { if(item._id) HandleDelete(item._id) }} />
              </SpeedDial>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  )
}

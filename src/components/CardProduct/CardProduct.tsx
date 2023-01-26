import { FC } from 'react';

import { Box, Divider, SpeedDial, SpeedDialAction, Stack, Typography } from '@mui/material';
import { Edit, Delete, Settings } from '@mui/icons-material';

import backgroundHome from "../../assets/background-home.png";

import { Tooltip } from 'react-tooltip';
import { ICards } from '../../utils/interface';

export const CardProduct: FC<ICards> = ({ id, name, genre, amountStorage, price, image }) => {
  return (
    <> 
      <Tooltip anchorId={id} style={{ width: '225px' }} />
      <Box sx={{ border: '3px solid white', borderRadius: '5px', backgroundColor: '#fff', color: '#000', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '20%', gap: 1, position: 'relative' }}>
        <Stack sx={{ width: '100%' }}>
          <img style={{ borderRadius: '5px' }} src={backgroundHome} alt="Imagem Card" height='200px' />
        </Stack>
        <Divider />
        <Stack spacing={1} flexDirection='column' sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5px', paddingRight: '5px' }}>
            <Typography variant='body1' id={id} data-tooltip-content={name} sx={{ textAlign: 'start', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#efebed', padding: '5px' }}>
            <Typography variant='body1'>Estoque: <strong>{amountStorage}</strong></Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px', paddingRight: '5px' }}>
            <Typography variant='body1' sx={{ fontWeight: '700' }}>R$ {price}</Typography>
            <Typography variant='body1' sx={{ textTransform: 'uppercase' }}>{genre}</Typography>
            <SpeedDial direction='down' sx={{ '& .MuiFab-primary': { width: 40, height: 40, backgroundColor: '#efebed', color: '#000' }, position: 'absolute', top: 5, right: 0 }} ariaLabel='qualquer-texto' 
            icon={<Settings />}>
              <SpeedDialAction sx={{ width: 35, height: 35 }} key='edit' icon={<Edit />} tooltipTitle='Editar' />
              <SpeedDialAction sx={{ width: 35, height: 35 }} key='delete' icon={<Delete />} tooltipTitle='Deletar' />
            </SpeedDial>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

import productAPI from "../../redux/reducers/productApi";

import { Box, Stack, Divider, Typography, Container, TextField, Select, InputLabel, MenuItem, FormControl, Button, CircularProgress } from '@mui/material';

import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { IEditProductForm } from '../../utils/interface';

export const EditProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [usePutProduct, { data, isLoading, isSuccess }] = productAPI.usePutProductMutation();

  const { register, handleSubmit } = useForm<IEditProductForm>();

  const HandleEdit = (data: IEditProductForm) => {
    const newData = { ...data, amountStorage: Number(data.amountStorage) };
    console.log(newData)
    // usePutProduct({ body: newData, id: state._id });
  }

  if(data) toast.success(data.message, toastConfig);
  if(isSuccess) navigate(-1);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container maxWidth="lg" sx={{ paddingTop: 2, height: '100%' }}>
          <Components.Header />
          <Typography variant='h3' sx={{ paddingTop: 3, fontWeight: '600' }}>Editar Produto</Typography>
          <Box sx={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component='form' onSubmit={handleSubmit(HandleEdit)} sx={{ width: '40%', backgroundColor: '#fff', color: '#000', border: '3px solid white', borderRadius: '5px' }}>
              <Stack sx={{ width: '100%' }}>
                <img style={{ borderRadius: '5px' }} src={''} alt="Imagem Card" height='200px' />
              </Stack>
              <Divider />
              <Stack spacing={1} flexDirection='column' sx={{ width: '100%', paddingTop: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5px', paddingRight: '5px', gap: 2 }}>
                  <TextField label="Nome" placeholder="Nome do produto" variant="outlined" {...register("name")} defaultValue={state.name} type='text' />
                  <TextField label="Quantidade" placeholder="Quantidade em estoque" variant="outlined" {...register("amountStorage")} type='number' defaultValue={state.amountStorage} />
                  <TextField label="Preço" placeholder="Preço do produto" variant="outlined" {...register("price")} defaultValue={state.price} type='text' />
                  <FormControl fullWidth>
                    <InputLabel id="select-genre" placeholder="Gênero do produto">Gênero</InputLabel>
                    <Select labelId="select-genre" label='Gênero' placeholder="Gênero do produto" {...register("genre")} defaultValue={state.genre}>
                      <MenuItem value='MASCULINO'>Masculino</MenuItem>
                      <MenuItem value='FEMININO'>Feminino</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '10px' }}>
                  <Button variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "gray", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#c4c7cc" } }} onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>

                  <Button type="submit" variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "#005520", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#01752d" } }}>
                    {isLoading ? ( <CircularProgress sx={{ color: "#005520" }} size="1rem" /> ) : ( "Salvar" )}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

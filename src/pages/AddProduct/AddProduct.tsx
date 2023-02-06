import { useRef, useState } from 'react';

import productAPI from "../../redux/reducers/productApi";

import { Box, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';

import { IAddProduct } from '../../utils/interface';
import { sendError } from '../../utils/functions';

export const AddProduct = () => {
  const [image, setImage] = useState();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm<IAddProduct>({
    defaultValues: {
      image: ''
    }
  });

  const [usePostProduct, { data, isLoading, isSuccess, isError, error }] = productAPI.usePostProductMutation();

  const watchInputs = watch();

  const handleClickFile = () => {
    inputImageRef.current?.click();
  };

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setValue('image', e.target.files[0])
    }
  };

  const dataAPI = new FormData();
  if(image) {
    dataAPI.append("image", image)
  }

  const HandleAdd = (data: IAddProduct) => {
    dataAPI.append("data", JSON.stringify({ name: data.name, price: data.price, amountStorage: Number(data.amountStorage), genre: data.genre, expirationDate: data.expirationDate }));
    usePostProduct(dataAPI);
  };

  if(data) toast.success(data.message, toastConfig);
  if(isSuccess) navigate(-1);
  if(isError) sendError(error);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container maxWidth="lg" sx={{ height: '10%' }}>
          <Components.Header />
        </Container>
        <Container maxWidth="lg" sx={{ paddingTop: 2, height: { xs: '100%', md: '90%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3, width: '100%' }}>
            <Typography variant='h3' sx={{ fontWeight: '600', fontSize: { xs: '32px', md: '48px' }, marginTop: { xs: 0, md: '-80px' } }}>Cadastrar Produto</Typography>
            <Box component='form' onSubmit={handleSubmit(HandleAdd)} sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ width: '50%', display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
                <Components.CardProduct {...watchInputs} />
              </Box>

              <Box sx={{ backgroundColor: '#fff', padding: 5, width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: '5px' }}>
                <FormControl fullWidth>
                  <Button onClick={handleClickFile} variant='contained' sx={{ height: '56px' }}>
                    <input type="file" accept='image/jpeg, image/png' style={{ display: 'none' }} ref={inputImageRef} onChange={imageChange} />
                    Enviar imagem
                  </Button>
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Nome" required placeholder="Nome do produto" variant="outlined" {...register("name")} type='text' />
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Quantidade" required placeholder="Quantidade em estoque" variant="outlined" {...register("amountStorage")} type='number' />
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Preço" required placeholder="Preço do produto" variant="outlined" {...register("price")} type='text' />
                </FormControl>

                <FormControl fullWidth>
                  <TextField InputLabelProps={{ shrink: true }} label="Data de Validade" required placeholder="Data de validade do produto" variant="outlined" {...register("expirationDate")} type='date' />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="select-genre" required placeholder="Gênero do produto">Gênero</InputLabel>
                  <Select labelId="select-genre" required label='Gênero' placeholder="Gênero do produto" defaultValue='' {...register("genre")}>
                    <MenuItem value='MASCULINO'>Masculino</MenuItem>
                    <MenuItem value='FEMININO'>Feminino</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: { xs: 3, md: 0 } }}>
                  <Button variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "gray", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#c4c7cc" } }} onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>

                  <Button type="submit" variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "#005520", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#01752d" } }}>
                    {isLoading ? ( <CircularProgress sx={{ color: "#005520" }} size="1rem" /> ) : ( "Cadastrar" )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

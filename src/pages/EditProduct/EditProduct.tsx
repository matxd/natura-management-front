import { useRef, useState } from "react";

import productAPI from "../../redux/reducers/productApi";

import { Box, Typography, Container, TextField, Select, InputLabel, MenuItem, FormControl, Button, CircularProgress } from '@mui/material';

import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { IEditProductForm } from '../../utils/interface';
import { FileToBase64 } from "../../utils/functions";

export const EditProduct = () => {
  const [image, setImage] = useState<any>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [usePutProduct, { data, isLoading, isSuccess }] = productAPI.usePutProductMutation();

  const { register, handleSubmit, watch, setValue, clearErrors } = useForm<IEditProductForm>({
    defaultValues: {
      name: state.name,
      amountStorage: state.amountStorage,
      price: state.price,
      genre: state.genre,
      image: state.image
    }
  });

  const watchInputs = watch();

  const HandleEdit = (data: IEditProductForm) => {
    const newData = { ...data, amountStorage: Number(data.amountStorage) };
    usePutProduct({ body: newData, id: state._id });
  }

  const handleFileChange = async (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      await FileToBase64(event.target.files[0]).then((response) => {
        setImage(response);
        setValue("image", response);
        clearErrors("image");
      });
    }
  };

  const handleClickFile = () => {
    inputImageRef.current?.click();
  };

  if(data) toast.success(data.message, toastConfig);
  if(isSuccess) navigate(-1);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container maxWidth="lg" sx={{ paddingTop: 2, height: '10%' }}>
          <Components.Header />
        </Container>
        <Container maxWidth="lg" sx={{ paddingTop: 2, height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3, width: '100%' }}>
            <Typography variant='h3' sx={{ fontWeight: '600', marginTop: '-80px' }}>Editar Produto</Typography>
            <Box component='form' onSubmit={handleSubmit(HandleEdit)} sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Components.CardProduct {...watchInputs} />
              </Box>

              <Box sx={{ backgroundColor: '#fff', padding: 5, width: '50%', display: 'flex', flexDirection: 'column', gap: 3, borderRadius: '5px' }}>
                <FormControl fullWidth>
                  <Button onClick={handleClickFile} variant='contained' sx={{ height: '56px' }}>
                    <input type="file" accept='image/jpeg, image/png' style={{ display: 'none' }} ref={inputImageRef} onChange={handleFileChange} />
                    Enviar imagem
                  </Button>
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Nome" placeholder="Nome do produto" variant="outlined" {...register("name")} type='text' />
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Quantidade" placeholder="Quantidade em estoque" variant="outlined" {...register("amountStorage")} type='number' />
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Preço" placeholder="Preço do produto" variant="outlined" {...register("price")} type='text' />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="select-genre" placeholder="Gênero do produto">Gênero</InputLabel>
                  <Select labelId="select-genre" label='Gênero' placeholder="Gênero do produto" defaultValue={state.genre} {...register("genre")}>
                    <MenuItem value='MASCULINO'>Masculino</MenuItem>
                    <MenuItem value='FEMININO'>Feminino</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "gray", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#c4c7cc" } }} onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>

                  <Button type="submit" variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "#005520", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#01752d" } }}>
                    {isLoading ? ( <CircularProgress sx={{ color: "#005520" }} size="1rem" /> ) : ( "Salvar" )}
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

import { useState, useRef, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';

import { Box, Button, Container, FormControl, TextField, Typography, CircularProgress, Avatar } from "@mui/material";

import * as Components from '../../components/index';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { sendError } from '../../utils/functions';
import { IEditUserForm } from '../../utils/interface';

import userAPI from '../../redux/reducers/userApi';

export const EditProfile = () => {
  const navigate = useNavigate();

  const [idUserLogged, setIdUserLogged] = useState<string>();

  const [image, setImage] = useState();
  const inputImageRef = useRef<HTMLInputElement>(null);

  const [usePutUser, { data, isLoading, isSuccess, isError, error }] = userAPI.usePutUserMutation();

  const { register, handleSubmit, setValue } = useForm<IEditUserForm>();

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

  const HandleEdit = (data: IEditUserForm) => {
    dataAPI.append("data", JSON.stringify({ name: data.name }));
    usePutUser({ body: dataAPI, id: idUserLogged });
  }

  if(data) toast.success(data.message, toastConfig);
  if(isSuccess) navigate('/inicial');
  if(isError) sendError(error);

  const decodificarJWT = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        let decodedJWT = JSON.parse(atob(token.split('.')[1]));
        let id = decodedJWT.id;
  
        setIdUserLogged(id);
      }
    } catch (error) {
      setIdUserLogged('');
    }
  }

  useEffect(() => {
    decodificarJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container maxWidth="lg" sx={{ height: '10%' }}>
          <Components.Header />
        </Container>

        <Container maxWidth="lg" sx={{ paddingTop: 2, height: { xs: '100%', md: '90%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, width: '100%' }}>
            <Typography variant='h3' sx={{ fontWeight: '600', fontSize: { xs: '32px', md: '48px' }, marginTop: { xs: 0, md: '-80px' } }}>Editar Perfil</Typography>

            <Box component='form' onSubmit={handleSubmit(HandleEdit)} sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>

              <Box sx={{ backgroundColor: '#fff', padding: 5, width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: '5px', marginBottom: { xs: 5, md: 0 } }}>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar alt='User Pic' src={image ? URL.createObjectURL(image) : ''} sx={{ width: '100px', height: '100px' }} />
                </Box>

                <FormControl fullWidth>
                  <Button onClick={handleClickFile} variant='contained' sx={{ height: '56px' }}>
                    <input type="file" accept='image/jpeg, image/png' style={{ display: 'none' }} ref={inputImageRef} onChange={imageChange} />
                    Enviar imagem
                  </Button>
                </FormControl>

                <FormControl fullWidth>
                  <TextField label="Nome" required placeholder="Nome do usuário" variant="outlined" {...register("name")} type='text' />
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: { xs: 3, md: 0 } }}>
                  <Button variant="contained" disabled={isLoading ? true : false} sx={{ width: "150px", height: "40px", background: "gray", borderRadius: "10px", fontWeight: "bold", "&:hover": { background: "#c4c7cc" } }} onClick={() => navigate('/inicial')}>
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

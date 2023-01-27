import { useState } from "react";
import productAPI from "../../redux/reducers/productApi";

import { IItemsAPI } from "../../utils/interface";

import { useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';

import { sendError } from '../../utils/functions';
import { Box } from '@mui/material';
import { Container } from '@mui/system';

export const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<any>({size: 10, page: 0});
  const [name, setName] = useState<string>("");

  const { data, isLoading, isError, error } = productAPI.useGetProductsQuery(filter);

  if(isError) sendError(error);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
          <Components.Header />
          {isLoading && (<h2>Carregando...</h2>)}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', paddingTop: 5, justifyContent: 'space-between', gap: '45px' }}>
            {data && data.items.map((item: IItemsAPI) => (
              <Components.CardProduct key={item._id} {...item} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Lógica pesquisar produto */}
      {/* <h1>Home</h1>
      <input placeholder='buscar' onChange={e => setName(e.target.value)}/>
      <button onClick={() => {setFilter({...filter, filter: name})}}>buscar</button>
      <button onClick={() => navigate('/cadastrar-produto')}>Cadastrar produto</button>
      */}
    </>
  )
}

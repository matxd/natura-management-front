import style from './Home.module.css';
import {useState} from "react";
import productAPI from "../../redux/reducers/productApi";

import { IItemsAPI } from "../../utils/interface";

import { useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';
import backgroundHome from "../../assets/background-home.png";

import { sendError } from '../../utils/functions';
import { Box } from '@mui/material';
import { Container } from '@mui/system';

export const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<any>({size: 10, page: 0});
  const [name, setName] = useState<string>("");
  // const { data, isLoading, isError, error  } = productAPI.useGetProductsQuery(filter);

  // if(isError) sendError(error);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh", backgroundImage: `url(${backgroundHome})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
          <Components.Header />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', paddingTop: 5, justifyContent: 'space-between', gap: '45px' }}>
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
            <Components.CardProduct />
          </Box>
        </Container>
      </Box>

      {/* <h1>Home</h1>
      <input placeholder='buscar' onChange={e => setName(e.target.value)}/>
      <button onClick={() => {setFilter({...filter, filter: name})}}>buscar</button>
      <button onClick={() => navigate('/cadastrar-produto')}>Cadastrar produto</button>
      {isLoading && (<h2>Carregando...</h2>)} 
      <div className={style.container}>
        {data && data.items.map((item: IItemsAPI) => (
          <div key={item._id} className={style.card}>
            <div>
              <li><span>ID:</span> {item._id}</li>
              <li><span>Nome:</span> {item.name}</li>
              <li><span>Gênero:</span> {item.genre}</li>
              <li><span>Preço:</span> {item.price}</li>
              <li><span>Status:</span> {item.status ? 'OK' : 'NÃO OK'}</li>
              <li><span>Imagem:</span> {item.image}</li>
              <li><span>Quantidade Estoque:</span> {item.amountStorage}</li>
            </div>
            <div className={style.button}>
              <button onClick={() => navigate('/editar-produto', { state: item })}>Editar Produto</button>
              <Components.ButtonDeleteProduct id={item._id} />
            </div>
          </div>
        ))}
      </div> */}
    </>
  )
}

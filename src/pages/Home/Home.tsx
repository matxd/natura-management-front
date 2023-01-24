import style from './Home.module.css';

import productAPI from "../../redux/reducers/productSlice";

import { IItemsAPI } from "../../utils/interface";

import { useNavigate } from 'react-router-dom';

import * as Components from '../../components/index';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';

export const Home = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = productAPI.useGetProductsQuery({ size: 10, page: 0 });

  if(isError) toast.success('Acesso inválido ou expirado!', toastConfig);

  return (
    <>
      <h1>Home</h1>
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
      </div>
    </>
  )
}

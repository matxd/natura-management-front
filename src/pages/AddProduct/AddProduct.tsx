import style from './AddProduct.module.css';

import productAPI from "../../redux/reducers/productApi";

import { useForm } from 'react-hook-form';

import { IAddProduct } from '../../utils/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
  const navigate = useNavigate()
  const [usePostProduct, { data, isLoading, isSuccess }] = productAPI.usePostProductMutation();
  const { register, handleSubmit } = useForm<IAddProduct>();

  const HandleAdd = (data: IAddProduct) => {
    const newData = { ...data, amountStorage: Number(data.amountStorage) };
    usePostProduct(newData);
  };

  if(data) toast.success(data.message, toastConfig);
  if(isSuccess) navigate(-1);

  return (
    <>
      <h1>Cadastrar produto</h1>
      {isLoading && (<h2>Carregando...</h2>)} 
      <div className={style.add}>
        <form onSubmit={handleSubmit(HandleAdd)} className={style.form}>
          <div className={style.container}>
            
            <div className={style.label}>
              <label>Nome do Produto:</label>
              <label>Gênero do Produto:</label>
              <label>Quantidade em Estoque:</label>
              <label>Preço do Produto:</label>
              <label>Imagem do Produto:</label>
            </div>

            <div className={style.input}>
              <input type="text" {...register('name')} required />
              <input type="text" {...register('genre')} required />
              <input type="number" {...register('amountStorage')} required />
              <input type="text" {...register('price')} required />
              <input type="text" {...register('image')} required />
            </div>
          </div>

          <button type='submit'>Salvar</button>
        </form>
      </div>
    </>
  )
}

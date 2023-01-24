import style from './EditProduct.module.css';

import productAPI from "../../redux/reducers/productSlice";

import { useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';
import { IEditProductForm } from '../../utils/interface';

export const EditProduct = () => {
  const { state } = useLocation();

  const [usePutProduct, { data, isLoading }] = productAPI.usePutProductMutation();

  const { register, handleSubmit } = useForm<IEditProductForm>();

  const HandleEdit = (data: IEditProductForm) => {
    const newData = { ...data, amountStorage: Number(data.amountStorage) };
    usePutProduct({ body: newData, id: state._id });
  }

  if(data) toast.success(data.message, toastConfig);

  return (
    <>
      <h1>Editar produto</h1>
      {isLoading && (<h2>Carregando...</h2>)} 
      <div className={style.edit}>
        <form onSubmit={handleSubmit(HandleEdit)} className={style.form}>
          <div className={style.container}>
            
            <div className={style.label}>
              <label>Nome do Produto:</label>
              <label>Gênero do Produto:</label>
              <label>Quantidade em Estoque:</label>
              <label>Preço do Produto:</label>
              <label>Imagem do Produto:</label>
            </div>

            <div className={style.input}>
              <input type="text" defaultValue={state.name} {...register('name')} required />
              <input type="text" defaultValue={state.genre} {...register('genre')} required />
              <input type="number" defaultValue={state.amountStorage} {...register('amountStorage')} required />
              <input type="text" defaultValue={state.price} {...register('price')} required />
              <input type="text" defaultValue={state.image} {...register('image')} required />
            </div>
          </div>

          <button type='submit'>Salvar</button>
        </form>
      </div>
    </>
  )
}

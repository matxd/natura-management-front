import productAPI from '../../redux/reducers/productApi';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';

import { sendError } from '../../utils/functions';

export const ButtonDeleteProduct = ({ id }: {id: string}) => {
  const [useDeleteProduct, { data, isError, error }] = productAPI.useDeleteProductMutation();

  const HandleDelete = () => {
    useDeleteProduct(id)
  }

  if(data) toast.success(data.message, toastConfig);
  if(isError) sendError(error);

  return (
    <>
      <button onClick={() => HandleDelete()}>Deletar Produto</button>
    </>
  ) 
}

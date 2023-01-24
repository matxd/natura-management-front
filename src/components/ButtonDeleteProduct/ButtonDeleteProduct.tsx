import productAPI from '../../redux/reducers/productSlice';

import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';

export const ButtonDeleteProduct = ({ id }: {id: string}) => {
  const [useDeleteProduct, { data }] = productAPI.useDeleteProductMutation();

  const HandleDelete = () => {
    useDeleteProduct(id)
  }

  if(data) toast.success(data.message, toastConfig);

  return (
    <>
      <button onClick={() => HandleDelete()}>Deletar Produto</button>
    </>
  ) 
}

import { toastConfig } from './toast';
import { toast } from 'react-toastify';

export const sendError = (error: any) => {
  if (error) {
    if ('status' in error) {
      let errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      let aux: {message: string} = JSON.parse(errMsg);
      toast.error(aux.message, toastConfig)
    }
  }
}
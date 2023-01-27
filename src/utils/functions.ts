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

export const FileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
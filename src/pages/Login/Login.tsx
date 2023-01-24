import style from './Login.module.css';

import { useForm } from "react-hook-form";

import { ILogin } from '../../utils/interface';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';

import { handleLogin } from '../../redux/reducers/auth';
import { getProducts } from '../../redux/reducers/product';

export const Login = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);
  const { register, handleSubmit } = useForm<ILogin>();

  console.log('Token: ', state.auth.data)
  console.log('Produtos: ', state.product.data)

  const login = (data: ILogin) => {
    dispatch(handleLogin(data))
  };

  return (
    <>
      <h1>Login</h1>
      <form className={style.form} onSubmit={handleSubmit(login)}>
        <div className={style.div}>
          <input type="text" {...register("email")} required placeholder='Email' />
          <input type="text" {...register("password")} required placeholder='Senha' />
        </div>
        <button type="submit">Fazer login</button>
      </form>
      <button onClick={() => dispatch(getProducts({ size: 10, page: 0, filter: '' }))}>Buscar produtos</button>
    </>
  )
}

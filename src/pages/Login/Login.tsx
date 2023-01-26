import style from "./Login.module.css";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

import backgroundLogin from "../../assets/background-login.png";
import backgroundHome from "../../assets/background-home.png";
import backgroundApp from "../../assets/background-home-app.png";

import authAPI from "../../redux/reducers/authApi";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";
import { ILogin } from "../../utils/interface";
import { sendError } from "../../utils/functions";

export const Login = () => {
  const navigate = useNavigate();
  const [usePostAuth, { data, isLoading, isError, error }] =
    authAPI.usePostAuthorizationMutation();

  const { register, handleSubmit } = useForm<ILogin>();

  const HandleLogin = (dataLogin: ILogin) => {
    usePostAuth(dataLogin);
  };

  if (isError) sendError(error);

  if (data && !isLoading && !isError) {
    localStorage.setItem("token", data);
    toast.success("Autenticado com sucesso", toastConfig);
  }

  return (
    <Box sx={{ display: "flex", maxWidth: "100vw", height: "100vh" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundImage: `url(${backgroundLogin})`,
          backgroundSize: 'cover'
        }}
      ></Box>
      <Box sx={{ width: "50%", height: "100%", bgcolor: "#f8f8ff" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", bgcolor: "#fff" }}
        ></Box>
      </Box>
      {/* <h1>Login</h1>
      <form className={style.form} onSubmit={handleSubmit(HandleLogin)}>
        <div className={style.div}>
          <input type="text" {...register("email")} required placeholder='Email' />
          <input type="text" {...register("password")} required placeholder='Senha' />
        </div>
        <button type="submit">Fazer login</button>
      </form>
      <button onClick={() => navigate('/inicial')}>Home</button> */}
    </Box>
  );
};

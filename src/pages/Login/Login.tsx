import React, { useState } from "react";
import {
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  AccountCircleTwoTone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";

import authAPI from "../../redux/reducers/authApi";

import { useNavigate } from "react-router-dom";

import { sendError } from "../../utils/functions";
import Typography from "@mui/material/Typography";

import backgroundLogin from "../../assets/background-login.png";
import InputAdornment from "@mui/material/InputAdornment";

interface ILogin {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [usePostAuth, { data, isLoading, isError, error, isSuccess }] =
    authAPI.usePostAuthorizationMutation();
  const { register, handleSubmit } = useForm<ILogin>();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const HandleLogin = (data: ILogin) => {
    usePostAuth(data);
  };

  if (isError) sendError(error);

  if (isSuccess && data) {
    localStorage.setItem("token", data);
    navigate("/inicial");
  }

  return (
    <Box sx={{ display: "flex", maxWidth: "100%", height: "100vh" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "50%",
          height: "100%",
          backgroundImage: `url(${backgroundLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "50%" },
          padding: "10%",
          height: "100%",
          bgcolor: "#f8f8ff",
          backgroundImage: { xs: `url(${backgroundLogin})`, md: "none" },
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(HandleLogin)}
          sx={{
            padding: "12% 10%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff",
            gap: "1rem",
            alignItems: "center",
            position: "relative",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <AccountCircleTwoTone
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#003a16",
              fontSize: "80px",
              position: "absolute",
              top: "-40px",
            }}
          />
          <Typography color="#01752d" fontSize="25px" fontWeight="bold">
            Login
          </Typography>
          <Divider sx={{ color: "#222", width: "100%", fontSize: "14px" }}>
            Preencha os campos
          </Divider>
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite seu e-mail..."
              label="E-mail"
              {...register("email")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        "&:hover": {
                          background: "transparent",
                          cursor: "initial",
                        },
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Senha"
              placeholder="Digite sua senha..."
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Divider sx={{ color: "black", width: "100%" }} />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading ? true : false}
            sx={{
              width: "150px",
              height: "40px",
              background: "#005520",
              borderRadius: "100px",
              fontWeight: "bold",
              "&:hover": {
                background: "#01752d",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#005520" }} size="1rem" />
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
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

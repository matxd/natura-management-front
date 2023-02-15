import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Stack,
} from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";

import userAPI from "../../redux/reducers/userApi";

import { sendError } from "../../utils/functions";
import { useDispatch } from "react-redux";
import productAPI from "../../redux/reducers/productApi";

export const AccountSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = userAPI.useGetLoggedUserQuery("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogout = () => {
    dispatch(userAPI.util.resetApiState());
    dispatch(productAPI.util.resetApiState());
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isError) sendError(error);

  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center">
        {!isLoading && data && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              textTransform: "capitalize",
              display: { xs: "none", md: "flex" },
            }}
          >
            Olá, {data.name}
          </Typography>
        )}
        <Tooltip title="Configurações da conta">
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ width: "40px", height: "40px" }}
          >
            <Avatar
              sx={{ bgcolor: "gray" }}
              alt="User Avatar"
              src={!isLoading && data ? data.image : ""}
            />
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/editar-perfil");
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Editar perfil
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            userLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};

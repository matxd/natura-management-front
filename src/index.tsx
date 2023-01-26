import { createRoot } from "react-dom/client";
import AppRoutes from "./router";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { defaultTheme } from "./theme/default";
import { ThemeProvider } from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </ThemeProvider>
);

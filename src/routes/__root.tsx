import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import theme from "../theme";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <Outlet />
        <TanStackRouterDevtools />
      </Container>
    </ThemeProvider>
  ),
});

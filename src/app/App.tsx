import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { Layout } from "@/widgets/Layout/Layout";
import { HomePage } from "@/pages/Home/HomePage";
import { LoginPage } from "@/pages/Login/LoginPage";
import { CreateUserPage } from "@/pages/CreateUser/CreateUserPage";
import { EditUserPage } from "@/pages/EditUser/EditUserPage";
import { useAuth } from "@/shared/hooks/useAuth";

const theme = createTheme();

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/user/create" element={<CreateUserPage />} />
            <Route path="/user/edit/:id" element={<EditUserPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

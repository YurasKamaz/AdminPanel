import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
} from "@shared/api/authApi";
import { useSnackbar } from "notistack";

export const useAuth = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isLoading, isError, refetch } = useGetMeQuery();

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const login = async (email: string, password: string) => {
    try {
      await loginMutation({ email, password }).unwrap();
      await refetch();
      enqueueSnackbar("Вход выполнен успешно", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Ошибка входа", { variant: "error" });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      enqueueSnackbar("Выход выполнен", { variant: "info" });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar("Ошибка выхода", { variant: "error" });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
    login,
    logout,
  };
};

import { useForm } from "react-hook-form";
import { useAuth } from "@/shared/hooks/useAuth";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Вход
        </Typography>

        <TextField
          label="Email"
          {...register("email", { required: "Введите email" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Пароль"
          type="password"
          {...register("password", { required: "Введите пароль" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" type="submit" fullWidth>
          Войти
        </Button>
      </Box>
    </Container>
  );
};

import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography,
  Box,
  OutlinedInput,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { UserFormValues } from "@/entities/user/types";
import { emailRegex, phoneRegex } from "@/shared/utils/validation";

interface Props {
  onSubmit: (data: UserFormValues) => void;
  defaultValues?: Partial<UserFormValues>;
  isEditMode?: boolean;
}

export const RHForm = ({
  onSubmit,
  defaultValues = {},
  isEditMode = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues,
  });

  const name = watch("name");
  const surName = watch("surName");

  useEffect(() => {
    if (name && surName) {
      setValue("fullName", `${name} ${surName}`);
    }
  }, [name, surName, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Форма пользователя</Typography>

      <TextField
        label="Имя"
        {...register("name", { required: "Имя обязательно", maxLength: 64 })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Фамилия"
        {...register("surName", {
          required: "Фамилия обязательна",
          maxLength: 64,
        })}
        error={!!errors.surName}
        helperText={errors.surName?.message}
      />

      <TextField
        label="Полное имя"
        {...register("fullName", {
          required: "ФИО обязательно",
          maxLength: 130,
        })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="Email"
        {...register("email", {
          required: "Email обязателен",
          pattern: { value: emailRegex, message: "Некорректный email" },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isEditMode}
      />

      {!isEditMode && (
        <>
          <TextField
            label="Пароль"
            type="password"
            {...register("password", { required: "Пароль обязателен" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Подтверждение пароля"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </>
      )}

      <TextField
        label="Дата рождения"
        type="date"
        {...register("birthDate")}
        InputLabelProps={{ shrink: true }}
        disabled={isEditMode}
      />

      <TextField
        label="Телефон"
        {...register("telephone", {
          pattern: { value: phoneRegex, message: "Некорректный телефон" },
        })}
        error={!!errors.telephone}
        helperText={errors.telephone?.message}
      />

      <FormControl fullWidth error={!!errors.employment}>
        <InputLabel>Занятость</InputLabel>
        <Select
          {...register("employment")}
          input={<OutlinedInput label="Занятость" />}
          defaultValue={defaultValues.employment || ""}
          onChange={(e) => setValue("employment", e.target.value)}
        >
          <MenuItem value="">Не выбрано</MenuItem>
          <MenuItem value="full">Полная</MenuItem>
          <MenuItem value="part">Частичная</MenuItem>
          <MenuItem value="freelance">Фриланс</MenuItem>
        </Select>
        {errors.employment && (
          <FormHelperText>{errors.employment.message}</FormHelperText>
        )}
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={!!watch("userAgreement")}
            {...register("userAgreement")}
            onChange={(e) => setValue("userAgreement", e.target.checked)}
          />
        }
        label="Пользователь дал согласие с условиями использования"
      />

      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </Box>
  );
};

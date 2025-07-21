export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+7\d{10}$/;

export const validateUser = (values: any) => {
  const errors: Record<string, string> = {};

  if (!values.name || values.name.length > 64) errors.name = "Имя обязательно";
  if (!values.surName || values.surName.length > 64)
    errors.surName = "Фамилия обязательна";
  if (!values.fullName || values.fullName.length > 130)
    errors.fullName = "Слишком длинное ФИО";
  if (!values.email || !emailRegex.test(values.email))
    errors.email = "Некорректный email";
  if (values.telephone && !phoneRegex.test(values.telephone))
    errors.telephone = "Некорректный телефон";
  if (!values.password) errors.password = "Пароль обязателен";
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Пароли не совпадают";

  return errors;
};

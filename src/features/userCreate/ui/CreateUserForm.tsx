import { RHForm } from "@/shared/ui/RHForm";
import { useCreateUserMutation } from "@/shared/api/usersApi";
import { useNavigate } from "react-router-dom";
import type { UserFormValues } from "@/entities/user/types";

export const CreateUserForm = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (data: UserFormValues) => {
    const { confirmPassword, ...payload } = data;
    if (
      !data.password ||
      !data.email ||
      !data.name ||
      !data.surName ||
      !data.fullName ||
      !data.birthDate ||
      !data.telephone ||
      !data.employment ||
      !data.userAgreement
    )
      return alert("Заполните все поля");
    try {
      await createUser(payload).unwrap();
      navigate("/");
    } catch (e) {
      alert("Ошибка при создании пользователя");
    }
  };

  return <RHForm onSubmit={handleSubmit} />;
};

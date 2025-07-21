import { RHForm } from "@/shared/ui/RHForm";
import { useGetUserQuery, useUpdateUserMutation } from "@/shared/api/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import type { UserFormValues } from "@/entities/user/types";

export const EditUserForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserQuery(id!);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    if (!id) return;
    try {
      const { confirmPassword, password, email, id, birthDate, ...payload } =
        values;
      await updateUser({ id, data: payload });
      navigate("/");
    } catch (e) {
      alert("Ошибка при сохранении");
    }
  };

  if (isLoading || !data) return <p>Загрузка...</p>;

  return <RHForm onSubmit={handleSubmit} defaultValues={data} isEditMode />;
};

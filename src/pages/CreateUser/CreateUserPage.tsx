import { CreateUserForm } from "@/features/userCreate/ui/CreateUserForm";

export const CreateUserPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Создание пользователя</h1>
      <CreateUserForm />
    </div>
  );
};

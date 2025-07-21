import { EditUserForm } from "@/features/editUser/ui/EditUserForm";

export const EditUserPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Редактирование пользователя</h1>
      <EditUserForm />
    </div>
  );
};

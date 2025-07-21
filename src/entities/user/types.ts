export interface UserFormValues {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

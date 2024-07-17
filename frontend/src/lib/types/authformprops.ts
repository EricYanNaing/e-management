export interface AuthValuesProps {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthType {
  token: string;
  user_mail: string;
  userId: string;
}

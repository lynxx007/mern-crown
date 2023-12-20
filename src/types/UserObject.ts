export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
  isEmailVerified: boolean;
  refreshToken: string[];
  address: string;
  city: string;
};

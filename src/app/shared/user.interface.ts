export interface User{
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

export interface userProfile extends User{
  nombre: string;
  apellido: string;
}
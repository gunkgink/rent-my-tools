export type Role = "member" | "admin";
export interface Profile {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: Role;
}
export interface Equipment {
  _id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  rentalRate: number;
  isActive: boolean;
  image?: string;
}
export interface Rental {
  _id: string;
  equipment: Equipment | null;
  user: Profile | null;
  quantity: number;
  startDate: string;
  returnDate: string;
  createdAt: string;
}
export interface AuthData {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

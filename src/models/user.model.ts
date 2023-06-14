import { Gender, Prisma } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  name: string;
  lastName?: string | null;
  profileImageUrl?: string | null;
  bio?: string | null;
  email: string;
  gender?: Gender;
}

export type CreateUserDto = Prisma.UserCreateInput;
export type UpdateUserDto = Prisma.UserUpdateInput;

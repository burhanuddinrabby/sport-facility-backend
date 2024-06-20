/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  address: string
}

export interface UserModelInterface extends Model<TUser>{
  isUserExist: (email: string) => Promise<TUser>;
}

export type TUser_Role = keyof typeof USER_ROLE

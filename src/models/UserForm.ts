import { User } from "./User";

export type UserForm = Omit<User, "id"> & { password: string };

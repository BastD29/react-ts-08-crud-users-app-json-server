import { message } from "antd";
import { User } from "../models/User";
import { UserForm } from "../models/UserForm";
import ENDPOINTS from "../constants/endpoints";

export const getUsersService = async (): Promise<User[]> => {
  try {
    //     const response = await fetch("/users.json");
    const response = await fetch("http://localhost:8000/users");
    console.log("getUsersService response", response);

    const data = await response.json();
    console.log("getUsers data", data);

    return data as User[];
  } catch (error) {
    message.error("error from getUsersService");
    console.error(error);
    throw error;
  }
};

export const createUserService = async (
  user: UserForm & { password: string }
): Promise<void> => {
  try {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log("createUserService response ", response);

    const data = await response.json();
    console.log("createUserService data", data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserService = async (
  // user: Omit<User, "id">
  // id: string
  user: User
): Promise<void> => {
  try {
    // const response = await fetch("http://localhost:8000/users", {
    // const response = await fetch(`http://localhost:8000/users/${id}`, {
    const response = await fetch(ENDPOINTS.UPDATE_USER(user?.id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log("updateUserService response", response);

    const data = await response.json();
    console.log("updateUserService data", data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

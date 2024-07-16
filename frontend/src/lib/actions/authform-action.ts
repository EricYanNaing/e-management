import { Dispatch } from "@reduxjs/toolkit";
import { AuthValuesProps } from "../types/authformprops";
import { setUsers } from "../store/reducer/user";

export const createUser = async (
  dispatch: Dispatch,
  { values }: { values: AuthValuesProps }
) => {
  try {
    const response = await fetch("http://localhost:8000/create-user", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const { users } = await response.json();
    window.alert("User Created");
    dispatch(setUsers(users));
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

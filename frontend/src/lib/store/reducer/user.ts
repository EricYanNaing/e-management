import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FromValuesProps } from "../../types/eventformprops";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface UsersState {
  users: User[];
  userEvents: FromValuesProps[];
  bookedEvents: FromValuesProps[];
  user: object;
}

const initialState: UsersState = {
  users: [],
  user: {},
  userEvents: [],
  bookedEvents: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<User[]>) => {
      state.user = action.payload;
    },
    setUserEvents: (state, action) => {
      state.userEvents = action.payload;
    },
    setBookEvents: (state, action) => {
      state.bookedEvents = action.payload;
    },
  },
});

export const { setUsers, setUser, setUserEvents, setBookEvents } =
  userSlice.actions;

export default userSlice.reducer;

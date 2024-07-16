import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  user: object;
}

const initialState: UsersState = {
  users: [],
  user: {},
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
  },
});

export const { setUsers, setUser } = userSlice.actions;

export default userSlice.reducer;

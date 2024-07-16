import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
  token: string;
  user_mail: string;
  userId: string;
}

export interface AuthState {
  auth: Auth[];
}

const initialState: AuthState = {
  auth: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth[]>) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

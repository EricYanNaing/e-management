import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user_mail: string;
  token: string;
  userId: string;
}

const initialState: AuthState = {
  user_mail: "",
  token: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginReducer: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.user_mail = action.payload.user_mail;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("user_mail", state.user_mail);
    },
    setLogOutReducer: (state) => {
      state.token = "";
      state.userId = "";
      state.user_mail = "";
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user_mail");
    },
  },
});

export const { setLoginReducer, setLogOutReducer } = authSlice.actions;

export default authSlice.reducer;

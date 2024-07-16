import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducer/events";
import userReducer from "./reducer/user";
import authReducer from "./reducer/auth";

const rootReducer = combineReducers({
  eventData: eventReducer,
  userData: userReducer,
  authData: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

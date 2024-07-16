import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducer/events";

const rootReducer = combineReducers({
  eventData: eventReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  _id: string;
  title: string;
  place: string;
  description: string;
  date: string;
  time: string;
  ga_quantity: number;
  ga_price: number;
  vip_quantity: number;
  vip_price: number;
  profile_image: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventsState {
  events: Event[];
  event: object;
}

const initialState: EventsState = {
  events: [],
  event: {},
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setEvent: (state, action: PayloadAction<Event[]>) => {
      state.event = action.payload;
    },
  },
});

export const { setEvents, setEvent } = eventSlice.actions;

export default eventSlice.reducer;

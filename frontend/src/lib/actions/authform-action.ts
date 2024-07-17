import { Dispatch } from "@reduxjs/toolkit";
import { AuthValuesProps } from "../types/authformprops";
import { setBookEvents, setUsers } from "../store/reducer/user";

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

export const bookEvent = async (
  userId: string,
  eventId: string,
  ticketType: string,
  closeModal: () => void
) => {
  console.log(userId, eventId, "BOOKEND IDSS");
  try {
    const response = await fetch("http://localhost:8000/bookevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId, ticketType }),
    });

    if (!response.ok) {
      throw new Error("Failed to book event");
    }

    const data = await response.json();
    alert("Event is booked.");
    closeModal();
    console.log(data.message);
  } catch (error) {
    console.error("Error booking event:", error);
  }
};

export const getBookedEvents = async (userId: string, dispatch: Dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/bookedEvents/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch booked events");
    }
    const { bookedEvents } = await response.json();
    console.log(bookedEvents, "BOOKED EVENTS");
    dispatch(setBookEvents(bookedEvents));
  } catch (error) {
    console.error("Error fetching booked events:", error);
  }
};

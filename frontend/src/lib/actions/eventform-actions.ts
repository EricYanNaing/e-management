import { Dispatch } from "redux";
import { setEvents } from "../store/reducer/events";
import { setUserEvents } from "../store/reducer/user";

export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
) => {
  if (!e.target.files) return;

  const selectedImage = e.target.files[0];
  if (selectedImage) {
    console.log(selectedImage);
    //   setIsImage(true);
    setFieldValue("profile_image", selectedImage);
  }
};

export const handleOnDateChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
) => {
  console.log(e.target.value);
  // console.log(setFieldValue);
};

export const handleOnTimeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
) => {
  console.log(e.target.value);
  // console.log(setFieldValue);
};

export const getEvents = async (
  dispatch: Dispatch,
  token: string,
  pageNum: number,
  searchQuery: string = ""
) => {
  try {
    const response = await fetch(
      `http://localhost:8000/events?page=${pageNum}&search=${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const { events, totalEvents, totalPages } = await response.json();
    dispatch(setEvents(events));
    return { totalEvents, totalPages };
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

/// USER's EVENTS
export const getUserEvents = async (
  dispatch: Dispatch,
  token: string,
  userId: string,
  pageNum: number
) => {
  try {
    const response = await fetch(
      `http://localhost:8000/myevents?page=${pageNum}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    const { events, totalEvents, totalPages } = data;

    if (!events || events.length === 0) {
      console.log("No events found for this user");
    } else {
      dispatch(setUserEvents(events));
      return { totalEvents, totalPages };
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

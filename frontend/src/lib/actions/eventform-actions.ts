import { Dispatch } from "redux";
import { setEvents } from "../store/reducer/events";

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

export const getEvents = async (dispatch: Dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/events");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const { events } = await response.json();
    dispatch(setEvents(events));
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

import { CiCircleCheck } from "react-icons/ci";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import StyleErrorMesg from "./StyleErrorMesg";
import { formatDate, formatTime } from "../../lib/utils/utils";
import { EventFormSchema } from "../../lib/formSchema";
import {
  handleImageChange,
  handleOnDateChange,
  handleOnTimeChange,
} from "../../lib/actions/eventform-actions";
import { FromValuesProps } from "../../lib/types/eventformprops";
import { useEffect, useState } from "react";

const EventForm = ({ isCreate }: { isCreate: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [oldEventInfo, setOldEventInfo] = useState();
  const { id } = useParams();
  const getEventInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setOldEventInfo(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getEventInfo();
    setLoading(false);
  }, []);

  const initialValues: FromValuesProps = {
    title: isCreate ? "" : oldEventInfo?.title,
    ga_quantity: isCreate ? 1 : oldEventInfo?.ga_quantity,
    ga_price: isCreate ? 0 : oldEventInfo?.ga_price,
    vip_quantity: isCreate ? 1 : oldEventInfo?.vip_quantity,
    vip_price: isCreate ? 0 : oldEventInfo?.vip_price,
    place: isCreate ? "" : oldEventInfo?.place,
    description: isCreate ? "" : oldEventInfo?.description,
    date: isCreate ? formatDate(new Date()) : oldEventInfo?.date,
    time: isCreate ? formatTime(new Date()) : oldEventInfo?.time,
    profile_image: isCreate ? null : oldEventInfo?.profile_image,
    _id: isCreate ? "" : oldEventInfo?._id,
    createdAt: isCreate ? "" : oldEventInfo?.createdAt,
    updatedAt: isCreate ? "" : oldEventInfo?.updatedAt,
  };

  const submitHandler = async (values: FromValuesProps) => {
    const formData = new FormData();
    formData.append("_id", values._id);
    formData.append("title", values.title);
    formData.append("place", values.place);
    formData.append(
      "profile_image",
      !oldEventInfo ? values.profile_image : oldEventInfo.profile_image
    );
    formData.append("description", values.description);
    formData.append("ga_price", values.ga_price);
    formData.append("ga_quantity", values.ga_quantity);
    formData.append("vip_price", values.vip_price);
    formData.append("vip_quantity", values.vip_quantity);
    formData.append("date", values.date);
    formData.append("time", values.time);
    if (isCreate) {
      // Create form
      try {
        const response = await fetch("http://localhost:8000/create-event", {
          method: "POST",
          body: formData,
        });

        if (response.status === 201 || response.status === 200) {
          window.alert("Event Created.");
          window.location.href = "http://localhost:5173";
        } else {
          window.alert("Someting went wrong !");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        window.alert("Auth Failed!!!");
      }
    } else {
      // Edit form
      console.log(values);
      try {
        const response = await fetch("http://localhost:8000/edit", {
          method: "PUT",
          body: formData,
        });

        if (response.status === 201 || response.status === 200) {
          window.alert("Event Updated.");
          window.location.href = "http://localhost:5173";
        } else {
          window.alert("Someting went wrong !");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        window.alert("Auth Failed!!!");
      }
    }
  };

  return (
    <>
      {!loading && (
        <div className="bg-white px-6 py-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-2xl text-center flex items-center justify-center">
            <h2 className="text-3xl  font-bold tracking-tight text-gray-900 sm:text-4xl">
              {isCreate ? "Create Your Event" : "Edit Your Event"}
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={EventFormSchema}
            onSubmit={submitHandler}
            enableReinitialize={true}
          >
            {({ setFieldValue }) => (
              <Form
                encType="multipart/form-data"
                className="mx-auto mt-16 max-w-xl sm:mt-20"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-semibold leading-6 text-black"
                    >
                      Event Name
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        placeholder="event name"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="title" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold leading-6 ">
                      Event Place
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="text"
                        placeholder="event place"
                        name="place"
                        id="place"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="place" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      GA Tickets Quantity
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="number"
                        name="ga_quantity"
                        min={1}
                        placeholder="GA Quantity"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="ga_quantity" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      GA Tickets Price
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="number"
                        min={1}
                        name="ga_price"
                        placeholder="VIP Ticket Price"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="ga_price" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      VIP Tickets Quantity
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="number"
                        name="vip_quantity"
                        min={1}
                        placeholder="GA Quantity"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="vip_quantity" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      VIP Tickets Price
                    </label>
                    <div className="mt-2.5">
                      <Field
                        type="number"
                        name="vip_price"
                        min={1}
                        placeholder="VIP Ticket Price"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="vip_price" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold leading-6 ">
                      Event Description
                    </label>
                    <div className="mt-2.5">
                      <Field
                        as="textarea"
                        placeholder="event description"
                        name="description"
                        id="description"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></Field>
                      <StyleErrorMesg name="description" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      Event Date
                    </label>
                    <div className="mt-2.5">
                      <Field
                        onChange={(e) => handleOnDateChange(e, setFieldValue)}
                        type="date"
                        name="date"
                        placeholder="event date"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="date" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      Event Time
                    </label>
                    <div className="mt-2.5">
                      <Field
                        onChange={(e) => handleOnTimeChange(e, setFieldValue)}
                        type="time"
                        name="time"
                        placeholder="event time"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="time" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-black">
                      Event Photo
                    </label>
                    <div className="mt-2.5">
                      <input
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                        type="file"
                        name="last-name"
                        placeholder="event time"
                        className="block w-full rounded-md border px-3.5 py-2 border-red-100 text-gray-900 shadow-s   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      <StyleErrorMesg name="profile_image" />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="flex justify-center gap-2 items-center w-full rounded-md bg-red-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CiCircleCheck size={30} />{" "}
                    {isCreate ? "Create Event" : "Update Event"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default EventForm;

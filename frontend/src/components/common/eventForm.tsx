import { CiCircleCheck } from "react-icons/ci";
import { Formik, Form, Field } from "formik";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import StyleErrorMesg from "./StyleErrorMesg";
import { formatDate, formatTime } from "../../lib/utils/utils";
import { EventFormSchema } from "../../lib/formSchema";
import {
  handleImageChange,
  handleOnDateChange,
  handleOnTimeChange,
} from "../../lib/actions/eventform-actions";
import { FromValuesProps } from "../../lib/types/eventformprops";

const EventForm = ({ isCreate }: { isCreate: boolean }) => {
  const initialValues: FromValuesProps = {
    title: "",
    ga_quantity: 1,
    ga_price: null,
    vip_quantity: 1,
    vip_price: null,
    place: "",
    description: "",
    date: formatDate(new Date()),
    time: formatTime(new Date()),
    profile_image: null,
  };

  const submitHandler = (values: FromValuesProps) => {
    console.log(values);
    if (isCreate) {
      // Create form
      console.log(values);
    } else {
      // Edit form
      console.log(values);
    }
  };

  return (
    <div className="bg-white px-6 py-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-2xl text-center flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create Your Event{" "}
        </h2>
        <Link to={"/"}>
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 p-2 text-white rounded-full">
            <IoArrowBackCircleSharp className="text-white" size={30} />
            Back
          </button>
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={EventFormSchema}
        onSubmit={submitHandler}
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
                    name="ga_quantity"
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
                <CiCircleCheck size={30} /> Create Event
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;

import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

export const EventFormSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must have at least 3 characters.")
    .required("Title is required."),
  place: Yup.string()
    .min(3, "Place must have at least 3 characters.")
    .required("Place is required."),
  ga_quantity: Yup.number().required("GA Quantity is required."),
  ga_price: Yup.number().required("GA Ticket Price is required."),
  vip_quantity: Yup.number().required("GA Quantity is required."),
  vip_price: Yup.number().required("GA Ticket Price is required."),
  description: Yup.string()
    .min(5, "Description must have at least 5 characters.")
    .required("Description is required."),
  date: Yup.date().required("Date is required."),
  time: Yup.string().required("Time is required."),
  profile_image: Yup.mixed()
    .nullable()
    .test(
      "FILE_FORMAT",
      "File type is not supported.",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    ),
});

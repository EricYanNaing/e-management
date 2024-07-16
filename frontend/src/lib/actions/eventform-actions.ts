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

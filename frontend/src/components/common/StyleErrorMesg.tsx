import { ErrorMessage } from "formik";

const StyleErrorMesg = ({ name }: { name: string }) => {
  return (
    <div className="text-red-600 font-bold font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyleErrorMesg;

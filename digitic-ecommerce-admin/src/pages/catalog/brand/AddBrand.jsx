import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  createBrand,
  resetStateBrand,
} from "../../../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand title is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
    },
  });

  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, message } = newBrand;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding brand...");
    }
    if (isSuccess && createdBrand) {
      toast.dismiss();
      toast.success("Brand added successfully");
      dispatch(resetStateBrand());
      formik.resetForm();
      navigate("/admin/brands");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    isLoading,
    dispatch,
    isSuccess,
    message,
    navigate,
    formik,
    isError,
    createdBrand,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div className="">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div className="">
            <CustomInput
              type="text"
              label="Enter Brand Title"
              name="title"
              value={formik.values.title}
              i_id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="">
            <button type="submit" className="btn btn-success py-2 px-4">
              Add Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;

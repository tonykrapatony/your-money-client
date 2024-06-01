import * as yup from 'yup';

const validationSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+[.][a-zA-Z]{2,5}$/, 'Enter the correct email address')
      .required('Please enter your email'),
    password: yup
      .string()
      .trim()
      .required('Please enter your password'),
  });
};

export default validationSchema;

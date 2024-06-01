import * as yup from 'yup';

const fieldValidation = () => ({
  firstName: yup
    .string()
    .trim()
    .required('Please enter your name'),
  lastName: yup
    .string()
    .trim()
    .required('Please enter your last name'),
  email: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+[.][a-zA-Z]{2,5}$/, 'Enter the correct email address')
    .required('Please enter your email'),
  phone: yup
    .string()
    .matches(/^[\d+ -]+$/, 'Please enter correct phone')
    .required('Please enter your phone'),
  password: yup
    .string()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, 'Insecure password')
    .min(8, 'Minimum length of 8 characters')
    .max(20, 'Maximum  length of 70 characters')
    .required('Please enter your password'),
});

const validationSchema = () => {
  return yup.object().shape(fieldValidation());
};

export default validationSchema;

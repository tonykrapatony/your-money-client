import * as yup from 'yup';

const fieldValidation = () => ({
  password: yup
    .string()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, 'Insecure password')
    .min(8, 'Minimum length of 8 characters')
    .max(20, 'Maximum  length of 70 characters')
    .required('Please enter your old password'),
  newpassword: yup
    .string()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, 'Insecure password')
    .min(8, 'Minimum length of 8 characters')
    .max(20, 'Maximum  length of 70 characters')
    .required('Please enter your new password'),
});
const validationSchema = (t) => {
  return yup.object().shape(fieldValidation());
};

export default validationSchema;

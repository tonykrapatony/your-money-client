import * as yup from 'yup';

const fieldValidation = () => ({
  firstName: yup
    .string()
    .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
    .min(3, 'Enter at least 3 characters'.replace('field', 3)),
  lastName: yup
    .string()
    .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
    .min(3, 'Enter at least 3 characters'.replace('field', 3)),
  email: yup
    .string()
    .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+[.][a-zA-Z]{2,5}$/, 'Enter the correct email address'),
  phone: yup
    .string()
    .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
    .matches(/^[\d+ -]+$/, 'Please enter correct phone'),
  currency: yup
    .string()
    .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
    .matches(/^[$₴€]+$/, 'Please select currency'),
});
const validationSchema = (t) => {
  return yup.object().shape(fieldValidation());
};

export default validationSchema;

import * as yup from 'yup';

const validationSchema = (t) => {
  return yup.object({
    date: yup
      .string()
      .trim()
      .required('Please enter date'),
    title: yup
      .string()
      .trim()
      .required('Please enter title'),
    value: yup
      .string()
      .matches(/^\d+$/, 'Please enter correct value')
      .required('Please enter value'),
    category: yup
      .string()
      .trim()
      .required('Please select category'),
  });
};

export default validationSchema;

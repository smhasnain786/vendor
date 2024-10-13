import * as yup from 'yup';

const categorySchema = yup.string().required('This field is required');
/* eslint-disable import/prefer-default-export */

export const Categories = async (value) => {
  try {
    await categorySchema.validateSync(value);
    return null; // No errors
  } catch (error) {
    return error.errors[0]; // Return the first validation error
  }
};

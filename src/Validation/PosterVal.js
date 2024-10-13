import * as yup from 'yup';

const schemaPhone = yup.object({
  categoryId: yup.string()
    .required('This field is required'),
  posterIcon: yup.mixed()
    .required('Poster image is required')
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true; // No file provided is also considered valid
      return value.size <= 1024 * 1024; // 1MB limit
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true; // No file provided is also considered valid
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
});

const PosterVal = async (name, value) => {
  try {
    await schemaPhone.validateAt(name, { [name]: value });
    return null; // No errors
  } catch (error) {
    return error.errors[0]; // Return the first validation error
  }
};

export default PosterVal;

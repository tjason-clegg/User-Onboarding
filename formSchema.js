// Here goes the schema for the form
import * as yup from 'yup'

// valid formValues should be like follows:
const formSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .min(3, 'The username must be at least three characters long')
    .required('The username is a required field'),
  email: yup.string()
    .email('The email must be a valid email address')
    .required('The email is a required field'),
  password: yup.string().required('Password is a required field'),
  // tos: yup.string().required('The Terms of Service is required to continue'),
  // ^^ This shouldn't be a string
})

export default formSchema
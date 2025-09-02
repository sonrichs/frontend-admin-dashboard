import * as yup from 'yup';
import type { CreateUser } from '../../../../api/models/User';

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a correct e-mail')
    .required('Please enter an e-mail'),
  name: yup.string().required('Please enter a name'),
});

export const validateCreateUserSchema = async (params: CreateUser) => {
  const options = { abortEarly: false, strict: true };
  return await createUserSchema.validate(params, options);
};

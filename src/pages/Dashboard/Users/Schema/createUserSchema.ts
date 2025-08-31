import * as yup from 'yup';
import type { CreateUser } from '../../../../api/models/User';

export const createUserSchema = yup.object().shape({
  email: yup.string().required(),
  name: yup.string().required(),
});

export const validateCreateUserSchema = async (params: CreateUser) => {
  const options = { abortEarly: false, strict: true };
  return await createUserSchema.validate(params, options);
};

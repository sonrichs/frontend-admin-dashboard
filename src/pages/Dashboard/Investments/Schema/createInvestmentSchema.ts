import * as yup from 'yup';

export const createInvestmentSchema = yup.object().shape({
  stocksAmount: yup.number().min(1).required(),
  projectId: yup.string().uuid().required(),
  userId: yup.string().uuid().required(),
});

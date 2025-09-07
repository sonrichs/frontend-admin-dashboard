import * as yup from 'yup';

export const createProjectSchema = yup.object().shape({
  title: yup.string().required('Please enter a title'),
  description: yup.string().required('Please enter a description'),
  totalStocks: yup.number().min(1).required('Please enter total stocks'),
  stockPrice: yup.number().min(1).required('Please enter stock price'),
  phase: yup.number().min(0).required('Please enter the phase'),
  currency: yup.string(),
  startDate: yup
    .date()
    .required('Please enter start date')
    .min(new Date(), 'Start date cannot be in the past')
    .test(
      'is-valid',
      'Start date must be before end date',
      (value, context) => {
        const { endDate } = context.parent;
        return (
          value instanceof Date && !isNaN(value.getTime()) && value < endDate
        );
      }
    ),
  endDate: yup
    .date()
    .required('Please enter end date')
    .test('is-valid', 'End date must be after start date', (value, context) => {
      const { startDate } = context.parent;
      return (
        value instanceof Date && !isNaN(value.getTime()) && value > startDate
      );
    }),
});

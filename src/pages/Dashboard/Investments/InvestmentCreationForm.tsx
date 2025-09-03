import { useState, type ChangeEvent } from 'react';
import { createInvestmentSchema } from './Schema/createInvestmentSchema';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import type { CreateInvestment } from '../../../api/models/Investment';
import { createInvestment } from '../../../api/resources/investmentApi';

interface InvestmentCreationFormProps {
  closeModal: () => void;
}

export const InvestmentCreationForm = ({
  closeModal,
}: InvestmentCreationFormProps) => {
  const [formData, setFormData] = useState<CreateInvestment>({
    stocksAmount: 1,
    projectId: '',
    userId: '',
  });

  const [formErrors, setFormErrors] = useState({
    stocksAmountError: '',
    projectIdError: '',
    userIdError: '',
  });

  const resetErrors = () => {
    setFormErrors({
      stocksAmountError: '',
      projectIdError: '',
      userIdError: '',
    });
  };

  const resetAndCloseModal = () => {
    closeModal();
    resetErrors();
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      resetErrors();
      await createInvestmentSchema.validate(formData, { abortEarly: false });
      const response = await createInvestment(formData);
      if (!response) {
        toast.error('Error creating investment');
        return;
      }
      toast.success('Investment created successfully');
      closeModal();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {
          stocksAmountError: '',
          projectIdError: '',
          userIdError: '',
        };
        error.inner.forEach((error) => {
          if (error.path === 'stocksAmount')
            errors.stocksAmountError = error.message;
          if (error.path === 'projectId') errors.projectIdError = error.message;
          if (error.path === 'userId') errors.userIdError = error.message;
        });
        setFormErrors(errors);
      } else {
        toast.error('Error creating project');
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleCreateProject}
        className="w-96 space-y-5 rounded bg-white p-6"
      >
        {/* Stocks Amount */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="stocksAmount"
          >
            Stocks Amount
          </label>
          <input
            type="number"
            name="stocksAmount"
            value={formData.stocksAmount}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.stocksAmountError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.stocksAmountError}
            </p>
          )}
        </div>

        {/* Project ID */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="projectId"
          >
            Project ID
          </label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            placeholder="a4df42"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.projectIdError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.projectIdError}
            </p>
          )}
        </div>

        {/* User ID */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            placeholder="b43f97"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.userIdError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.userIdError}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-indigo-500 py-2 font-semibold text-white shadow hover:bg-indigo-600"
          >
            Create
          </button>
          <button
            type="button"
            onClick={resetAndCloseModal}
            className="w-1/2 rounded-xl bg-gray-200 py-2 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

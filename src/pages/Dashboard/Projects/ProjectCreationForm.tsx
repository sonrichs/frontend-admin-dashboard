import { useState, type ChangeEvent } from 'react';
import { createProjectSchema } from './Schema/createProjectSchema';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import type { CreateProject } from '../../../api/models/Project';
import { createProject } from '../../../api/resources/projectApi';

interface ProjectCreationFormProps {
  closeModal: () => void;
}

export const ProjectCreationForm = ({
  closeModal,
}: ProjectCreationFormProps) => {
  const [formData, setFormData] = useState<CreateProject>({
    title: '',
    description: '',
    totalStocks: 0,
    stockPrice: 0,
    phase: 1,
    currency: '',
    startDate: '1900-01-01',
    endDate: '1900-01-01',
  });

  const [formErrors, setFormErrors] = useState({
    titleError: '',
    descriptionError: '',
    totalStocksError: '',
    stockPriceError: '',
    phaseError: '',
    currencyError: '',
    startDateError: '',
    endDateError: '',
  });

  const resetErrors = () => {
    setFormErrors({
      titleError: '',
      descriptionError: '',
      totalStocksError: '',
      stockPriceError: '',
      phaseError: '',
      currencyError: '',
      startDateError: '',
      endDateError: '',
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
      await createProjectSchema.validate(formData, { abortEarly: false });
      const response = await createProject(formData);
      if (!response) {
        toast.error('Error creating project');
        return;
      }
      toast.success('Project created succesfully');
      closeModal();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {
          titleError: '',
          descriptionError: '',
          totalStocksError: '',
          stockPriceError: '',
          phaseError: '',
          currencyError: '',
          startDateError: '',
          endDateError: '',
        };
        error.inner.forEach((error) => {
          if (error.path === 'title') errors.titleError = error.message;
          if (error.path === 'description')
            errors.descriptionError = error.message;
          if (error.path === 'totalStocks')
            errors.totalStocksError = error.message;
          if (error.path === 'stockPrice')
            errors.stockPriceError = error.message;
          if (error.path === 'phase') errors.phaseError = error.message;
          if (error.path === 'currency') errors.currencyError = error.message;
          if (error.path === 'startDate') errors.startDateError = error.message;
          if (error.path === 'endDate') errors.endDateError = error.message;
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
        {/* Title */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Project Alpha"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.titleError && (
            <p className="mt-1 text-sm text-red-600">{formErrors.titleError}</p>
          )}
        </div>

        {/* Description */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Brief project description"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.descriptionError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.descriptionError}
            </p>
          )}
        </div>

        {/* Total Stocks */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="totalStocks"
          >
            Total Stocks
          </label>
          <input
            type="number"
            name="totalStocks"
            value={formData.totalStocks}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.totalStocksError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.totalStocksError}
            </p>
          )}
        </div>

        {/* Stock Price */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="stockPrice"
          >
            Stock Price
          </label>
          <input
            type="number"
            step="0.01"
            name="stockPrice"
            value={formData.stockPrice}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.stockPriceError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.stockPriceError}
            </p>
          )}
        </div>

        {/* Phase */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="phase"
          >
            Phase
          </label>
          <input
            type="number"
            name="phase"
            value={formData.phase}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.phaseError && (
            <p className="mt-1 text-sm text-red-600">{formErrors.phaseError}</p>
          )}
        </div>

        {/* Currency */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="currency"
          >
            Currency
          </label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            placeholder="USD"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.currencyError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.currencyError}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.startDateError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.startDateError}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.endDateError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.endDateError}
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

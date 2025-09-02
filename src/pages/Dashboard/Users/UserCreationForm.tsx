import { useState, type ChangeEvent } from 'react';
import type { CreateUser } from '../../../api/models/User';
import { createUser } from '../../../api/resources/userApi';
import { createUserSchema } from './Schema/createUserSchema';
import * as yup from 'yup';
import toast from 'react-hot-toast';

interface UserCreationFormProps {
  closeModal: () => void;
}

export const UserCreationForm = ({ closeModal }: UserCreationFormProps) => {
  const [formData, setFormData] = useState<CreateUser>({
    email: '',
    name: '',
    password: 'notactive',
    isActive: false,
    isAdmin: false,
  });

  const [formErrors, setFormErrors] = useState({
    emailError: '',
    nameError: '',
  });

  const resetAndCloseModal = () => {
    closeModal();
    setFormErrors({ emailError: '', nameError: '' });
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setFormErrors({ emailError: '', nameError: '' });
      await createUserSchema.validate(formData, { abortEarly: false });
      const response = await createUser(formData);
      if (!response) {
        toast.error('Error creating user');
        return;
      }
      toast.success('User created succesfully');
      closeModal();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = { emailError: '', nameError: '' };
        error.inner.forEach((error) => {
          if (error.path === 'email') errors.emailError = error.message;
          if (error.path === 'name') errors.nameError = error.message;
        });
        setFormErrors(errors);
      } else {
        toast.error('Error creating user');
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleCreateUser}
        className="w-96 space-y-5 rounded bg-white p-6"
      >
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="user@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.emailError && (
            <p className="mt-1 text-sm text-red-600">{formErrors.emailError}</p>
          )}
        </div>
        <div className="text-left">
          <label
            className="font-medium text-gray-600"
            htmlFor="name"
          >
            Fullname
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={handleOnChange}
          />
          {formErrors.nameError && (
            <p className="mt-1 text-sm text-red-600">{formErrors.nameError}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-indigo-500 py-2 font-semibold text-white shadow hover:cursor-pointer hover:bg-indigo-600"
          >
            Create
          </button>
          <button
            type="button"
            onClick={resetAndCloseModal}
            className="w-1/2 rounded-xl bg-gray-200 py-2 font-semibold text-gray-700 hover:cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

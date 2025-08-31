import { useState, type ChangeEvent } from 'react';
import type { CreateUser } from '../../../api/models/User';
import { createUser } from '../../../api/resources/userApi';
import { createUserSchema } from './Schema/createUserSchema';
import * as yup from 'yup';

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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setFormErrors({ emailError: '', nameError: '' });

      await createUserSchema.validate(formData, { abortEarly: false });

      await createUser(formData);
      closeModal();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = { emailError: '', nameError: '' };
        error.inner.forEach((error) => {
          if (error.path === 'email') errors.emailError = error.message;
          if (error.path === 'name') errors.nameError = error.message;
        });
        setFormErrors(errors);
      }
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleCreateUser}
        className="w-80 space-y-2.5 space-x-2.5 rounded bg-white p-6 shadow"
      >
        {formErrors.emailError && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-700">
            {formErrors.emailError}
          </div>
        )}
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => handleOnChange(e)}
        />
        {formErrors.nameError && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-700">
            {formErrors.nameError}
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => handleOnChange(e)}
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
        <button
          onClick={closeModal}
          className="rounded bg-emerald-200 px-4 py-2 font-bold text-black hover:bg-emerald-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

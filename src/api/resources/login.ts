import AxiosInstance from '../axios';

// No se utiliza de momento.
export const signup = async (email: string, password: string) => {
  try {
    const response = await AxiosInstance.post('/auth/signup', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Signup failed');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await AxiosInstance.post('/auth/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
};

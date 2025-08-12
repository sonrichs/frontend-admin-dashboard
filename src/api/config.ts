const envs = import.meta.env;

export const config = {
  backend: {
    baseURL: envs.VITE_BASE_API_URL,
  },
};

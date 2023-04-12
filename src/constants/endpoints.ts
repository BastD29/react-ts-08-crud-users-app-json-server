const ENDPOINTS = {
  BASE_URL: "http://localhost:8000",
  CREATE_USER: "/users",
  UPDATE_USER: (id?: string) => `/users/${id}`,
};

export default ENDPOINTS;

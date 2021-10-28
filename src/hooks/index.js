import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hooks of all apis
const useApi = (sliceName, apiUrl) => {
  const api = axios.create({
    baseURL: apiUrl,
  });

  const loginUser = createAsyncThunk(`${sliceName}/loginUser`, async (data) => {
    const response = await api.post("/loginUser", data);
    return response.data;
  });

  const getUser = createAsyncThunk(`${sliceName}/getUser`, async () => {
    const response = await api.get("/getUser");
    return response.data;
  });

  const spin = createAsyncThunk(`${sliceName}/spin`, async () => {
    const response = await api.get("/spin");
    return response.data;
  });

  const registerUser = createAsyncThunk(
    `${sliceName}/registerUser`,
    async (data) => {
      const response = await api.post("/registerUser", data);
      return response.data;
    }
  );

  const getCountries = createAsyncThunk(
    `${sliceName}/getCountries`,
    async () => {
      const response = await api.get("/all");
      return response.data;
    }
  );

  const getCountry = createAsyncThunk(
    `${sliceName}/getCountry`,
    async (fullname) => {
      const response = await api.get(`/name/${fullname}?fullText=true`);
      return response.data[0];
    }
  );

  return {
    api,
    loginUser,
    getUser,
    spin,
    registerUser,
    getCountries,
    getCountry,
  };
};

export default useApi;

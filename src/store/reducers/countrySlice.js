import { createSlice } from "@reduxjs/toolkit";
import env from "react-dotenv";

import useApi from "../../hooks/index.js";

export const { getCountries, getCountry } = useApi("countrySlice", env.API_URL);

export const countrySlice = createSlice({
  name: "countrySlice",
  initialState: {
    countries: [],
    filteredCountries: [],
    country: undefined,
    status: "idle",
  },
  reducers: {
    clearSelectedCountry(state) {
      state.country = undefined;
    },
    filterCountries(state, action) {
      // Filter countries case insensitively
      state.filteredCountries = state.countries.filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilter(state) {
      // Clear filtered array
      state.filteredCountries = [...state.countries];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = "idle";
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(getCountry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.status = "idle";
        state.country = action.payload;
      });
  },
});

export const { clearSelectedCountry, filterCountries, clearFilter } =
  countrySlice.actions;
export default countrySlice.reducer;

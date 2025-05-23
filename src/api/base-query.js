import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const API_URL = import.meta.env.VITE_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders(headers, { getState }) {
    const { token } = getState().auth;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);

      headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
    return headers;
  },
});

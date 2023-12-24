import { apiSlice } from "./apiSlice";
import { setName } from "./authSlice"; // Import the setName action
const USERS_URL = "http://localhost:8000/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      async onQuerySuccess(data, { dispatch }) {
        // Assuming 'email' is present in the login response
        const email = data.email;
        try {
          const response = await fetch(`${USERS_URL}/${email}`);
          const userData = await response.json();
          const userName = userData.name; // Assuming the response has a 'name' field

          // Dispatch the setName action to store the user's name in the state
          dispatch(setName(userName));
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } =
  usersApiSlice;

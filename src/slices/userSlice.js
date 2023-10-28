import { createSlice } from "@reduxjs/toolkit";

import projectApi from "../services/projectApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(projectApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(projectApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
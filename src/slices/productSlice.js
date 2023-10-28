import { createSlice } from "@reduxjs/toolkit";

import projectApi from "../services/projectApi";

const initialState = [];

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});

export default productSlice.reducer;
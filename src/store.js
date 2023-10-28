import {combineReducers, configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import projectApi from "./services/projectApi";

//persist store imports
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [projectApi.reducerPath]: projectApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [projectApi.reducerPath, "products"],
};

//persist store
const persistentReducer = persistReducer(persistConfig, reducer);

//create store
const store = configureStore({
    reducer: persistentReducer,
    middleware: [thunk, projectApi.middleware],
});

export default store;
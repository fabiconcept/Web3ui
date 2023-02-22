import { configureStore } from "@reduxjs/toolkit";
import { userDetails } from "./slices/userDetails";

const store = configureStore({
    reducer:{userDetails: userDetails.reducer}
});

export default store;
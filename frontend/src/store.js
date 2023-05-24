import { configureStore } from "@reduxjs/toolkit";

import adminSlice from "./slices/adminSlice";
import userSlice from "./slices/userSlice";
import sessionSlice from "./slices/sessionSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    adminSlice: adminSlice,
    userSlice: userSlice,
    sessionSlice: sessionSlice,
    searchSlice: searchSlice,
  },
});

export default store;

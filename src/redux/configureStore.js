import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./searchSlice";
import noteSlice from "./noteSlice";

export default configureStore({
  reducer: {
    notes: noteSlice,
    search: searchSlice.reducer,
  },
});

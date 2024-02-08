import { createSlice } from "@reduxjs/toolkit";
import { FilterNotesThunkMethod } from "./notesThunk";

const initialState = {
  filteredNotes: [],
  loading: false,
};

export const searchSlice = createSlice({
  name: "filteredNotes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(FilterNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(FilterNotesThunkMethod.fulfilled, (state, data) => {
        state.loading = false;
        state.filteredNotes = data.payload;
      })
      .addCase(FilterNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default searchSlice.reducer;

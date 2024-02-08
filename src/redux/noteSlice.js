import { createSlice } from "@reduxjs/toolkit";
import {
  FavoriteNoteThunkMethod,
  UpdateNoteThunkMethod,
  addNoteThunkMethod,
  deleteNoteThunkMethod,
  getNotesThunkMethod,
} from "./notesThunk";

const initialState = {
  notes: [],
  loading: false,
  editNoteData: null,
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    saveEditNote(state, { payload }) {
      state.editNoteData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNoteThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNoteThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNoteThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotesThunkMethod.fulfilled, (state, data) => {
        const { payload } = data;
        state.loading = false;
        state.notes = payload;
      })
      .addCase(getNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteNoteThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNoteThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNoteThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      .addCase(FavoriteNoteThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(FavoriteNoteThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(FavoriteNoteThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      .addCase(UpdateNoteThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateNoteThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateNoteThunkMethod.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { saveEditNote } = noteSlice.actions;
export default noteSlice.reducer;

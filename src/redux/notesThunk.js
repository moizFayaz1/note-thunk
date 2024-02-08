import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const collectionName = "notes";

export const getNotesThunkMethod = createAsyncThunk("getNotes", async () => {
  try {
    let notesDataResponse;
    await getDocs(collection(db, collectionName)).then((querySnapShotData) => {
      notesDataResponse = querySnapShotData.docs.map((singleDocument) => {
        return {
          ...singleDocument.data(),
          id: singleDocument.id,
        };
      });
    });

    return notesDataResponse;
  } catch (e) {
    console.error(e);
  }
});

export const addNoteThunkMethod = createAsyncThunk(
  "addNotes",
  async (data, reduxParameter) => {
    try {
      await addDoc(collection(db, collectionName), data);
      const { dispatch } = reduxParameter;
      dispatch(getNotesThunkMethod());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteNoteThunkMethod = createAsyncThunk(
  "deleteNote",
  async (singleNote, reduxParameter) => {
    const { dispatch } = reduxParameter;
    try {
      const documentRefrence = await doc(db, collectionName, singleNote?.id);
      await deleteDoc(documentRefrence);
      dispatch(getNotesThunkMethod());
    } catch (error) {
      console.error(error);
    }
  }
);

export const FavoriteNoteThunkMethod = createAsyncThunk(
  "FavoriteNote",
  async (singleNote, reduxParameter) => {
    const { dispatch } = reduxParameter;
    try {
      const documentRefrence = await doc(db, collectionName, singleNote?.id);
      await updateDoc(documentRefrence, {
        ...singleNote,
        favorite: !singleNote?.favorite,
      });
      dispatch(getNotesThunkMethod());
    } catch (error) {
      console.error(error);
    }
  }
);

export const FilterNotesThunkMethod = createAsyncThunk(
  "filterNotes",
  async ({ event, notes }, thunkAPI) => {
    try {
      const searchValue = event.target.value.toLowerCase();
      const filteredNotes = await notes.filter((note) =>
        note.title.toLowerCase().includes(searchValue)
      );
      return filteredNotes;
    } catch (error) {
      console.error(error);
    }
  }
);

export const UpdateNoteThunkMethod = createAsyncThunk(
  "UpdateNote",
  async (singleNote, reduxParameter) => {
    const { dispatch } = reduxParameter;
    try {
      const documentRefrence = await doc(db, collectionName, singleNote?.id);
      await updateDoc(documentRefrence, singleNote);
      dispatch(getNotesThunkMethod());
    } catch (error) {
      console.error(error);
    }
  }
);

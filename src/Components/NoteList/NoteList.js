/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FavoriteNoteThunkMethod,
  deleteNoteThunkMethod,
  getNotesThunkMethod,
} from "../../redux/notesThunk";
import { saveEditNote } from "../../redux/noteSlice";
import "./NoteList.css";
import SwitchButton from "../SwitchButton/SwitchButton";

function NoteList({ setSelectedNote }) {
  const { notes = [] } = useSelector((state) => state.notes);
  const { filteredNotes = [] } = useSelector((state) => state.search);
  const [isShowFavoriteNotes, setIsShowFavoriteNotes] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotesThunkMethod());
  }, []);

  // console.log(notes, "note list");

  const editNoteHandler = (event, singleNote) => {
    event.preventDefault();
    dispatch(saveEditNote(singleNote));
  };

  const delteNoteHandler = (event, singleNote) => {
    event.preventDefault();
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteNoteThunkMethod(singleNote));
    }
  };

  const favoriteNoteHandler = (event, singleNote) => {
    event.preventDefault();
    dispatch(FavoriteNoteThunkMethod(singleNote));
  };

  const favoriteNoteCheckboxHandler = (event) => {
    setIsShowFavoriteNotes(event?.target?.checked);
  };

  const notesToRender = filteredNotes.length > 0 ? filteredNotes : notes;

  const notesConverter = isShowFavoriteNotes
    ? notes?.filter((singleNote) => Boolean(singleNote?.favorite))
    : notes;

  const notesToShow = isShowFavoriteNotes ? notesConverter : notesToRender;

  return (
    <div className="noteList">
      <SwitchButton favoriteNoteCheckboxHandler={favoriteNoteCheckboxHandler} />
      {notesToShow?.map((singleNote, index) => {
        return (
          <div className="list" key={singleNote?.id}>
            <div className="column1">
              <div>
                <h3>{singleNote?.title}</h3>
              </div>
              <div>
                <p>{singleNote?.content}</p>
              </div>
            </div>
            <div className="column2">
              <div>
                <box-icon
                  type="solid"
                  name="edit-alt"
                  onClick={(event) => editNoteHandler(event, singleNote)}
                >
                  Edit
                </box-icon>
              </div>
              <div>
                <box-icon
                  name="message-alt-x"
                  onClick={(event) => delteNoteHandler(event, singleNote)}
                >
                  Delete
                </box-icon>
              </div>
              <div>
                <box-icon
                  name="donate-heart"
                  type={singleNote.favorite ? "solid" : "regular"}
                  onClick={(event) => favoriteNoteHandler(event, singleNote)}
                ></box-icon>
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="list">
        <div className="column1">
          <div>
            <h3>New Resolution</h3>
          </div>
          <div>
            <p>You never get your chance back this is what stick me...</p>
          </div>
        </div>
        <div className="column2">
          <div>
            <box-icon type="solid" name="edit-alt"></box-icon>
          </div>
          <div>
            <box-icon name="message-alt-x"></box-icon>
          </div>
          <div>
            <box-icon name="heart"></box-icon>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default NoteList;

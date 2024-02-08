/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterNotesThunkMethod, getNotesThunkMethod  } from "../../redux/notesThunk";
import "./AddNoteBtn.css";

function AddNoteBtn() {
  const { notes = [] } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(FilterNotesThunkMethod({event,notes}));
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getNotesThunkMethod());
  }, []);

  return (
    <div className="AddNoteBtn">
      <input
        type="search"
        placeholder="Search Notes"
        onChange={handleSearchChange}
      />
    </div>
  );
}
export default AddNoteBtn;

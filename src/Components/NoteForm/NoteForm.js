/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateNoteThunkMethod,
  addNoteThunkMethod,
} from "../../redux/notesThunk";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import "./NoteForm.css";

function NoteForm() {
  const [inputFields, setInputFields] = useState({ title: "", content: "" });
  const { loading, editNoteData } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const isEditmode = Boolean(editNoteData);

  useEffect(() => {
    if (editNoteData?.title || editNoteData?.content) {
      setInputFields({
        ...inputFields,
        title: editNoteData?.title,
        content: editNoteData?.content,
      });
    }
  }, [editNoteData]);

  const onFieldsChange = (event) => {
    event.preventDefault();
    const currentElement = event.target;
    setInputFields((previousValue) => ({
      ...previousValue,
      [currentElement.name]: currentElement.value,
    }));
  };

  const addNoteSubmitHandler = async (event) => {
    event.preventDefault();
    const { title, content } = inputFields;
    if (!title || !content) {
      alert("please fill the input values");
      return;
    }

    const payload = {
      title,
      content,
      favorite: false,
    };

    if (isEditmode) {
      const editPayload = {
        ...payload,
        favorite: editNoteData?.favorite,
        id: editNoteData?.id,
      };
      await dispatch(UpdateNoteThunkMethod(editPayload));
    } else {
      await dispatch(addNoteThunkMethod(payload));
    }

    setInputFields({
      title: "",
      content: "",
    });
  };

  return (
    <div className="noteForm">
      <CustomSpinner loading={loading} />
      <h2>{isEditmode ? "update" : "Create"} Note</h2>
      <form onSubmit={addNoteSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Note Title"
          onChange={onFieldsChange}
          value={inputFields.title}
        />
        <textarea
          onChange={onFieldsChange}
          name="content"
          cols="30"
          rows="15"
          placeholder="Note Desciption"
          value={inputFields.content}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NoteForm;

/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./Components/Navbar/Navbar";
import NoteForm from "./Components/NoteForm/NoteForm";
import NoteList from "./Components/NoteList/NoteList";
import AddNoteBtn from "./Components/AddNoteBtn/AddNoteBtn";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <AddNoteBtn />
      <div className="notes-container">
        <NoteForm />
        <NoteList />
      </div>
    </>
  );
}

export default App;

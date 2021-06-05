import "./App.css";
import React from "react";
import NewNote from "./Screens/NewNote";
import Calendar from "./Screens/Calendar";
import AllNotes from "./Screens/AllNotes";
import { NotesStorage } from "./NotesContext";

function App() {
  return (
    <NotesStorage>
      <Calendar />
      <AllNotes />
      <NewNote />
    </NotesStorage>
  );
}

export default App;

import React from "react";
import NoteInput from "../../Components/NoteInput";
import { ToggleVisibility } from "./style";

import { NotesContext } from "../../NotesContext";

const NewNote = () => {
  const [visible, setVisible] = React.useState(false);
  const context = React.useContext(NotesContext);

  const handleSaveNote = (note) => {
    if (note.note.length) {
      note.id = context.lastId;
      context.saveNewNote(note);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <>
        <ToggleVisibility onClick={toggleVisibility}>
          Nova Nota -
        </ToggleVisibility>
        <NoteInput handleSave={handleSaveNote} />
      </>
    );
  }

  return (
    <ToggleVisibility onClick={toggleVisibility}>Nova Nota +</ToggleVisibility>
  );
};

export default NewNote;

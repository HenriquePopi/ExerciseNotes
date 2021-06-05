import React from "react";
import NoteModal from "../../Components/NoteModal";
import { ToggleVisibility, Container } from "./style";
import { NotesContext } from "../../NotesContext";
import NoteInput from "../../Components/NoteInput";
const AllNotes = () => {
  const context = React.useContext(NotesContext);
  const allNotes = context.allIds.map((id) => context.getNoteObject(id));
  const [editingNote, setEditingNote] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const handleDelete = (note) => context.deleteNote(note.id);
  const handleSaveEdition = (note) => {
    if (note.note.length) context.saveNewNote(note);
    setEditingNote(null);
  };
  const startEdittion = (note) => {
    note.note.push({ exercise: "", reps: "" });
    setEditingNote(note);
  };

  if (editingNote) {
    return (
      <>
        <NoteInput
          hasNote={editingNote}
          handleSave={handleSaveEdition}
          handleCancel={() => setEditingNote(null)}
        />
      </>
    );
  }

  if (visible) {
    return (
      <>
        <ToggleVisibility onClick={toggleVisibility}>
          Todas as Notas -
        </ToggleVisibility>
        <Container>
          {allNotes.map((note, i) => (
            <NoteModal
              key={i}
              note={note}
              deleteFnc={() => handleDelete(note)}
              editFnc={() => startEdittion(note)}
            />
          ))}
        </Container>
      </>
    );
  }
  return (
    <ToggleVisibility onClick={toggleVisibility}>
      Todas as Notas +
    </ToggleVisibility>
  );
};

export default AllNotes;

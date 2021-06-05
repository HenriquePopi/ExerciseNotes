import React from "react";

export const NotesContext = React.createContext();

export const NotesStorage = ({ children }) => {
  const [lastId, setLastId] = React.useState(0);

  const [allIds, setAllIds] = React.useState([]);

  const [notesByDay, setNotesByDay] = React.useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const storage = window.localStorage;

  function InitializeNotes() {
    const allNoteIds = getAllIds();
    setAllIds(allNoteIds);
    setNotesByDay(returnNoteByDay(allNoteIds));
    setLastId(getLastid(...allNoteIds));
  }

  React.useEffect(() => {
    InitializeNotes();
  }, []);
  const getLastid = (idsArray) => {
    const last = Math.max(idsArray);
    return last ? last + 1 : 1;
  };
  const getAllIds = () => {
    const arrayOfIds = [];
    for (let key in storage) {
      if (!isNaN(key)) {
        arrayOfIds.push(key);
      }
    }
    return arrayOfIds;
  };

  const returnNoteByDay = (idsArray) => {
    const daysArray = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    idsArray.map((id) => {
      const note = JSON.parse(storage.getItem(id));
      note.days.map((day, i) => (day ? daysArray[i].push(id) : null));
    });
    return daysArray;
  };
  const deleteNote = (id) => {
    storage.removeItem(id);
    InitializeNotes();
  };

  const removeEmptyRows = (note) => {
    const hasEmptyRows = (note) => {
      for (let i = 0; i < note.note.length; i++) {
        if (
          note.note[i].exercise == null ||
          !/\S/.test(note.note[i].exercise)
        ) {
          console.log("tem espaço em branco");
          return { has: true, were: i };
        }
      }
      return { has: false, were: false };
    };
    while (hasEmptyRows(note).has) {
      note.note.splice(hasEmptyRows(note).were, 1);
    }
  };
  const saveNewNote = (note) => {
    removeEmptyRows(note);
    if (note.note.length === 1) {
      deleteNote(note.id);
    } else {
      storage.setItem(note.id, JSON.stringify(note));
      InitializeNotes();
    }
  };
  const getNoteObject = (id) => {
    return JSON.parse(storage.getItem(id));
  };

  return (
    <NotesContext.Provider
      value={{
        allIds,
        saveNewNote,
        notesByDay,
        getNoteObject,
        deleteNote,
        lastId,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

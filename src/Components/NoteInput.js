import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 0 10px;
  min-height: 200px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 7px;
    background: #fff;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border: 1px solid #eee;
    border-radius: 10px;
  }
`;
const Input = styled.input`
  width: 80%;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  color: #35487d;
  border: 1px solid #f6727f;
  margin: 0 0 15px 0;
  &:focus {
    border: 2px solid #35487d;
    outline: none;
  }
`;
const InputNotaName = styled(Input)`
  width: 97%;
  margin: 15px 0 20px 0;
  font-size: 18px;
`;

const InputRepetitions = styled(Input)`
  width: 10%;
  font-size: 12px;
  text-align: center;
  margin-left: 3px;
`;
const Row = styled.div`
  justify-content: space-between;
  display: flex;
  width: 300px;
  margin: 0 auto;
`;
const Button = styled.button`
  height: 35px;
  display: block;
  background-color: #35487d;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  padding: 3px;
  margin: 20px 0;
  transition: 0.3s;
  &:focus:active {
    box-shadow: 1px 1px #f6727f;
    border-color: #35487d;
    background-color: rgba(246, 114, 127);
    color: white;
  }
`;
const Day = styled.span`
  width: calc(300px / 8 - 5px);
  margin-right: 8px;
  padding: 5px 3px;
  text-align: center;
  border: ${(props) =>
    props.selected ? "1px solid #35487d" : "1px solid rgba(246, 114, 127)"};
  color: ${(props) => (props.selected ? "#fff" : " rgba(246, 114, 127)")};
  background-color: ${(props) =>
    props.selected ? "rgba(246, 114, 127)" : "#fff"};
  font-weight: bold;
  border-radius: 3px;
  transition: 0.2s;
  cursor: pointer;
  &:active {
    border-color: #35487d;
    background-color: rgba(246, 114, 127);
    color: white;
  }
`;
const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const NoteInput = ({ handleSave, handleCancel, hasNote }) => {
  const [notaName, setNotaName] = React.useState("");
  const [notaDays, setNotaDay] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [notaRow, setNotaRow] = React.useState([{ exercise: "", reps: "" }]);
  const [showingNewRow, setShowingNewRow] = React.useState(false);

  React.useEffect(() => {
    if (hasNote) {
      setNotaRow(hasNote.note);
      setNotaName(hasNote.name);
      setNotaDay(hasNote.days);
    }
  }, [hasNote]);

  const handleNotaRowChange = (target, key) => {
    const hasEmptyRows = (row) => row.exercise === "";
    notaRow[key].exercise = target.value;
    setNotaRow([...notaRow]);
    if (!showingNewRow && !notaRow.find(hasEmptyRows)) {
      setNotaRow([...notaRow, { exercise: "", reps: "" }]);
      setShowingNewRow(true);
    }
  };
  const handleDaySelection = (day) => {
    notaDays[day] = !notaDays[day];
    setNotaDay([...notaDays]);
  };

  const handleChangeRepetitions = (target, key) => {
    notaRow[key].reps = target.value;
    setNotaRow([...notaRow]);
  };
  const resetStates = () => {
    setNotaRow([{ exercise: "", reps: "" }]);
    setNotaName("");
    setNotaDay([false, false, false, false, false, false, false]);
  };
  const handleSaveNote = () => {
    const note = {
      name: notaName,
      note: notaRow,
      id: hasNote && hasNote.id ? hasNote.id : null,
      days: notaDays,
    };
    handleSave(note);
    resetStates();
  };
  const handleCancelNote = () => {
    resetStates();
    if (handleCancel) handleCancel();
  };
  return (
    <>
      <Container>
        <InputNotaName
          placeholder="Nome da Nota aqui"
          onChange={({ target }) => setNotaName(target.value)}
          value={notaName}
        />
        {notaRow.map((nota, k) => (
          <Row key={k}>
            <Input
              key={k}
              placeholder="Coloca um exercicio aqui!"
              onChange={({ target }) => handleNotaRowChange(target, k)}
              onBlur={() => setShowingNewRow(false)}
              value={nota.exercise}
            />
            <InputRepetitions
              onChange={({ target }) => handleChangeRepetitions(target, k)}
              placeholder="reps"
              value={nota.reps}
            />
          </Row>
        ))}

        {weekDays.map((day, i) => (
          <Day
            key={day}
            selected={notaDays[i]}
            onClick={() => handleDaySelection(i)}
          >
            {day}
          </Day>
        ))}
      </Container>
      <Row>
        <Button onClick={handleSaveNote}>Salvar</Button>
        <Button onClick={handleCancelNote}>Cancelar</Button>
      </Row>
    </>
  );
};

export default NoteInput;

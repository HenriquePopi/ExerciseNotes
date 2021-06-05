import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 290px;
  margin: 15px auto;
  padding: 0 5px;
  position: relative;
  border-radius: 5px;
  border: 1px solid #f67270;
`;
const Name = styled.p`
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
  text-transform: capitalize;
`;
const Separador = styled.div`
  height: 2px;
  width: 100%;
  background-color: #f67270;
`;
const CloseModal = styled.div`
  width: 25px;
  height: 25px;
  border: 2px solid #f67270;
  border-radius: 5px;
  position: relative;
  margin-top: 15px;
  right: -250px;
  cursor: pointer;
  ::after {
    content: "";
    width: 2px;
    height: 20px;
    background-color: black;
    position: absolute;
    right: 50%;
    transform: rotate(45deg);
    top: 2px;
  }
  ::before {
    content: "";
    width: 2px;
    height: 20px;
    background-color: black;
    position: absolute;
    right: 50%;
    top: 2px;
    transform: rotate(-45deg);
  }
`;

const Btn = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid none;
  background-color: #35487d;
  color: #fff;
`;

///////////////////////////////////////////////////////////////////

const Row = styled.span`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  line-height: 20px;
`;
const SeparatorRow = styled(Row)`
  &:nth-child(even) {
    border: 1px solid #35487d;
    border-radius: 4px;
  }
`;
const Exercise = styled.p`
  font-size: 16px;
  font-weight: 400;
  padding-left: 15px;
`;
const Reps = styled.p`
  font-size: 12px;
  font-weight: 300;
  padding-right: 10px;
`;
const ExerciseRow = ({ noteRows }) => {
  return (
    <>
      <Row>
        <Exercise>
          <b>Exercicio</b>
        </Exercise>
        <Reps>
          <b>Reps</b>
        </Reps>
      </Row>
      {noteRows.map((noteRow, i) => (
        <SeparatorRow key={i + "Row"}>
          <Exercise>{noteRow.exercise}</Exercise>
          <Reps>{noteRow.reps}</Reps>
        </SeparatorRow>
      ))}
    </>
  );
};
const NoteModal = ({ note, closeModal, editFnc, deleteFnc }) => {
  if (note)
    return (
      <Container>
        {closeModal && <CloseModal onClick={closeModal} />}
        <Name>{note.name}</Name>
        <Separador />
        <ExerciseRow noteRows={note.note} />
        <Row>
          {editFnc && <Btn onClick={editFnc}>Edit</Btn>}
          {deleteFnc && <Btn onClick={deleteFnc}>Delete</Btn>}
        </Row>
      </Container>
    );
  return null;
};

export default NoteModal;

import React from "react";
import {
  CalendarContainer,
  Day,
  Today,
  DayName,
  Month,
  ToggleVisibility,
  OpacityDay,
} from "./style";
import NoteModal from "../../Components/NoteModal";
import { NotesContext } from "../../NotesContext";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const daysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const thisDayInWeek = (day, today) => {
  return new Date(today.getFullYear(), today.getMonth(), day).getDay();
};

const lastThisNextMonths = (date) => {
  const daysInThisMonth = [];
  for (let i = 1; i <= daysInMonth(date); i++) daysInThisMonth.push(i);

  const daysFromLastMonth = [];
  for (let i = 0; i < thisDayInWeek(1, date); i++) {
    daysFromLastMonth.unshift(daysInMonth(date) + 1 - i);
  }

  const daysInNextMonth = [];
  const fillTheEmptySpace = Math.abs(
    daysInThisMonth.length + daysFromLastMonth.length - 35
  );
  for (let i = 1; i <= fillTheEmptySpace; i++) {
    daysInNextMonth.push(i);
  }

  return [daysFromLastMonth, daysInThisMonth, daysInNextMonth];
};

const Calendar = () => {
  const context = React.useContext(NotesContext);
  const [lastMonth, thisMonth, nextMonth] = lastThisNextMonths(new Date());
  const [notesModalItens, setNotesModalItens] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
  const showModal = (idsArray) => {
    const notesArray = idsArray.map((id) => context.getNoteObject(id));
    setNotesModalItens(notesArray);
  };
  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  if (notesModalItens.length) {
    return (
      <>
        {notesModalItens.map((note, i) => (
          <NoteModal
            key={i}
            note={note}
            closeModal={() => setNotesModalItens([])}
          />
        ))}
        <ToggleVisibility onClick={() => setNotesModalItens([])}>
          Calendario +
        </ToggleVisibility>
      </>
    );
  }
  if (visible) {
    return (
      <>
        <ToggleVisibility onClick={handleToggleVisibility}>
          Calendario -
        </ToggleVisibility>
        <CalendarContainer>
          <Month>{months[new Date().getMonth() + 1]}</Month>
          {weekDays.map((dayName, dayIndex) => (
            <DayName
              key={dayIndex}
              hasTraine={context.notesByDay[dayIndex].length}
              onClick={() => showModal(context.notesByDay[dayIndex])}
            >
              {dayName}
            </DayName>
          ))}
          {lastMonth.map((day) => (
            <OpacityDay key={day}>{day}</OpacityDay>
          ))}
          {thisMonth.map((day) =>
            day === new Date().getDate() ? (
              <Today key={day}>{day}</Today>
            ) : (
              <Day key={day}>{day}</Day>
            )
          )}
          {nextMonth.map((day) => (
            <OpacityDay key={day}>{day}</OpacityDay>
          ))}
        </CalendarContainer>
      </>
    );
  }

  return (
    <ToggleVisibility onClick={handleToggleVisibility}>
      Calendario +
    </ToggleVisibility>
  );
};

export default Calendar;

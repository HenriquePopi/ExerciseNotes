// import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 0 10px;
  flex: 1;
`;

export const CalendarContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border: 2px solid rgba(246, 114, 127);
  border-radius: 10px;
`;

export const Day = styled.span`
  width: calc(300px / 8 - 5px);
  margin-right: 5px;
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid rgba(246, 114, 127);
  color: rgba(246, 114, 127);
  border-radius: 3px;
  transition: 0.2s;
  cursor: pointer;
  position: relative;
  /* &:active {
    border-color: #35487d;
    background-color: rgba(246, 114, 127);
    color: white;
  } */
  &:after {
    content: "";
    display: ${(props) => (props.hasTraine ? "block" : "none")};
    height: 6px;
    width: 2px;
    background-color: rgba(246, 114, 127);
    margin: 2px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;
export const Today = styled(Day)`
  border-color: #35487d;
  background-color: rgba(246, 114, 127);
  color: white;
  font-weight: bolder;
`;

export const OpacityDay = styled(Day)`
  border: 1px solid rgba(246, 114, 127, 0.3);
  color: rgba(246, 114, 127, 0.3);
`;
export const DayName = styled(Day)`
  border: 1px solid #35487d;
  color: #35487d;
  font-size: 20px;
  background: white;
  margin-bottom: 10px;
  padding: 4px 0;
`;
export const Month = styled.div`
  width: 100%;
  font-size: 28px;
  color: #35487d;
  border-bottom: 2px solid rgba(246, 114, 127);
  padding: 5px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: -2px;
`;

export const ToggleVisibility = styled.button`
  width: 325px;
  margin: 10px auto 0 auto;
  background: rgb(53, 72, 125);
  display: block;
  background: linear-gradient(15deg, rgba(53, 72, 125, 1) 7%);
  min-height: 45px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 25px;
  letter-spacing: 1.2px;
`;

import styled from "styled-components";

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

export const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0 auto;
  padding: 0 10px;
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

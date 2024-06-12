import NavBar from "../components/NavBar"
import Home from "../components/Home"

import styled from "styled-components"
import { selectCurrentUser } from "../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCurrentWs } from "../store/webSocket/ws.action";
import { selectCurrentWs } from "../store/webSocket/ws.selector";

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Loader = styled.div`
  display: block;
  border: 6px solid #f3f3f3;
  border-top: 6px solid var(--gray);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin .8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: black;
    width: 100%;
    min-height: 100vh;
`;
const Uesr = () => {
  const user = useSelector(selectCurrentUser)

  return (
    <UserContainer >
      <NavBar user ={user}/>
      <Home/>
  </UserContainer>
  )
}

export default Uesr
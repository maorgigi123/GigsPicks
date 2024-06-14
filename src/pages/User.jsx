import NavBar from "../components/NavBar"
import Home from "../components/Home"

import styled from "styled-components"
import { selectCurrentUser } from "../store/user/user.selector";
import { useSelector } from "react-redux";
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
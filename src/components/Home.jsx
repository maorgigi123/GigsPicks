import Posts from "./Posts";
import Stories from "./Stories";

import styled from "styled-components"

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 100px;
  width: 650px;
  max-width: 650px;
  @media screen and (max-width: 1300px) {
    margin-left: 0px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
        <Stories/>
        <Posts/>
    </HomeContainer>
    
  )
}

export default Home
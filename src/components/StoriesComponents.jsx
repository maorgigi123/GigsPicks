
import ProfileImage from "./ProfileImage";
import styled from "styled-components"
import { nanoid } from "nanoid";
const StoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;
const StoryImage = styled.div`
  margin-right: 5spx;
`

const StoryName = styled.p`
  font-weight: 400; 
  font-size:0.9em;
  width: 90px;
  margin-top: 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left:20px;
`;




const StoriesComponents = ({stories}) => {
  return (
    
    <>
      {
        stories.map((storie)=> {
          return (
            <StoryContainer key={nanoid()}>
              <StoryImage>
                <ProfileImage user={storie}/>
              </StoryImage>
              
            
            <StoryName>{storie.user_name}</StoryName>
          </StoryContainer>
          )
        })
      }
    </>
  )
    
    
  
}

export default StoriesComponents
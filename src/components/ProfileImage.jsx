import styled, { keyframes } from "styled-components"
const HandleCheckAuth = (closeFreinds,view) => {
    if(!view && closeFreinds) {
      return ` background: -moz-linear-gradient(45deg, #17e4c9 0%, #09e192 25%, #08b65f 50%, #11d14e 75%, #02f770 100%); 
      background: -webkit-linear-gradient(45deg, #17e4c9 0%, #09e192 25%, #08b65f 50%, #11d14e 75%, #02f770 100%); 
      background: linear-gradient(45deg, #17e4c9 0%, #09e192 25%, #08b65f 50%, #11d14e 75%, #02f770 100%); `
    }
  
    if(!view) {
      return `background: -moz-linear-gradient(45deg, #e48117 0%, #e14309 25%, #e20c2c 50%,#d81361 75%, #ee09a5 100%);
      background: -webkit-linear-gradient(45deg, #e48117 0%, #e14309 25%, #e20c2c 50%,#d81361 75%, #ee09a5 100%);
      background: linear-gradient(45deg, #e48117 0%, #e14309 25%, #e20c2c 50%,#d81361 75%, #ee09a5 100%);
    `
    }
    
  }
  
  const StoryImage = styled.img`
    height: ${props => props.size}px;
    width: ${props => props.size}px;;
    border-radius: 50%;
    position: absolute; 
    z-index: 1;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);

  `;
  

  const Outer_circle = styled.div`
      height: ${props => props.$outlineSize}px;
      width: ${props => props.$outlineSize}px;
      border-radius: 50%;
      background: rgba(111, 102, 102, 0.9); 
  
     ${(props) =>HandleCheckAuth(props.$closeFreinds,props.$view)}
        
      position: relative;
      cursor: pointer;
  `;
const ProfileImage = ({user,size=50,outlineSize=56}) => {
    if(!user)
        return
    return (
        <Outer_circle $closeFreinds= {'true'} $view={'true'} $outlineSize={outlineSize}>
                    <StoryImage loading="lazy" src={user.profile_img} size={size} />
        </Outer_circle>
    
      )

   
}

export default ProfileImage
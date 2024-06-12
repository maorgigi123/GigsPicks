import { useSelector } from "react-redux";
import styled from "styled-components"
import { selectCurrentUser } from "../../store/user/user.selector";
import { formatTimestamp } from "../../utils/CalcDate";

const MessageContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    gap:10px;
`;

const ProfileImg = styled.img`
    width: 30px;
    height:30px;
    border-radius:50%;
    margin-left: 20px;
    margin-right: 20px;
`;
const TimeSend = styled.p`
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`;
const MessageContainerItem = styled.div`
    display:flex;
    flex-direction: ${({$user,$messageUser}) => $user === $messageUser? 'row-reverse' : 'row'};
    align-items: center;

`;
const MessageContent = styled.p`
    background-color: var(--gray);
    padding: 8px;
    border-radius: 12px;
    font-size: .8em;
`;


const Message = ({message,profile_img}) => {
    const user = useSelector(selectCurrentUser)
  return (
    <MessageContainer>
        <TimeSend>{formatTimestamp(message.timestamp)}</TimeSend>
        <MessageContainerItem $messageUser={message.sender.username? message.sender.username : message.sender} $user={user && user.username}>
            <ProfileImg src={message.sender.profile_img ? message.sender.profile_img : profile_img}/>
            <MessageContent>{message.content}</MessageContent>
        </MessageContainerItem>
       
    </MessageContainer>
  )
}

export default Message
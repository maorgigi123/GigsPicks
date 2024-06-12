import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { selectCurrentUser } from "../../store/user/user.selector";
import { CalcData } from "../../utils/CalcDate";

const MessageContainer = styled.div`
    margin-top: 12px;
    display: flex;
    gap:10px;
    cursor: pointer;
    &:hover{
        background-color: var(--gray);
    }
`;

const ProfileImageContainer = styled.div`
    padding: 12px 0px 0px 12px;
`;
const ProfileImage = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

const ProfileUserInfoContainer = styled.div`
     padding: 12px 0px 0px 12px;
     display: flex;
     flex-direction: column;
     gap: 5px;
`;
const ProfileName = styled.p``;

const ProfileLastMessageContainer = styled.div`
    display: flex;
    color: #898181;
    font-size: .9em;
`;
const ProfileLastMessage = styled.p``;
const ProfileLastTimeMessage = styled.p`

`;


const MessageComponent = ({index,data}) => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser)
    const recipient = data.participants.filter((_user) => (_user.username !== user.username))[0]
    const sender = data.participants.filter((_user) => (_user.username === user.username))[0]
  return (
    <MessageContainer onClick={() => navigate(recipient.username,{ state: ({username: recipient.username,profile_img: recipient.profile_img,_id:recipient._id,messages:data.messages}) })}>
        <ProfileImageContainer>
            <ProfileImage src={recipient.profile_img} />
        </ProfileImageContainer>
        <ProfileUserInfoContainer>
            <ProfileName>{recipient.username}</ProfileName>
            <ProfileLastMessageContainer>
                <ProfileLastMessage>{data.messages.length > 0 && data.messages[data.messages.length-1].content}</ProfileLastMessage>
                <ProfileLastTimeMessage>.{data.messages.length > 0 &&  CalcData(data.messages[data.messages.length-1].timestamp)}</ProfileLastTimeMessage>
            </ProfileLastMessageContainer>
        </ProfileUserInfoContainer>
    </MessageContainer>
  )
}

export default MessageComponent
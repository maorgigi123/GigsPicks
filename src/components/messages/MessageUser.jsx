import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMessages, selectCurrentUser } from "../../store/user/user.selector";
import { selectCurrentWs } from "../../store/webSocket/ws.selector";
import React, { memo } from 'react';
import { setAddMessage } from "../../store/user/user.action";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    flex: 2;
`;
const MessageUserContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`;

const MessageUserInfoTop = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
`;

const MessageUserInfoTopContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 12px 0px 12px 12px;
`;
const MessageUserInfoTopImg = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
`;
const MessageUserInfoTopName = styled.p`
    font-weight: bold;
    font-size: 1.2em;
`;

const MessageTopRightIconsContainer = styled.div`
    padding: 12px 0px 12px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 12px;
`;

const Icon = styled.svg`
    cursor: pointer;
`;



const MessagesContainer = styled.div`
    display:flex;
    justify-content: ${({$messages}) => $messages.length > 0 ? 'start' : 'center'};
    align-items: ${({$messages}) => $messages.length > 0 ? 'start' : 'center'};
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    height: 85%;
    gap:10px;
`;

const NoMessagesYet = styled.h1`
    font-size:3em;
`;

const InputContainer = styled.div`
    padding:12px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    border-radius: 22px;
    margin:12px;
`;
const Input = styled.input`
    width: 100%;
    height: 40px;
    background-color: transparent;
    padding: 12px;
    border:none;
    color:white;
    font-size: 1.2em;
    flex: 1;
    &:focus{
        outline: none; /* Remove the default outline */
        box-shadow: none; /* Remove any default box-shadow */
    }
    
`;


const SmileComments = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
`;
const EmojiPickerButton = styled(EmojiPicker)`
  top: -490px;
`;

const IconsInputMessage = styled.div`
    display:flex;
    gap:10px;
    margin-right:12px;
`;

const IconsContainer = styled.div`
    display:block;
`
const LabelSend = styled.label`
display: none;
cursor: pointer;
    font-weight: bold;
    color: var(--primary-button);
    &:hover{
        color: var(--primary-button-hover);
    }
`;


const MessageUser = () => {
    const messageInput = useRef()
    const SendRef =useRef();
    const IconsRef = useRef()
    const location = useLocation();
    const user = location.state;
    const currentUesr = useSelector(selectCurrentUser)
    const ws = useSelector(selectCurrentWs);
    const navigate = useNavigate()

    const messages = useSelector(selectCurrentMessages)
    const dispatch = useDispatch()
    const scrollToBottomRef = useRef(null);
    const scrollToBottom = () => {
        if (scrollToBottomRef.current) {
            scrollToBottomRef.current.scrollTop = scrollToBottomRef.current.scrollHeight;
        }
      };
      useEffect(() => {
        scrollToBottom()
      },[messages,scrollToBottomRef.current,location])

    const handleOnChangeInput = (e) => {
        if(messageInput.current.value.length >0)
        {
            SendRef.current.style.display = 'block';
            IconsRef.current.style.display='none'
        }
        else{
            SendRef.current.style.display = 'none';
            IconsRef.current.style.display='block'
        }
    }
    useEffect(() => {
        if(!currentUesr) navigate('/')
    },[currentUesr])
    const handleSendMessage = () => {
        if(messageInput.current &&  messageInput.current.value.length <= 0) return;

        if (ws.currentWs && ws.currentWs.readyState === WebSocket.OPEN) {
            const Sendmessage = {message: {send:currentUesr._id,recipient:user._id,content:messageInput.current.value,recipientName:user.username,newMessage:{
                sender:currentUesr,
                recipient:user,
                profileImg: currentUesr.profile_img, 
                content: messageInput.current.value, 
                timestamp: Date.now()
      
            } } };
            ws.currentWs.send(JSON.stringify(Sendmessage));
          } else {
            console.log('WebSocket connection is not open');
          }

        dispatch(setAddMessage({
            sender:currentUesr,
            recipient:user,
            profileImg: currentUesr.profile_img, 
            content: messageInput.current.value, 
            timestamp: Date.now()
  
        }))

        messageInput.current.value =''
         SendRef.current.style.display = 'none';
        IconsRef.current.style.display='block'
    }
   

  return (
    <>
    {user &&
        <Container>
        <MessageUserContainer>
                <MessageUserInfoTop>
                        <MessageUserInfoTopContainer>
                            <MessageUserInfoTopImg src={user.profile_img}/>
                            <MessageUserInfoTopName>{user.username}</MessageUserInfoTopName>
                        </MessageUserInfoTopContainer>
                    <MessageTopRightIconsContainer>
                    <Icon aria-label="Audio call" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Audio call</title><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></Icon>
                    <Icon aria-label="Video call" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Video call</title><rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></Icon>
                    <Icon aria-label="Conversation information" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></Icon>

                    </MessageTopRightIconsContainer>
                </MessageUserInfoTop>

            </MessageUserContainer>

            <MessagesContainer $messages={messages} ref={scrollToBottomRef}>
            {messages.length === 0 ? (
                    <NoMessagesYet>no messages yes</NoMessagesYet>
                ) : (
                    messages.map((allMessages) => {
                        if (
                            (allMessages.participants[0].username === user.username &&
                                allMessages.participants[1].username === currentUesr.username) ||
                            (allMessages.participants[1].username === user.username &&
                                allMessages.participants[0].username === currentUesr.username)
                        ){
                            return allMessages.messages.map((_message, _idx) => 
                                    <Message
                                        key={_idx}
                                        message={_message}
                                        profile_img={
                                            _message.sender.profile_img
                                                ? _message.sender.profile_img
                                                : _message.profileImg
                                        }
                                    />
                                
                            )
                        }
                        else {
                            // Return null or an empty fragment if the condition doesn't match
                            return null;
                        }
                       
                    })
                )}
          </MessagesContainer>
       

        <InputContainer>
            <SmileComments>
                <svg aria-label="Emoji" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                </svg>
                <EmojiPickerButton open={false} theme={Theme.DARK} lazyLoadEmojis={true}/>
            </SmileComments>
            <Input ref={messageInput} onChange={handleOnChangeInput} placeholder="Message..."/>
            <IconsInputMessage>
                <LabelSend ref={SendRef} onClick={handleSendMessage}>Send</LabelSend> 
                <IconsContainer ref={IconsRef}>
                 <Icon aria-label="Voice Clip" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Voice Clip</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></Icon>
                 <Icon aria-label="Add Photo or Video" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></Icon>
                 <Icon aria-label="Like" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></Icon>
                </IconsContainer>
                  
                </IconsInputMessage>
        </InputContainer>
    </Container>

    }           
    </>
  )
}

export default MessageUser
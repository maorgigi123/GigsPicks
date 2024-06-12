import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar';
import styled from 'styled-components'
import MessageComponent from '../components/messages/MessageComponent';
import MessageUser from '../components/messages/MessageUser';
import FindUserMessage from '../components/messages/FindUserMessage';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentMessages, selectCurrentUser } from '../store/user/user.selector';
import { setCurrentMessages } from '../store/user/user.action';
import { nanoid } from 'nanoid';

const Container = styled.div`
    display:flex;
`;
const ContainerDirect = styled.div`
    height: 100vh;
    width: 500px;
    margin-left: 244px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-right: 1px solid white;
`;

const TitleText = styled.h3`
    padding-left: 12px;
    margin-top: 12px;
    color: white;
    margin-left: 12px;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Loader = styled.div`
  display: block;
  border: 6px solid #0357ff;
  border-top: 6px solid var(--gray);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin .8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoMessageText = styled.p`
    margin-left: 12px;
    padding: 12px;
    margin-top: 20px;
    font-size: 20px;
    text-align: center;


`;


const Link = styled.a`
    cursor: pointer;
    color: blue;
`;



const Direct = () => {
    let messages = useSelector(selectCurrentMessages)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)
    const dispatch = useDispatch();

    const sortedMessages = messages.slice().sort((a, b) => {
        return new Date(b.messages[b.messages.length-1].timestamp) - new Date(a.messages[a.messages.length-1].timestamp);
    });


    const fetchMessages = async() => {
        if(load) return
        console.log('load')
        try{
            const fetchMessages = await fetch('http://localhost:3001/getAllMessages',{
                method:'POST',
                headers:{'Content-Type' :'application/json'},
                body:JSON.stringify({
                    userId:user._id
                })
            })
    
            const data = await fetchMessages.json();
            if(data.error) return setLoad(false);
            dispatch(setCurrentMessages(data))
            setLoad(false)
        }catch(e) {
            setLoad(false)
        }
    }
    useEffect(() => {
        if(!user) navigate('/')
        if(load === false)
        {
            fetchMessages()
            setLoad(true)
        }
            
    },[])
  return (
    <>
     <NavBar/>
    {load ? <LoaderContainer><Loader/></LoaderContainer> : 
   
    <Container>
    <ContainerDirect>
        <TitleText>Messages</TitleText>
        {messages.length <= 0 && <NoMessageText>chats will appear here after you send or receive a message. <Link>Get started </Link> </NoMessageText>}
        {sortedMessages.map((messagesData,index) => <MessageComponent key={nanoid()} index={index} data={messagesData}> </MessageComponent >)}
    </ContainerDirect>
    <Routes>
            <Route index element={<FindUserMessage/>}></Route>

            <Route path='/:user' element={
               <MessageUser/>
            }></Route>
        </Routes>
    </Container>
    }
    
  </>
    
  )
}

export default Direct
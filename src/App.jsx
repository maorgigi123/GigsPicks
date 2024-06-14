import { Routes,Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import User from './pages/User'
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { selectCurrentUser } from "./store/user/user.selector"
import Edit from "./pages/Edit"
import Direct from "./pages/Direct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { selectCurrentWs } from "./store/webSocket/ws.selector";
import { setCurrentWs } from "./store/webSocket/ws.action";
import { setAddMessage, setCurrentUser } from "./store/user/user.action";

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

const ErrorContainer = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    width: 100%;
    min-height: 100vh;
`;

const NewMessageContainer = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 100;
`;
const NewMessage = styled.div`
  height: 80px;
  width: 400px;
  border-radius: 12px;
  margin-top: 20px;
  background-color: var(--gray);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  overflow: hidden;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const NewMessageProfileInfoContainer = styled.div``;
const ProfileName = styled.h3``;
const ProfileMessage = styled.p`
  color: #837e7e;
  width: 100%;
`;
function App() {

  const users = [
    {
    user_name:'maor gidsdssdgi',
    biography:"#ShareBlackStories",
    blocked_by_viewer:false,
    profile_img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg', //Link
    view : false,
    close_freind:true,
    followers_count:338,
    followers:[],
    following_count:295,
    following:[],
    posts:[{
      user_name:'maor_gigi1',
      desc:'wow its so cdssdsdssdsdool',
      date:new Date(),
      post_imgs : ['https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg',
      'https://wallpapers.com/images/featured/green-background-ivfksvptao7sdhrg.jpg',
      'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg',
      'https://media.istockphoto.com/id/1169630303/photo/blue-textured-background.webp?b=1&s=170667a&w=0&k=20&c=tI2xFhXqXFqMM0IvxSYY3F7LIwv450h2ch3yD-lZ9HU='
      ],
      post_likes: 134,
      likes: [{
          // user Object
      }],
      post_comments:5,
      comments: [{
        // uesr Object 
        username:'maor',
        comment:'fuck you gigi'
      }],

    }]
},
{
user_name:'maor_gigi1',
biography:"#ShareBlackStories",
blocked_by_viewer:false,
profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
view : false,
close_freind:true,
followers_count:338,
followers:[],
following_count:295,
following:[],
posts:[{
user_name:'maor_gigi1',
desc:'adkhvaudhfiua dfuiad ifg aidgfiawgdfiagdfya dfiu adiufg aidfg iadgfyag dhabdfadfadfkjba djfhadhf gajs',
date:new Date(),
saved:[],
highlights:[],
post_imgs : ['https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
          'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg'
],
post_likes: 6777,
likes: [{
    // user Object
}],
post_comments:4321,
comments: [{
  // uesr Object 
  username:'maor',
  comment:'fuck you gigi'
}],

}]
},
{

user_name:'gigGames',
biography:"#ShareBlackStories",
blocked_by_viewer:false,
profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
view : false,
close_freind:true,
followers_count:338,
followers:[],
following_count:295,
following:[],
posts:[{
user_name:'maor_gigi1',
desc:'wow its so cool',
date:new Date(),
post_imgs : ['https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'],
post_likes: 200,

likes: [{
    // user Object
}],
post_comments:11,
comments: [{
  // uesr Object 
  username:'maor',
  comment:'fuck you gigi'
}],

}]
}
]
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch();
  const [load,setLoad] = useState(false);
  const [error,setError] = useState('')
  const ws = useRef(null);
  const wsConnect = useSelector(selectCurrentWs);
  let timeOut = useRef(null);
  const [newMessage,setNewMessage] = useState()
  const location = useLocation();
  const navigate = useNavigate('/')

  useEffect(() => {
    if(!user) return

    setLoad(true)
    // Initialize WebSocket connection
    ws.current = new WebSocket(`ws://localhost:3001?username=${user.username}`);

    // WebSocket connection opened
    ws.current.onopen = () => {
      dispatch(setCurrentWs(ws.current))
      setLoad(false)
    };
    // WebSocket message received
    ws.current.onmessage = (event) => {
       const mesage = JSON.parse(event.data);
       if(mesage.newMessage){
        dispatch(setAddMessage(mesage.newMessage))
        setNewMessage(mesage.newMessage)
       }
    };

    // WebSocket connection closed
    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      
    };

    // WebSocket error occurred
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setLoad(false)
      setError('something went wrong with the connection, please try again')
      dispatch(setCurrentUser(null))
    };
     // Clean up function
     return () => {
      // Close the WebSocket connection when the component unmounts
      ws.current.close();
    };

  }, [user]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Send a message to the server before closing the WebSocket connection
      if (ws.current) {
        ws.current.send(JSON.stringify({ type: 'disconnect', username: `${user.username}` }));
      }
    };
  
    // Add an event listener for the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);



    useEffect(() => {
      if(!newMessage) return
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
      timeOut.current = setTimeout(()=>{
       
        setNewMessage()
      },4000)
      
    },[newMessage])

    const isDirectRoute = location.pathname.startsWith('/direct');


  return (
    <>
    {!load && error.length <=0 && 
    <>
      {newMessage && !isDirectRoute && <NewMessageContainer><NewMessage>
          <ProfileImg src={newMessage.profileImg}/>
          <NewMessageProfileInfoContainer>
            <ProfileName>{newMessage.sender.username}</ProfileName>
            <ProfileMessage>{newMessage.content}</ProfileMessage>
          </NewMessageProfileInfoContainer>
        </NewMessage></NewMessageContainer> }
            <Routes>
            {user?<Route index element={<User users={users}/>} /> :<Route index element={<Login/>} />}
            <Route path="/:username/*" element={<Profile/>}/>
            <Route path='direct/*' element={<Direct/>} />
            <Route path="/accounts">
              <Route index element = {<Login />} />
              <Route path="login/:source?" element={<Login />} />
              <Route path="signup/*" element={<Signup/>} />
              <Route path='edit/*' element={<Edit/>} />
            </Route>
      </Routes>
    </>
    
      }
      {error.length > 0 && <ErrorContainer>{error}</ErrorContainer>}
    {load &&  <LoaderContainer>
            <Loader/>
          </LoaderContainer>}
    
    </>
    
  )
}

export default App

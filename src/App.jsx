import { Routes,Route, Navigate } from "react-router-dom";
import User from './pages/User'
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { selectCurrentUser } from "./store/user/user.selector"
import { useSelector } from "react-redux"
import Edit from "./pages/Edit"
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
  return (
      <Routes>
            {user?<Route index element={<User users={users}/>} /> :<Route index element={<Login/>} />}
            <Route path="/:username/*" element={<Profile/>}/>
            <Route path="/accounts">
              <Route index element = {<Login />} />
              <Route path="login/:source?" element={<Login />} />
              <Route path="signup/*" element={<Signup/>} />
              <Route path='edit/*' element={<Edit/>} />
            </Route>
      </Routes>
    
  )
}

export default App

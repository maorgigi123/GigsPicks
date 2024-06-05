import styled from "styled-components"
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const ProfileContainer = styled.div`
    width: 700px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  
`;
const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow:3;
`;
const ProfileImg = styled.img`
  width: 130px;
  height: 120px;
  border-radius: 50%;
`;

const InfoProfileContainer = styled.div`
  flex-grow: 1;
`;

const TopRightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TopRightName = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  font-weight: 400;
  font-size: 1.2em;
`;
const TopRightEditProfile = styled.div`
  width: 120px;
  height: 30px;
  background-color: rgb(115, 115, 115);
  border-radius: 4px;
  cursor: pointer;
  &::before{
    content: "Edit Profile";
    font-size: .8em;
    font-weight: bold;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    
  }

  &:hover{
    background-color: #65676B;
  }
`;
const TopRightViewArchive = styled.div`
  width: 120px;
  height: 30px;
  background-color: rgb(115, 115, 115);
  border-radius: 4px;
  cursor: pointer;
  &::before{
    content: "View archive";
    font-size: .8em;
    font-weight: bold;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  &:hover{
    background-color: #65676B;
  }
`;
const TopRightSettingButton = styled.div`
  cursor: pointer;
`;


const MiddleRightContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
`;
const MiddleRightPostsCount = styled.p``;
const MiddleRightFollowersCount = styled.p``;
const MiddleRightFollowing = styled.p``;

const BottomBioContainer = styled.div``;
const BottomBioText = styled.p``;



const HighlightsContainer = styled.div`
width: 700px;
margin-top: 20px;
`;

const HighlightParent = styled.div`
  padding: 12px;
padding-left: 60px;
  display: flex;
  gap: 50px;
`;

const HighlightChildParent = styled.div`

cursor: pointer;
background-color:  rgb(115, 115, 115);
height: 80px;
width: 80px;
border-radius: 50%;
display: flex;
flex-direction: column;
background-image: url('https://static-00.iconduck.com/assets.00/plus-icon-256x256-x29mkiw7.png');
background-size: cover;

`

const HighlightChildIcon = styled.div`
`

const HighlightChildName= styled.div`
  font-weight: bold;
  font-size: .9em;
  margin-top: 90px;
  text-align: center;

`

const LineBreakContainer = styled.div`
margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Line = styled.div`
  height: 1px;
  background-color: rgb(115, 115, 115);
  position: absolute;
  width: 100%;
  z-index: 0;
`;
const SelectorDiv = styled.div`
  display: flex;
  gap: 60px;
  justify-content: center;
  z-index: 1;
`;

const PostsSelectContqiner = styled.div`
      cursor: pointer;
      border-top: ${props => props.$SelectPosts ? 2: 0}px solid white;
      padding-top: 20px;

`;


const PostsSelect = styled.div`
  font-size:.9em;
  font-weight: bold;
  color: white;
`;


const SavedSelectContqiner = styled.div`
      cursor: pointer;
     border-top: ${props => props.$SelectPosts ? 0: 2}px solid white;
      padding-top: 20px;
`;

const SavedSelect = styled.div`
  font-size:.9em;
  font-weight: bold;
  color: white;
`;

const PostsContainer = styled.div`
 width: 100%;
min-height: 1000px;  
overflow-y: auto; /* Changed to auto */
display: grid;
grid-template-columns: 1fr 1fr 1fr; 
grid-template-rows: repeat(auto-fit, minmax(280px, 280px));
grid-gap: 5px;

  margin-bottom: 100px;
`;

const LoadContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const IconLoad = styled.div`
      width: 80px;
      height: 80px;
      border: 5px solid rgba(0, 0, 0, 0.1); /* צבע רקע למסגרת */
      border-top: 5px solid blue; /* צבע למסגרת העליונה */
      border-radius: 50%; /* רדיוס עגול */
      animation: spin 1s linear infinite; /* אנימציה של סיבוב */

      @keyframes spin {
      to {
        transform: rotate(360deg); /* סיבוב האלמנט ב-360 מעלות */
      }
    }
`;

const PageNotAvalibleContainer = styled.div`
margin-top: 20px;
text-align: center;
display: flex;
flex-direction: column;
gap: 20px;
`
const Link = styled.a`
    font-size: .9em;
    color:var(--primary-button);
`;

const FollowButton = styled.div`
width: 120px;
  height: 30px;
  background-color: var(--primary-button);
  border-radius: 4px;
  cursor: pointer;
  &::before{
    content: "Follow";
    font-size: .8em;
    font-weight: bold;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  &:hover{
    background-color: var(--primary-button-hover);
  }
`;

const SendMessageButton = styled.div`
width: 120px;
  height: 30px;
  background-color: rgb(115, 115, 115);
  border-radius: 4px;
  cursor: pointer;
  &::before{
    content: "Message";
    font-size: .8em;
    font-weight: bold;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  &:hover{
    background-color: #65676B;
  }
`;

const DotContainer = styled.div`
cursor: pointer;
  width: 20px;
  height: 30px;
  display: flex;
  gap: 2px;
  align-items: center;
`;
const Dot = styled.div`
  background-color: white;
  width: 5px;
  height: 5px;
  border-radius: 50%;
`;

const ProfileLayout = () => {
  const _user = useSelector(selectCurrentUser)
  const navigate = useNavigate();
  let {username} = useParams()
  let [SelectPosts,SetSelectPost] = useState(true);
  const [allPosts,setPosts] = useState();
  const [load,setLoad] = useState(true);
  const [user,setUser] = useState()
  const [isAdmin,setIsAdmin] = useState(false)

  const OnClickSelectHandler = (ClickOnPosts) => {
    SetSelectPost(ClickOnPosts)
  }
  const getAllPosts = () => {
    fetch('http://localhost:3001/getUserPosts',{
      method:'post',
      headers:{'content-Type':'application/json'},
      body: JSON.stringify({
        userId:_user._id
      })
    }).then(data => data.json())
    .then(data => {
      setUser(_user)
      setPosts(data);
      setLoad(false)
    }).catch((e) => {
      console.error('Error fetching user data:', error);
      setLoad(false)
    })
  }
  const fetchData = async (username) => {
    try {
      const fetchUser = await fetch('http://localhost:3001/getUserByUsername', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username
        })
      });
  
      const data = await fetchUser.json();
  
      if (data === 'dont have user') {
        console.log('User not found');
        setLoad(false)
      } else {
        const user = data[0];
        const posts = data[1];

        setUser(user)
        setPosts(posts)
        setLoad(false)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoad(false)
    }
  };
  const navigateToEdictProfile = () =>{
    navigate('/accounts/edit')
  }
useEffect(() => {
  setLoad(true)
  if(_user && username === _user.username)
  {
    getAllPosts();
    setIsAdmin(true)
  }
  else{
    fetchData(username)
    setIsAdmin(false)
    // navigate('/')
  }
},[username])

const navigateToEditProfile = () => {
  navigate('/accounts/edit');
}
  return (
    <div>
      {load && 
            <LoadContainer>
              <IconLoad>
             
              </IconLoad>
            </LoadContainer>
        }
        {!load && !user && <PageNotAvalibleContainer>
        
          <h3>Sorry, this page isn't available.</h3>
          <p>The link you followed may be broken, or the page may have been removed.<Link href='/'> Go back to Gigs. </Link></p>
        
        </PageNotAvalibleContainer>}
        {!load && user &&     
        <ProfileContainer>

        {/* --------------------- Start Info Profile ---------------------  */}

          <ProfileInfoContainer>
              <ProfileImage>
                <ProfileImg src={user.profile_img}/>
              </ProfileImage>
            <InfoProfileContainer>

                <TopRightContainer>

                      <TopRightName>{user.username}</TopRightName>
                      {isAdmin ? 
                      <>
                        <TopRightEditProfile onClick={() => navigateToEdictProfile()}/>
                          <TopRightViewArchive/>
                          <TopRightSettingButton className="mif-cog mif-2x"/>
                      </> : 
                      <>
                          <FollowButton/>
                          <SendMessageButton/>
                          <DotContainer>
                            <Dot/> <Dot/> <Dot/>
                          </DotContainer>
                      </>
                        
                           }
                  
                </TopRightContainer>


              <MiddleRightContainer>
                <MiddleRightPostsCount>{user.posts} posts</MiddleRightPostsCount>
                <MiddleRightFollowersCount>{user.followers_count} followers</MiddleRightFollowersCount>
                <MiddleRightFollowing>{user.following_count} following</MiddleRightFollowing>
              </MiddleRightContainer>

            <BottomBioContainer>
              <BottomBioText>{user.biography}</BottomBioText>
            </BottomBioContainer>


            </InfoProfileContainer> 
          </ProfileInfoContainer>
          {/* --------------------- End Info Profile ---------------------  */}

          {/* --------------------- Start Highlights Container ---------------------  */}


          <HighlightsContainer>


            <HighlightParent>

                <HighlightChildParent>


                    <HighlightChildIcon/>

                    <HighlightChildName>New</HighlightChildName>


                </HighlightChildParent>


            </HighlightParent>


          </HighlightsContainer>
          {/* --------------------- End Highlights Container ---------------------  */}
          <LineBreakContainer>
            <Line/>
            <SelectorDiv>
                    <PostsSelectContqiner $SelectPosts={SelectPosts} onClick={() => {OnClickSelectHandler(true)}}>
                        <PostsSelect className="mif-table"> POSTS</PostsSelect>
                  </PostsSelectContqiner>
                  <SavedSelectContqiner $SelectPosts={SelectPosts} onClick={() => {OnClickSelectHandler(false)}}>
                    <SavedSelect className="mif-bookmark"> SAVED</SavedSelect>
                  </SavedSelectContqiner>
            </SelectorDiv>
            
          </LineBreakContainer>
        <PostsContainer>
          {/* Get Posts user.posts */}
          {/* update it to show only user posts when i build post create */}
          {/* {(user.posts > 4) && posts.map((post) => <ProfilePosts key={nanoid()} post={post} />) } */}
          {allPosts && allPosts.map((post) => <ProfilePosts key={post._id} post={post} />)}
        </PostsContainer>



        </ProfileContainer>
    }
    </div>
    
    
  )
}

export default ProfileLayout
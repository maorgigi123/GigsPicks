import styled from "styled-components"
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

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
margin-top: 50px;
overflow-y: auto; /* Changed to auto */
display: grid;
grid-template-columns: 1fr 1fr 1fr; 
grid-template-rows: repeat(auto-fit, minmax(280px, 1fr));
grid-gap: 5px;

  margin-bottom: 100px;
`;
const ProfileLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  let [SelectPosts,SetSelectPost] = useState(true);
  const [allPosts,setPosts] = useState();

  const OnClickSelectHandler = (ClickOnPosts) => {
    SetSelectPost(ClickOnPosts)
  }
  const getAllPosts = () => {
    fetch('http://localhost:3001/getUserPosts',{
      method:'post',
      headers:{'content-Type':'application/json'},
      body: JSON.stringify({
        userId:user._id
      })
    }).then(data => data.json())
    .then(data => {
      setPosts(data);
    })
  }
useEffect(() => {
  if(!user)
    {
      navigate('/')
    }
    else{
      getAllPosts();
    }
  
},[])

const navigateToEditProfile = () => {
  navigate('/accounts/edit');
}
  return (
    <div>
        {user &&     
        <ProfileContainer>

        {/* --------------------- Start Info Profile ---------------------  */}

          <ProfileInfoContainer>
              <ProfileImage>
                <ProfileImg src={user.profile_img}/>
              </ProfileImage>
            <InfoProfileContainer>

                <TopRightContainer>

                      <TopRightName>{user.username}</TopRightName>
                      <TopRightEditProfile onClick={() => navigateToEditProfile()}/>
                      <TopRightViewArchive/>
                      <TopRightSettingButton className="mif-cog mif-2x"/>
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
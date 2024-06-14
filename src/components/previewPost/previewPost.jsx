import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import TextComponent from "../../utils/TextComponent";
import { CalcData } from "../../utils/CalcDate";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import ReadMore from "../ReadMore";
const PreviewPostContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  top: 0;
  left: 0;
  overflow-y: auto; /* Add overflow-y: auto to enable scrolling if content exceeds viewport */
  display: ${({ $display }) => ($display ? 'block' : 'none')};
`;
const Backgeound = styled.div`
position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: gray;
    opacity: .5;
    top: 0;
    left: 0;
    @media screen and (max-width: 1300px) {
      background-color: black;
      opacity: 1;
    }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: end;
  align-items: start;
  position: relative;
  z-index: 101;
`;
const CloseButton = styled.button`
  margin: 20px;
  cursor:pointer;
  background: transparent;
  border: transparent;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
`;
const ContainerPost = styled.div`
    background-color: black;
    position: absolute; 
    max-width: 80vw;
    min-width: 60vw;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 1;
    z-index: 102;
    @media screen and (max-width: 1300px) {
      width: 100vw;
      min-width: 400px;
      height: 100%;
    }

`;

const CommentsContainer= styled.div`
    width: 80%;
    min-width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid lightgray;
    @media screen and (max-width: 1300px) {
      border: none;
      height: 90%;
    }
    @media screen and (max-width: 1023px) {
      position: absolute;
      bottom: 0;
    }
    
`;


const CommentsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;

    margin: 12px 12px 0px 12px;
    
`;

const CommentsAllContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DataComment = styled.p`
    font-size:.8em;
    margin: 12px 12px 0px 12px;
`;
const BottomContainerComment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const TranslateSpan = styled.span`
   font-size:.8em;
    margin: 12px 12px 0px 0px;
    cursor: pointer;
    font-weight: bold;
`;

const CommentsHeaderAuthor = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
`;
const AuthorIcon = styled.img`
    width:30px;
    height: 30px;
    cursor: pointer;
    border-radius:50%;
`;
const AuthorName = styled.p`
    font-weight: bold;
    font-size: .8em;
    cursor: pointer;
`;
const AuthorContent = styled.div`
 font-weight: bold;
    font-size: .8em;
    /* overflow: hidden;
  word-break: break-all; */
  min-height: 20px;
  

`;
const LineHeader = styled.hr`
    margin-top: 10px;
`


const PostImageContainer = styled.div`
    min-width: 500px;
    max-width: 100vw;
    height: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
    @media screen and (max-width: 1023px) {
     display: none;
    }
`;

const PostImag= styled.img`
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
  flex-shrink: 0;
  flex-grow: 0;
  transition: translate 300ms ease-in-out;
  object-fit: contain;  /* Adjusts the image to maintain aspect ratio and fit within the container */
  display: block;       /* Removes any default inline spacing */
`;

const PostVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: translate 300ms ease-in-out;
`
const PauseButton = styled.div`
  width: 80px;
  height: 80px;
  background-image: url("/img/pause.png");
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
  display: none;
  opacity: 0.6;
`;
const VolumeContainer = styled.div`
  height: 30px;
  width: 30px;
  background-color: var(--gray);
  opacity: 0.8;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 2px;
  right: 4px;
`;

const VolumIcon = styled.div`
  display: none;
`;
const MuteIcon = styled.div`
  display: block;
`;


const AllCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    gap: 10px;
    width: 100%;
    height:${({$user}) => $user ? '85':'90'}%;
`;


const IconsBottonPost = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 12px 0px 12px;
`;

const Icon = styled.div`
  cursor: pointer;
`;
const IconHeart = styled.div`
  cursor: pointer;
  ${(props) => (props.$like ? "color:red" : "")}
`;

const IconsLeftContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const PostDat = styled.p`
    font-size:.9em;
    margin: 12px 12px 0px 12px;
`;

const AddCommentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px 12px 0px 12px;
`;
const CommentContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 2;
`;
const SmileComments = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
`;
const EmojiPickerButton = styled(EmojiPicker)`
  top: -490px;
`;
const Comment = styled.textarea`
    border: none;
    background-color: transparent;
    margin-right: 10px;
    margin-bottom: 5px;
    color: white;
    resize: none;
    width: 100%;
`;
const PotComments = styled.p`
cursor: pointer;
    font-weight: bold;
    color: var(--primary-button);
    &:hover{
      color: var(--primary-button-hover);
    }
`;
const DotContainer = styled.div`

    cursor: pointer;
    color:${({$like}) => $like ? 'red' : 'white'};
`;

const NoCommentsContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 30px;
`;
const NoCommentsText = styled.h2`
font-size: 1.5em;
`;


const AllImagesSlider = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5px;
  overflow-x: scroll;
`;

const ImageSlide = styled.div`
  position: relative;
  cursor: pointer;
  height: 10px;
  width: 10px;
  z-index: 1;
  background-color: ${({$selected}) => ($selected === true) ? 'blue' : 'lightgray'};
  border-radius: 50%;
  &:hover{
    border-radius: 30%;
    opacity:.8;
  }
`;

const LeftButton = styled.div`
  cursor: pointer;
  top: 50%;
  height: 30px;
  margin-left: 10px;
  width: 30px;
  background-color: lightgray;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  &::before {
    content: "<";
    font-weight: bold;
  }
  &:hover {
    opacity: 1;
  }
`;

const RightButton = styled.div`
  cursor: pointer;
  margin-right: 10px;
  top: 50%;
  right: 0;
  height: 30px;
  width: 30px;
  background-color: lightgray;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  opacity: 0.5;
  &::before {
    content: ">";
    font-weight: bold;
  }
  &:hover {
    opacity: 1;
  }
`;

// Function to render comment header
function CommentHeaderComponent({ post,user,handleAddLike }) {
  const likeHearthRef = useRef()
  const [commentLikesCount,setCommentLikeCount] = useState(post.likesCount)
  return (
    <CommentsAllContainer>
    <CommentsHeader>
   <CommentsHeaderAuthor>
     <AuthorIcon src={post.user_id.profile_img} alt="Author Icon" /> 
     <AuthorName>{post.user_id.username}</AuthorName>
     <AuthorContent>
           {" "}
           <ReadMore text={post.content}> </ReadMore>
         </AuthorContent>
   </CommentsHeaderAuthor>
   <DotContainer onClick={() =>handleAddLike(post,likeHearthRef,setCommentLikeCount)} $like={user && post.likes.some(like => like._id === user._id)}  ref={likeHearthRef} className="mif-heart" />
 </CommentsHeader>

     <BottomContainerComment>
             <DataComment>{CalcData(post.createdAt)}</DataComment>
             {commentLikesCount > 0 &&  <TranslateSpan >{commentLikesCount} {commentLikesCount > 1 ? 'likes' : 'like'}</TranslateSpan>}
             <TranslateSpan>Reply</TranslateSpan>
             <TranslateSpan>See translation</TranslateSpan>
       </BottomContainerComment>
 </CommentsAllContainer>
  );

}

const PreviewPost = ({ display, handleShowPost, post,setPosts, user, islike,hearthRefFromHome }) => {
  const [commentHeaders, setCommentHeaders] = useState([]);
  const [index, setIndex] = useState(0);
  const [volume,setVolume] = useState(false)
  const [like, setLike] = useState(islike)
  const [openEmoji,setOpenEmoji] = useState(false)
  const containerRef = useRef(null);
  const PauseRef = useRef();
  const CommentValue = useRef();
  const AllCommentsRef = useRef();
  const videoRef = useRef()
  const VolumeIconRef = useRef();
  const MuteIconRef = useRef();
  const Volume_Container = useRef();
  const ImageRef = useRef();

  const Post = post.current ? post.current : post;


  useEffect(() => {
    setLike(islike)
  },[islike])
  
  const addLike = () => {
    if(!user) return alert('cant like need first to login')
    fetch("http://localhost:3001/addLike", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        postId: Post._id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data === "error") {
          console.log("error when liked a post");
        } else {
          //setLike([...like, post]) set all likes
          // post.likesCount += 1;
          // setLike(true);
          // console.log('add like')
          if(data.removeLike)
            {
              Post.likesCount = data.removeLike.likesCount;
              setLike(false);
              hearthRefFromHome && (hearthRefFromHome.current.style.color ='white')

      
            }
            else if(data.addLike)
              {
                Post.likesCount = data.addLike.likesCount;
                setLike(true);
                hearthRefFromHome && (hearthRefFromHome.current.style.color ='red')
              }
         
        }
      });
  };

  async function handleAddLike(comment,likeHearthRef,setCommentLikeCount) {
    if(!user) return alert('cant like need first to login')
    const fetchAddLike = await fetch('http://localhost:3001/addLikeToComment',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        commentId: comment._id,
        userId: user._id,
        postId:  Post._id
      })
    })

    const data = await fetchAddLike.json()
    if(data.remove){
      setCommentLikeCount((prev) => prev-=1)

      if(!setPosts)
        {
          if(likeHearthRef.current)
            likeHearthRef.current.style.color = 'white'
        }
        setPosts && setPosts(prev => prev.map((_post) => {
            if(_post._id === data.remove._id) return data.remove
            return _post
          }
      ))
    }

    if(data.add){
      setCommentLikeCount((prev) => prev+=1)
      if(!setPosts)
        {
          if(likeHearthRef.current)
            likeHearthRef.current.style.color = 'red'
        }
        setPosts && setPosts(prev => prev.map((_post) => {
        if(_post._id === data.add._id) return data.add
            return _post
          }
      ))
      }
  }

  useEffect(()=>{
    const allVideos = document.querySelectorAll('video');

    // Now you can iterate over allVideos NodeList to access each video element

    allVideos.forEach(video => {
      if(!videoRef.current) return
      if(display == false)
      {
        if(videoRef.current && videoRef.current === video)
          video.pause()
      }
      else{
        if(videoRef.current && videoRef.current !== video)
          video.pause()
        else
        {
          PauseRef.current.style.display = "none";
          video.play()
        }
         
      }
      // Do something with each video element
    
  });
  },[display])
  useEffect(() => {
    if (display) {
      const handleKeyDown = (event) => {
        if (event.key === 'Tab' && containerRef.current) {
          const focusableElements = containerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];

          if (!event.shiftKey && document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          } else if (event.shiftKey && document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

  

  }, [display]);

  useEffect(() => {
    // Initialize with existing comments when the post or display changes
    if (display && Post.comments.length > 0) {
      const initialComments = Post.comments.map((comment) => (
        <CommentHeaderComponent key={comment._id} post={comment} user={user} handleAddLike={handleAddLike}/>
      ));
      setCommentHeaders(initialComments);
    }
  }, [display, Post.comments]);
  const handleClickVideo = (e, PauseRef) => {
    if (e.target.paused) {
      PauseRef.current.style.display = "none";
      e.target.play();
    } else {
      PauseRef.current.style.display = "block";
      e.target.pause();
    }
  };

  const ChangeImage = (countDown, images) => {
    if (!index) setIndex(0);
    setIndex((curIndex) => {
      let count = curIndex += countDown;
      if (count < 0) {
        count = images.length - 1;
      }
      if (count > images.length - 1) {
        count = 0;
      }
      if (Post.post_imgs[count].type.toString().startsWith('video')) {
        if(Volume_Container.current)
            Volume_Container.current.style.display = 'flex';
        // Apply logic for video
        } else {
          if(PauseRef.current && Volume_Container.current) 
            {
              PauseRef.current.style.display='none';
              Volume_Container.current.style.display = 'none';
            }
           
        }
      if (ImageRef.current) ImageRef.current.src = images[count].data;
      return count;
    });
  };

  const MoveToImage = (_idx) =>{
    setIndex(_idx)
    if (Post.post_imgs[_idx].type.toString().startsWith('video')) {
      if(Volume_Container.current)
          Volume_Container.current.style.display = 'flex';
      // Apply logic for video
      } else {
        if(PauseRef.current && Volume_Container.current) 
          {
            PauseRef.current.style.display='none';
            Volume_Container.current.style.display = 'none';
          }
         
      }

  }


  const addNewComment = (commentPost) => {
    const newCommentHeader = <CommentHeaderComponent key={commentHeaders.length} post={commentPost} user={user} handleAddLike={handleAddLike} />;
    setCommentHeaders(prevCommentHeaders => [newCommentHeader,...prevCommentHeaders]);
  };

  const handlePostComment = async () => {

    let value = CommentValue.current.value;

    const textarea = CommentValue.current;

    // Calculate number of lines
    const lines = textarea.scrollHeight / textarea.clientHeight;
    if(lines > 30) return console.log('Cannot post an comment with 30 rows')
    if (value.length <= 0) return console.log('Cannot post an empty message');

    try {
      const response = await fetch('http://localhost:3001/addComment', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          postId: Post._id,
          content: value
        })
      });

      const data = await response.json();
      if (data !== 'error') {
        // Assuming the server returns the updated post object with the new comment
        // Post = data;
        setPosts && setPosts(prev => prev.map((_post) => {
          if(_post._id === data._id) return data
          return _post
        }
        ))
        !setPosts && addNewComment(data.comments[0]);
        CommentValue.current.value =''
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const postImageOrVideo = Post.post_imgs[0];
  const postType = postImageOrVideo.type.split('/')[0];



  const handleReaction = (e) => {
    CommentValue.current.value += e.emoji
  }

  const handleVolume = (e) => {
    if (!MuteIconRef.current || !VolumeIconRef.current) return;
    setVolume((prev) => {
      if (prev === true) {
        MuteIconRef.current.style.display = "block";
        videoRef.current.muted = true;
        VolumeIconRef.current.style.display = "none";
      } else {
        MuteIconRef.current.style.display = "none";
        videoRef.current.muted = false;
        VolumeIconRef.current.style.display = "block";
      }

      return !prev;
    });
  };
  return (
    <PreviewPostContainer $display={display} ref={containerRef}>
      <Backgeound></Backgeound>
      <CloseButtonContainer onClick={handleShowPost}>
        <CloseButton>X</CloseButton>
      </CloseButtonContainer>
      <ContainerPost>

        <PostImageContainer>
                        {Post.post_imgs.map((post_img, idx) => (
                          <React.Fragment key={idx}>
                            {post_img.type.split("/")[0] === "video" ? (
                              <>
                                <PostVideo
                                  ref={videoRef}
                                  preload="auto"
                                  autoPlay={true}
                                  loop
                                  muted
                                  onClick={(e) => handleClickVideo(e, PauseRef)}
                                
                                  style={{translate:`${-100 * index}%`, height:`100%`}}
                                >
                                  <source
                                    src={post_img.data}
                                    type={post_img.type}
                                  />
                                  Your browser does not support the video tag.
                                </PostVideo>
                                <PauseButton ref={PauseRef}></PauseButton>
                                <VolumeContainer ref={Volume_Container} onClick={(e) => handleVolume(e)} style={{display:idx ===0 ? 'flex' : 'none'}}>
                                        <VolumIcon
                                            ref={VolumeIconRef}
                                            className="mif-volume-high"
                                        ></VolumIcon>
                                        <MuteIcon
                                            ref={MuteIconRef}
                                            className="mif-volume-mute2"
                                        ></MuteIcon>
                                </VolumeContainer>
                                
                              </>
                            ) : (
                              <PostImag
                                loading="lazy"
                                src={post_img.data}
                                alt="post image"
                                style={{translate:`${-100 * index}%`}}
                              />
                            )}
                          </React.Fragment>
                        ))}

                        {Post.post_imgs.length > 1 &&<AllImagesSlider>
                              { Post.post_imgs.map((img,_idx) =>{
                                let selected = false;
                                if(_idx === index)
                                  {
                                    selected= true
                                  }
                                  return <ImageSlide key={_idx} $selected={selected} onClick={() =>{MoveToImage(_idx)}}> </ImageSlide>
                                })}
                        </AllImagesSlider>
                        }
                        {Post.post_imgs.length > 1 && index > 0 &&(
                          <LeftButton
                            onClick={() => {
                              ChangeImage(-1, Post.post_imgs);
                            }}
                          />
                        )}
                        {Post.post_imgs.length > 1 && (index < Post.post_imgs.length - 1) && (
                          <RightButton
                            onClick={() => {
                              ChangeImage(1, Post.post_imgs);
                            }}
                          />
                        )}
  </PostImageContainer>
  
        <CommentsContainer>
            <CommentsHeader>
            <CommentsHeaderAuthor>
              <AuthorIcon src={Post.author.profile_img} alt="Author Icon" />
              <AuthorName>{Post.username}</AuthorName>
            </CommentsHeaderAuthor>
            <IconHeart className="mif-more-horiz mif-2x" />
          </CommentsHeader>
          <LineHeader />
         
          
          <AllCommentsContainer ref={AllCommentsRef} $user={user}>
            <CommentsAllContainer>
                <CommentsHeader>
                <CommentsHeaderAuthor>
                  <AuthorIcon src={Post.author.profile_img} alt="Author Icon" /> 
                  <AuthorName>{Post.author.username}</AuthorName>
                  <AuthorContent>
                        <ReadMore text={Post.content}></ReadMore>
                  </AuthorContent>
                  
                </CommentsHeaderAuthor>
              </CommentsHeader>
              <BottomContainerComment>
              <DataComment>{CalcData(Post.createdAt)}</DataComment>
              <TranslateSpan>See translation</TranslateSpan>
              </BottomContainerComment>
              
            </CommentsAllContainer>
         
            {commentHeaders.length === 0 ? (
              <NoCommentsContainer>
                <NoCommentsText>No comments yet...</NoCommentsText>
              </NoCommentsContainer>
            ) : (
              commentHeaders
            )}
          </AllCommentsContainer>
          <LineHeader />
          <IconsBottonPost>
            <IconsLeftContainer>
              <IconHeart onClick={addLike} $like={like} className="mif-heart mif-2x" />
              <Icon className="mif-comment mif-2x" />
              <Icon className="mif-send mif-2x" />
            </IconsLeftContainer>
            <Icon className="mif-bookmark mif-2x" />
          </IconsBottonPost>
          <PostDat>{Post.likesCount === 0 ? 'Be the first to like this': (Post.likesCount +' '+ (Post.likesCount > 1 ? 'likes' : 'like'))}</PostDat>
          <PostDat>{CalcData(Post.createdAt,true)}</PostDat>
          <LineHeader />
          {user && 
           <AddCommentsContainer>
           <CommentContainer>
             <SmileComments>
             <svg onClick={() => {setOpenEmoji((prev) => !prev)}} aria-label="Emoji" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
           </svg>
           <EmojiPickerButton onEmojiClick={handleReaction} open={openEmoji} theme={Theme.DARK} lazyLoadEmojis={true}/>
             </SmileComments>
        

           
           <Comment onFocus={() => {setOpenEmoji((prev) => false)}} name='comment' placeholder="Add a comment..." ref={CommentValue} />
           </CommentContainer>
           <PotComments onClick={handlePostComment}>Post</PotComments>
         </AddCommentsContainer>
         }
         
        </CommentsContainer>
      </ContainerPost>
    </PreviewPostContainer>
  );
};

export default PreviewPost;
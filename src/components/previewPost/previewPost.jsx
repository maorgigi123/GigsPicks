import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';

const PreviewPostContainer = styled.div`
position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 100;
top: 0;
left:0;
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

`;

const CommentsContainer= styled.div`
    width: 80%;
    min-width: 500px;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    border-left: 1px solid lightgray;
    
`;


const CommentsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 12px 12px 0px 12px;
    
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
const AuthorContent = styled.p`
 font-weight: bold;
    font-size: .8em;
    overflow: hidden;
  word-break: break-all;
  min-height: 20px;

`;
const LineHeader = styled.hr`
    margin-top: 10px;
`


const PostImageContainer = styled.div`
    background-color: black;
    width: 100vw;
    min-width: 450px;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const PostImag= styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;


const PostVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
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



const AllCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    gap: 10px;
    width: 100%;
    height:75%;
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
  /* ${(props) => (props.$like ? "color:red" : "")} */
`;

const IconsLeftContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const PostDat = styled.p`
    font-size:.8em;
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
const DotContainer = styled.div``;

const NoCommentsContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;
const NoCommentsText = styled.h2`
font-size: 1.5em;
`;

// Function to render comment header
const CommentHeaderComponent = ({ post }) => (
  <CommentsHeader>
    <CommentsHeaderAuthor>
      <AuthorIcon src={post.user_id.profile_img} alt="Author Icon" /> 
      <AuthorName>{post.user_id.username}</AuthorName>
      <AuthorContent>{post.content}</AuthorContent>
    </CommentsHeaderAuthor>
    <DotContainer className="mif-heart" />
  </CommentsHeader>
);

const PreviewPost = ({ display, handleShowPost, post,setPosts, user }) => {
  const [commentHeaders, setCommentHeaders] = useState([]);
  const [openEmoji,setOpenEmoji] = useState(false)
  const containerRef = useRef(null);
  const PauseRef = useRef();
  const CommentValue = useRef();
  const AllCommentsRef = useRef();

  const Post = post.current ? post.current : post;

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
      console
      const initialComments = Post.comments.map((comment) => (
        <CommentHeaderComponent key={comment._id} post={comment} content={comment.content}/>
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

  const addNewComment = (commentPost) => {
    const newCommentHeader = <CommentHeaderComponent key={commentHeaders.length} post={commentPost} content={CommentValue.current.value} />;
    setCommentHeaders(prevCommentHeaders => [...prevCommentHeaders, newCommentHeader]);
  };

  const handlePostComment = async () => {
    const value = CommentValue.current.value;
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
        addNewComment(data.comments[data.commentsCount-1]);
        CommentValue.current.value =''
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const postImageOrVideo = Post.post_imgs[0];
  const postType = postImageOrVideo.type.split('/')[0];

  const GetDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleReaction = (e) => {
    CommentValue.current.value += e.emoji
  }

  return (
    <PreviewPostContainer $display={display} ref={containerRef}>
      <Backgeound></Backgeound>
      <CloseButtonContainer>
        <CloseButton onClick={handleShowPost}>X</CloseButton>
      </CloseButtonContainer>
      <ContainerPost>
        <PostImageContainer>
          {postType === 'image' ? (
            <PostImag src={postImageOrVideo.data} />
          ) : (
            <>
              <PostVideo
                preload="auto"
                autoPlay
                loop
                muted
                onClick={(e) => handleClickVideo(e, PauseRef)}
              >
                <source src={postImageOrVideo.data} type={post.type} />
                Your browser does not support the video tag.
              </PostVideo>
              <PauseButton ref={PauseRef}></PauseButton>
            </>
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
          <AllCommentsContainer ref={AllCommentsRef}>
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
              <IconHeart className="mif-heart mif-1x" />
              <Icon className="mif-comment mif-1x" />
              <Icon className="mif-send mif-1x" />
            </IconsLeftContainer>
            <Icon className="mif-bookmark mif-1x" />
          </IconsBottonPost>
          <PostDat>{GetDate(Post.createdAt)}</PostDat>
          <LineHeader />
          <AddCommentsContainer>
            <CommentContainer>
              <SmileComments>
              <svg onClick={() => {setOpenEmoji((prev) => !prev)}} aria-label="Emoji" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
            </svg>
            <EmojiPickerButton onEmojiClick={handleReaction} open={openEmoji} theme={Theme.DARK} lazyLoadEmojis={true}/>
              </SmileComments>
         

            
            <Comment onFocus={() => {setOpenEmoji((prev) => false)}} placeholder="Add a comment..." ref={CommentValue} />
            </CommentContainer>
            <PotComments onClick={handlePostComment}>Post</PotComments>
          </AddCommentsContainer>
        </CommentsContainer>
      </ContainerPost>
    </PreviewPostContainer>
  );
};

export default PreviewPost;
import { useRef } from "react";
import VideoThumbnail from "react-video-thumbnail";
import styled from "styled-components"


const PostsHighlightContainer = styled.div`
    cursor: pointer;
    opacity: 1;
    width: 100%;
    height: 100%;
   
`;
const PostsHighlight = styled.div`
    opacity: 0;
    background-color: gray;
    position: absolute;
    width: 100%;
    height: 100%;
    @keyframes show {
        to{
            opacity: .4;
            animation-play-state: paused;
        }
    }
`;


const PostInfoContainer = styled.div`   
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    gap: 20px;
`;
const PostContainer = styled.div`
    background-image: url(${props => props.$image});
    height: 280px;
    width: 100%;
    background-size: cover;
    position: relative;
    background-color: white;
    &:hover ${PostsHighlight} {
        animation: show .4s forwards;
    }
    &:hover ${PostInfoContainer} {
        visibility: visible;
    }
`;
const LikesShow = styled.p`
font-size: 1.5em;
`;
const CommentShow = styled.p`
font-size: 1.5em;
`;
const Source = styled.source``;
const PostContainerVideoObject = styled.video`
    height: 100%;
    width: 100%;
    position: absolute;
    object-fit: cover;
`;

const PostContainerVideo = styled.div`
    height: 280px;
    width: 100%;
    background-size: cover;
    position: relative;
    cursor: pointer;
    z-index:0;
    &:hover ${PostsHighlight} {
        animation: show .4s forwards;
    }
    &:hover ${PostInfoContainer} {
        visibility: visible;
    }
`;


const ProfilePosts = ({post}) => {
    const isVideo = (post.post_imgs[0].type.split('/')[0] === 'video')

  return (
    <>
    {isVideo ? 
            <PostContainerVideo height={"100%"}>
                <PostContainerVideoObject preload="auto">
                    <Source src={post.post_imgs[0].data} height={"100%"}/>
                </PostContainerVideoObject>
               
                <PostsHighlightContainer>
                    <PostsHighlight/>
                    <PostInfoContainer>
                        <LikesShow className='mif-heart '>{post.likesCount}</LikesShow>
                        <CommentShow className="mif-comment">{post.comments}</CommentShow>
                    </PostInfoContainer>
                    
                </PostsHighlightContainer>
            </PostContainerVideo>
            
                    

    : 
    <PostContainer $image ={post.post_imgs[0].data}>
                <PostsHighlightContainer>
                    <PostsHighlight/>
                    <PostInfoContainer>
                        <LikesShow className='mif-heart '>{post.likesCount}</LikesShow>
                        <CommentShow className="mif-comment">{post.comments}</CommentShow>
                    </PostInfoContainer>
                    
                </PostsHighlightContainer>
        </PostContainer>}
        

    </>
     
  )
}

export default ProfilePosts
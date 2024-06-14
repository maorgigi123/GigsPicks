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
    background-color: transparent;
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

const TypeOfPost = styled.div`
    position: absolute;
    top:0;
    padding: 8px;
    right: 0;
`;
const ProfilePosts = ({post,handleShowPost}) => {
    const isVideo = (post.post_imgs[0].type.split('/')[0] === 'video')
  return (
    <>
    {isVideo ? 
            // <PostContainerVideo height={"100%"} onClick={() => handleShowPost(post)}>
            //     <PostContainerVideoObject preload="auto">
            //         <Source src={post.post_imgs[0].data} height={"100%"}/>
            //     </PostContainerVideoObject>
               
            //     <PostsHighlightContainer>
            //         <PostsHighlight/>
            //         <PostInfoContainer>
            //             <LikesShow className='mif-heart '>{post.likesCount}</LikesShow>
            //             <CommentShow className="mif-comment">{post.commentsCount}</CommentShow>
            //         </PostInfoContainer>
                    
            //     </PostsHighlightContainer>
            // </PostContainerVideo>
            <PostContainer $image ={post.thumbnail} onClick={() => handleShowPost(post)}>
                
            <PostsHighlightContainer>
                <TypeOfPost>
                <svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
                </TypeOfPost>
                <PostsHighlight/>
                <PostInfoContainer>
                    <LikesShow className='mif-heart '>{post.likesCount}</LikesShow>
                    <CommentShow className="mif-comment">{post.commentsCount}</CommentShow>
                </PostInfoContainer>
                
            </PostsHighlightContainer>
    </PostContainer>
                    

    : 
    <PostContainer $image ={post.post_imgs[0].data} onClick={() => handleShowPost(post)}>
                
                <PostsHighlightContainer>
s                    {post.post_imgs.length > 1 && 
                    <TypeOfPost>
                            <svg aria-label="Carousel" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Carousel</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                    </TypeOfPost>
                        
                    }
                    <PostsHighlight/>
                    <PostInfoContainer>
                        <LikesShow className='mif-heart '>{post.likesCount}</LikesShow>
                        <CommentShow className="mif-comment">{post.commentsCount}</CommentShow>
                    </PostInfoContainer>
                    
                </PostsHighlightContainer>
        </PostContainer>}
        

    </>
     
  )
}

export default ProfilePosts
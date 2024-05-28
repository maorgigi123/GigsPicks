import styled, { ServerStyleSheet } from "styled-components"
import ProfileImage from "./ProfileImage";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import TextComponent from "../utils/TextComponent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";


const Post = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
`;
const PostTopLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const PostTopLayoutContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
`;
const PostTopLayoutImage = styled.div`
    padding: 6px;
`;
const PostTopLayoutName = styled.p`
    font-weight: bold;
    cursor: pointer;

`;
const PostTopLayoutDay = styled.p`
`;

const PostTopLayoutDotDay = styled.div`
    height: 4px;
    width: 4px;
    background-color: lightgray;
    border-radius: 50%;

`;

const PostTopLayoutMoreButton = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;
const PostImageContainer = styled.div`
    width: 100%;
    display: flex;
    overflow-x: hidden;
    position: relative;
`
const LeftButton = styled.div`
cursor: pointer;
    top:50%;
    height: 30px;
    margin-left: 10px;
    width: 30px;
    background-color: lightgray;
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .5;
    &::before{
        content: "<";
        font-weight: bold;
    }
    &:hover{
        opacity: 1;
    }
`;

const RightButton = styled.div`
    cursor: pointer;
    margin-right: 10px;

    top:50%;
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
    opacity: .5;
    &::before{
        content: ">";
        font-weight: bold;
    }
    &:hover{
        opacity: 1;
    }
`;

const PostImage = styled.img`
    width:100%;
    min-height: 400px;
    max-height: 700px;
    
`;

const PostVideo = styled.video`
      width:100%;
    min-height: 400px;
    max-height: 700px;
    object-fit: cover;
`

const IconsBottonPost = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Icon = styled.div`
    cursor: pointer;

`;
const IconHeart = styled.div`
    cursor: pointer;

   ${props => (props.$like) ? 'color:red' : ''}
`;

const IconsLeftContainer = styled.div`
    display: flex;
    gap: 15px;

`;
const BottomContainer = styled.div``;
const LikesPost = styled.p`
    margin-top: 8px;
`;
const NameAndDescContainer = styled.div`
color: white;
font-weight: bold;
display: flex;
gap: 10px;
margin-top: 5px;
`;
const NameOfOuter = styled.p`
    cursor: pointer;
`;
const DescOfPost = styled.div`
    font-weight: 300;
    overflow: hidden;
    word-break: break-all;
`;
const Commentss = styled.p`
margin-top: 5px;
font-size: 0.8em;
    color:lightgray;
    font-weight: bold;
    cursor: pointer;
`;
const AddComments = styled.input`
margin-top: 4px;
    border: none;
    background-color: black;
    color: lightgray;
    width: 100%;
    height: 40px;
    ::placeholder{
        padding: 8px;
    }
`;

const Line = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
    width: 100%;
    height: 3px;
    background-color: lightgray;
`
const PauseButton = styled.div`
    width: 80px;
    height: 80px;
    background-image: url('../public/img/pause.png');
    background-size: cover;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    pointer-events: none;
    display: none;
    opacity:.6;
`;
const VolumeContainer = styled.div`
    height: 30px;
    width: 30px;
    background-color: var(--gray);
    opacity: .8;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 2px;
    right: 4px;
`

const VolumIcon = styled.div``
const MuteIcon = styled.div`
    display: none;
`

const handleClickVideo = (e, PauseRef) => {
    if(e.target.paused)
    {
        PauseRef.current.style.display = 'none';
        e.target.play()
    }
    else{
        PauseRef.current.style.display = 'block';
        e.target.pause()
    }
}
const PostComponents = ({post}) => {
    const [index,setIndex] = useState(0)
    const [like, setLike] = useState(false)
    const [volume, setVolume] = useState(true)
    const ImageRef = useRef();
    const PauseRef = useRef();
    const VolumeIconRef = useRef();
    const MuteIconRef = useRef();
    const user = useSelector(selectCurrentUser)
    const videoRef = useRef(null);


    const addLike =(post) => {
        console.log(user._id,post._id)
        fetch('http://localhost:3001/addLike',{
            method:"post",
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
                userId : user._id,
                postId : post._id
            })
        }).then(data => data.json())
        .then(data => {
            if(data === 'error'){
                console.log('error when liked a post')
            }
            else if(data === 'you liked this post already')
            {
                // console.log('you liked this post already')
            }
            else{
                //setLike([...like, post]) set all likes
                post.likesCount +=1
                setLike(true)
                // console.log('add like')
            }
        })
    }

    const handleVolume = (e) => {
        if(!MuteIconRef.current || !VolumeIconRef.current)
            return
        setVolume(prev => {
            if(prev === true)
            {
                MuteIconRef.current.style.display ='block'
                videoRef.current.muted = true
                VolumeIconRef.current.style.display = 'none'
            }
            else{
                MuteIconRef.current.style.display ='none'
                videoRef.current.muted = false
                VolumeIconRef.current.style.display = 'block'
            }

            return !prev
        })
    }

    const ChangeImage =(countDown,images) => {
       if(!index)
            setIndex(0)
        
        setIndex((curIndex) =>{
            let count = curIndex+= countDown;
            if(count < 0){
                count =images.length-1;
            }
            if(count > images.length-1)
            {
                count = 0;
            }
            if(ImageRef.current)
                ImageRef.current.src = images[count].data
            return count
        })
        
        
    }
    useEffect(() => {
        post.likes.map((like) => {
            if(like._id === user._id){
                setLike(true)
            }
        })
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state based on intersection status
                if(!videoRef.current)
                        return
                if(entry.isIntersecting)
                {
                    PauseRef.current.style.display = 'none';
                    videoRef.current.play()
                }
                else{
                    videoRef.current.pause()
                }
            },
            {
                threshold: 0.5, // Trigger when at least 50% of the video is in the viewport
            }
        );
        // Observe the video element
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        // Cleanup function
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <Post>
        <PostTopLayout>
             <PostTopLayoutContainer>
                 <PostTopLayoutImage>
                 <ProfileImage user={post.author} size ={30} outlineSize= {35}/>
                 </PostTopLayoutImage>
                
                
                 <PostTopLayoutName>{post.username}</PostTopLayoutName>
                 <PostTopLayoutDotDay/>
                 <PostTopLayoutDay>1d</PostTopLayoutDay>
             </PostTopLayoutContainer>
            
             <PostTopLayoutMoreButton className="mif-more-horiz mif-2x"/>
         </PostTopLayout> 
         {post.post_imgs.length > 0 && 
            <PostImageContainer>
            {post.post_imgs[index].type.split('/')[0] === 'video' ? <>
            <PostVideo ref={videoRef} preload="auto" loop width="320" height="240" onClick={(e) => handleClickVideo(e,PauseRef)}>
                <source src={post.post_imgs[index].data} type={post.post_imgs[index].type}/>
                
                Your browser does not support the video tag.
            </PostVideo>
            <PauseButton ref={PauseRef}></PauseButton>
            <VolumeContainer onClick={(e) => handleVolume(e)}>
                <VolumIcon ref={VolumeIconRef} className="mif-volume-high"></VolumIcon>
                <MuteIcon ref={MuteIconRef} className="mif-volume-mute2"></MuteIcon>
            </VolumeContainer>
            </> : <PostImage loading="lazy"  ref={ImageRef} src ={post.post_imgs[index].data} alt='post image'/>}
           
            
        {post.post_imgs.length > 1 && <LeftButton onClick={()=> {ChangeImage((-1),post.post_imgs)}}/>}
            {post.post_imgs.length > 1 && <RightButton onClick={()=> {ChangeImage(1,post.post_imgs)}}/>}
                
            </PostImageContainer>
         }
         

         <IconsBottonPost>
             <IconsLeftContainer>
                 <IconHeart className="mif-heart mif-2x" $like ={like} onClick={() => addLike(post)}/>
                 <Icon className="mif-comment mif-2x" />
                 <Icon className="mif-send mif-2x"/>
             </IconsLeftContainer>
             <Icon className="mif-bookmark mif-2x"/>
         </IconsBottonPost>
         <BottomContainer>
             <LikesPost>{post.likesCount} likes</LikesPost>
             <NameAndDescContainer>
                 <NameOfOuter>{post.username}</NameOfOuter>
                 <DescOfPost> <TextComponent text={post.content} /></DescOfPost>
             </NameAndDescContainer>
             <Commentss>view all {post.comments} comments</Commentss>
             <AddComments type="text" placeholder="Add a commentss"/>
         </BottomContainer>
        <Line/>

     </Post>
)
}

export default PostComponents
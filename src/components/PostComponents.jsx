import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
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
const PostTopLayoutDay = styled.p``;

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

const PostImage = styled.img`
  width: 100%;
  height: 500px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  flex-shrink: 0;
  flex-grow: 0;
  transition: translate 300ms ease-in-out;
`;

const PostVideo = styled.video`
  width: 100%;
  min-height: 400px;
  max-height: 700px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  flex-shrink: 0;
  flex-grow: 0;
  transition: translate 300ms ease-in-out;
`;

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
  ${(props) => (props.$like ? "color:red" : "")}
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
  color: lightgray;
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
  ::placeholder {
    padding: 8px;
  }
`;

const Line = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
  height: 3px;
  background-color: lightgray;
`;
const PauseButton = styled.div`
  width: 80px;
  height: 80px;
  background-image: url("../public/img/pause.png");
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
  display: none;
  align-items: center;
  justify-content: center;
  bottom: 2px;
  right: 4px;
`;

const VolumIcon = styled.div``;
const MuteIcon = styled.div`
  display: none;
`;
const SliderContent = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const AllImagesSlider = styled.div`
  position: absolute;
  z-index: 2;
  top: 485px;
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





const handleClickVideo = (e, PauseRef) => {
  if (e.target.paused) {
    PauseRef.current.style.display = "none";
    e.target.play();
  } else {
    PauseRef.current.style.display = "block";
    e.target.pause();
  }
};
const PostComponents = ({ post, isLike }) => {
  const [index, setIndex] = useState(0);
  const [like, setLike] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [volume,setVolume] = useState(true)
  const ImageRef = useRef();
  const PauseRef = useRef();
  const VolumeIconRef = useRef();
  const MuteIconRef = useRef();
  const Volume_Container = useRef();
  const user = useSelector(selectCurrentUser);
  const videoRef = useRef(null);

  const addLike = (post) => {
    console.log(user._id, post._id);
    fetch("http://localhost:3001/addLike", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        postId: post._id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data === "error") {
          console.log("error when liked a post");
        } else if (data === "you liked this post already") {
          // console.log('you liked this post already')
        } else {
          //setLike([...like, post]) set all likes
          post.likesCount += 1;
          setLike(true);
          // console.log('add like')
        }
      });
  };

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
      if (post.post_imgs[count].type.toString().startsWith('video')) {
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
    if (post.post_imgs[_idx].type.toString().startsWith('video')) {
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

  useEffect(() => {
    setLike(isLike);
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection status
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          setVideoVisible(true);
          PauseRef.current.style.display = "none";
          videoRef.current.play();
        } else {
        //   setVideoVisible(false);
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.5, // Trigger when at least 50% of the video is in the viewport
      }
    );

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection status
        if (entry.isIntersecting) {
          setImageVisible(true);
          if(videoRef)
            videoRef.current.pause();
          if(PauseRef)
            {
                PauseRef.current.style.display = "none";
                setVolume(true)
            }
            
            
        } else {
        //   setImageVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when at least 50% of the image is in the viewport
      }
    );

    // Observe the video element
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Observe the image element
    if (ImageRef.current) {
      imageObserver.observe(ImageRef.current);
    }

    // Cleanup function
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      if (ImageRef.current) {
        imageObserver.unobserve(ImageRef.current);
      }
    };
  }, []);

  const CalcData = (date) =>{
    const currentDate = new Date()
    const givenDate = new Date(date)
    const timeDifference = currentDate - new Date(givenDate);

    // Convert milliseconds to seconds
    const secondsPassed = Math.floor(timeDifference / 1000);

    // Convert milliseconds to minutes
    const minutesPassed = Math.floor(timeDifference / (1000 * 60));

    // Convert milliseconds to hours
    const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));

    // Convert milliseconds to days
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the difference in years
  const yearsPassed = currentDate.getFullYear() - givenDate.getFullYear();
  const adjustedYearsPassed = currentDate < new Date(givenDate.setFullYear(currentDate.getFullYear())) ? yearsPassed - 1 : yearsPassed;
    if(adjustedYearsPassed > 1){
      return adjustedYearsPassed +'y'
    }
    else if(daysPassed > 1)
    {
      return daysPassed+'d'
    }
    else if(hoursPassed > 1)
    {
      return hoursPassed+'h'
    }
    else if(minutesPassed > 1){
      return minutesPassed+'m'
    }
    else{
      return secondsPassed+'s'
    }
  }
  return (
    <Post>
      <PostTopLayout>
        <PostTopLayoutContainer>
          <PostTopLayoutImage>
            <ProfileImage user={post.author} size={30} outlineSize={35} />
          </PostTopLayoutImage>

          <PostTopLayoutName>{post.username}</PostTopLayoutName>
          <PostTopLayoutDotDay />
          <PostTopLayoutDay>{CalcData(post.createdAt)}</PostTopLayoutDay>
        </PostTopLayoutContainer>

        <PostTopLayoutMoreButton className="mif-more-horiz mif-2x" />
      </PostTopLayout>
      {post.post_imgs.length > 0 && (
    <PostImageContainer>
    {post.post_imgs.map((post_img, idx) => (
      <React.Fragment key={idx}>
        {post_img.type.split("/")[0] === "video" ? (
          <>
            <PostVideo
              ref={videoRef}
              preload="auto"
              loop
              width="320"
              height="240"
              onClick={(e) => handleClickVideo(e, PauseRef)}
              $isVisible={videoVisible}
             
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
          <PostImage
            loading="lazy"
            src={post_img.data}
            alt="post image"
            $isVisible={imageVisible}
            style={{translate:`${-100 * index}%`}}
          />
        )}
      </React.Fragment>
    ))}

    {post.post_imgs.length > 1 &&<AllImagesSlider>
          { post.post_imgs.map((img,_idx) =>{
            let selected = false;
            if(_idx === index)
              {
                selected= true
              }
              return <ImageSlide key={_idx} $selected={selected} onClick={() =>{MoveToImage(_idx)}}> </ImageSlide>
            })}
    </AllImagesSlider>
    }
    {post.post_imgs.length > 1 && index > 0 &&(
      <LeftButton
        onClick={() => {
          ChangeImage(-1, post.post_imgs);
        }}
      />
    )}
    {post.post_imgs.length > 1 && (index < post.post_imgs.length - 1) && (
      <RightButton
        onClick={() => {
          ChangeImage(1, post.post_imgs);
        }}
      />
    )}
  </PostImageContainer>
  
      )}

      <IconsBottonPost>
        <IconsLeftContainer>
          <IconHeart
            className="mif-heart mif-2x"
            $like={like}
            onClick={() => addLike(post)}
          />
          <Icon className="mif-comment mif-2x" />
          <Icon className="mif-send mif-2x" />
        </IconsLeftContainer>
        <Icon className="mif-bookmark mif-2x" />
      </IconsBottonPost>
      <BottomContainer>
        <LikesPost>{post.likesCount} likes</LikesPost>
        <NameAndDescContainer>
          <NameOfOuter>{post.username}</NameOfOuter>
          <DescOfPost>
            {" "}
            <TextComponent text={post.content} />
          </DescOfPost>
        </NameAndDescContainer>
        <Commentss>view all {post.comments} comments</Commentss>
        <AddComments type="text" placeholder="Add a commentss" />
      </BottomContainer>
      <Line />
    </Post>
  );
};

export default PostComponents;


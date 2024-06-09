import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import ImageCropper from "./ImageCropper";
import { nanoid } from "nanoid";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import { handleClickVideo } from "../../utils/Helper";
const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200,.5);
  position: absolute;
  z-index: 1111;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  width: 600px;
  height: 90%;
  border-radius: 12px;
  background-color: #323436;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  position: absolute;
`;
const CloseButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: end;
  align-items: start;
  position: relative;
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
const TitleText = styled.p`
text-align: center;
font-weight: bold;
`;
const Line = styled.div`
  width: 100%;
  margin-top: 5px;
  border :1px solid #464b50;
`
const DragAndDropContainer = styled.div`
    height: 100%;
    width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const DragText = styled.h2`
  cursor: pointer;
`;

const SelectImages = styled.label`
    color:white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-button);
    border: none;
    width: 180px;
    height: 35px;
    font-size: .9em;
    border-radius: 8px;
   font-weight: bold;
    &:hover{
        background-color:var(--primary-button-hover);
    }
`;

const Input = styled.input`
  &[type="file"]{
    display: none;
  }
`;

const Error = styled.p`
  color:red;
  text-align: center;
  font-weight: 400;
  font-size:.9em;
  &::before{
    content: "* ";
  }
`;

// ----------------------------------- Upload Post Staart
const ModalContainerPost = styled.div`
  width: 900px;
  height: 90%;
  border-radius: 12px;
  background-color: #323436;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  position: absolute;
`;
const ModelContainerPost =styled.div `
  height: 100%;
  width:100%;
  display: flex;
`;
const ModelImageContainar = styled.div`
  position: relative;
  height: 100%;
  width: 60%;
  display: flex;
  /* transform: translate(-100%); */
  `;
  const ModelImage = styled.img`
  object-fit: contain;  /* Adjusts the image to maintain aspect ratio and fit within the container */
  display: block;       /* Removes any default inline spacing */
    width: 100%;
  height:100%;
`;
const ModelCotnainerVideo = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  align-items: center;

 
`;
 const ModelVideo = styled.video`
   object-fit: contain;  /* Adjusts the image to maintain aspect ratio and fit within the container */
   display: block;       /* Removes any default inline spacing */
 width: 100%;
 height: 100%;
`;
const ModelVideoSource = styled.source`
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  padding-top: 0px;
  align-items: center;
`;
const TitleTextPost = styled.p`
text-align: center;
font-weight: bold;
`;
const LinePost = styled.div`
  width: 100%;
  margin-top: 5px;
  border :1px solid #464b50;
`
const SharePost = styled.div`
cursor: pointer;
  color :var(--primary-button);
  font-weight: bold;
  font-size:.9em;

`
const BackPost = styled.div`
  cursor: pointer;
`

const ModelPostInfo = styled.div`
height: 100%;
width: 40%;
`;

const TopSharePostInfoUserContainer = styled.div`
  display: flex;
  padding: 12px;
  gap: 10px;
  align-items: center;

`;
const TopSharePostInfoUsername = styled.div`
font-weight: bold;
color: white;

`;
const TopSharePostInfoUserImage = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
`;
const SharePostContantWriteContainer = styled.div`
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
`;
const SharePostContantWrite = styled.textarea`
  background-color: transparent;
  padding-left: 8px;
  line-height: 1.5em;
  border: none;
   resize: none;
  color: white;
  font-size: 1.3em;
  &:focus{
    outline: none;
  }
`;

const InputTagsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  gap: 10px;
  align-items: center;
`;
const InputTagsText = styled.p``;
const InputTags = styled.input`
  flex-grow: 1;
  padding: 4px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #464b50;
  color: white;
  &:focus{
    outline: none;
  }
`;

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
    opacity: .8;
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
    opacity: .8;
    &::before{
        content: ">";
        font-weight: bold;
    }
    &:hover{
        opacity: 1;
    }
`;

// ---------------Edit Image
const ModalContainerEditPost = styled.div`
  width: 900px;
  height: 90%;
  border-radius: 12px;
  background-color: #323436;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  position: absolute;
`;

const ModelImageContainarEdit = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;

`;
const TagList = styled.div`
  width: 100%;
  max-height: 180px;
  background-color: var(--gray);
  padding: 12px;
  overflow: scroll;
  display: flex;
  gap:15px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
    background-color: #3a4144;
    color: white;
    border-radius:4px;
    padding:6px;
    min-width: 20px;
    max-height: 40px;
    position: relative;
`;
const TagClose = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: -10px;
  right: 0;
  margin-right: -10px;
`;




const AddPostModel = ({OnClickCreate}) => {

  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [index,setIndex] = useState(0)
  const [editImage, setEditImage] = useState(true);

  const [croppedArea, setCroppedArea] = useState([null]);

  const [imgAfterCrop, SetImgAfterCrop] = useState()
  const [ignoreIndex, setIgnoreIndex] =useState([]) // Ignore all the videos


  const ImageRef = useRef();
  const content = useRef();
  const tagsRef = useRef();
  const videoRef = useRef()

  const user = useSelector(selectCurrentUser);

  const [tags, setTags] = useState([]);

  const onAddTag = (tag) => {
    console.log(tag)
  }
const RemoveTag = (tag) => {
  const t = tags.filter((_tag,index) => {
    return index !== tag
  })

  setTags(t)
  setError('')
}

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(tags.length >= 6 )
      {
        return setError('No more than 6 tags are allowed')
      }
      if ( tagsRef.current.value.length > 10 ){
        return setError('A tag with more than 10 characters is not allowed')
      }
      if ( tagsRef.current.value.length < 2 ){
        return setError('Tag should be at least 2 characters')
      }
      if ( tagsRef.current.value.trim() !== '') {
        setError('')
        onAddTag(tagsRef.current.value.trim());
        setTags([...tags, tagsRef.current.value]);
        tagsRef.current.value=''
        
      }
    }
  };

  const ChangeImage =(countDown) => {
      setIndex((curIndex) =>{
          let count = curIndex;

          count += countDown;

          if(count < 0){
              count =previewImage.length-1;
          }
          if(count >= previewImage.length)
          {
              count = 0;
          }
          if(videoRef.current)
            {
              if(previewImage[index].split(':')[1].split('/')[0] === 'video') 
                  videoRef.current.src = selectedFiles[count].data
            }
          if(ImageRef.current)
            ImageRef.current.src= selectedFiles[count].data
            
          // if(!editImage)
          //   {
          //     onCropDone(count) 
          //   }

          return count
      })
    
      
     
  }


  const onDrop = useCallback(acceptedFiles => {
    setError('');
    setEditImage(true)
    handleUpload(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const HandleImage = (e) => {
    setError('');
    setEditImage(true)
    handleUpload(e.target.files)
    
  }

  const handleUpload = async (fille) => {
    const files = fille;
    if (!files) {
      setError('No file selected');
      return;
    }
   
    const fileArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(files[i])
        const fileData = {
          name: files[i].name,
          type: files[i].type,
          size: files[i].size,
          data: reader.result 
        };
          setPreviewImage((prev) => [...prev,reader.result])
          setCroppedArea((prev) => [...prev, []])
         
        if(fileData.type.split('/')[0] === 'video')
            setIgnoreIndex((prev) => [...prev, i])
        fileArray.push(fileData);
        if (fileArray.length === files.length) {
          setSelectedFiles(fileArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }
   
  };
 
  
  const onClickSharePost = async() => {
    setError('')
    let contents = content.current.value;

    if(contents.length <= 0){
      return setError('Cant upload empty posts')
    }
    const folder = user.username;
    try {
 
        const response = await axios.post('http://localhost:3001/uploadPost', {
          userId : user._id,

          username:user.username,
          content:contents,
          tags:tags,
          images : selectedFiles, // Send base64-encoded image data
          folder // Send folder name
        }); 
        
        console.log('File uploaded successfully');
        setPreviewImage([])
        setCroppedArea([])
        setError('')
        setTags([])
        OnClickCreate()
      } catch (error) {
        setError('Something went wrong, try again');
        console.error('Error uploading file:', error);
      }
    
  }

  const onCropDone = (getIndex) => {
    const canvasEle = document.createElement('canvas')
    canvasEle.width = croppedArea[getIndex].width;
    canvasEle.height = croppedArea[getIndex].height;

    const context = canvasEle.getContext('2d');

    let imageObj1 = new Image();
    imageObj1.src = previewImage[getIndex];
    imageObj1.onload = function(){
      context.drawImage(
        imageObj1,
        croppedArea[getIndex].x,
        croppedArea[getIndex].y,
        croppedArea[getIndex].width ,
        croppedArea[getIndex].height,
        0,
        0,
        croppedArea[getIndex].width ,
        croppedArea[getIndex].height 
      );
      const dataUrl = canvasEle.toDataURL('image/jpeg');
      setSelectedFiles((prev) => {
        const updateFiles = [...prev];
        updateFiles[getIndex] = {...updateFiles[getIndex], data:dataUrl};
        return updateFiles
      })
      SetImgAfterCrop(dataUrl)
    }

    if(editImage === true)
        setEditImage(false)
  }
  useEffect(() => {
    const allVideos = document.querySelectorAll('video');

    // Now you can iterate over allVideos NodeList to access each video element
    allVideos.forEach(video => {
        // Do something with each video element
        video.pause()
    });
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            // Update state based on intersection status
            if(!videoRef.current)
                    return
            if(entry.isIntersecting)
            {
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
}, [editImage,index]);

  return (
    <ModalBackground>
      <CloseButtonContainer>
        <CloseButton onClick={() => {OnClickCreate()}}>X</CloseButton>
      </CloseButtonContainer>

      {previewImage.length >0 ? 
          editImage ? 
              <ModalContainerEditPost>
              <TopContainer>
                    <BackPost onClick={()=> {setPreviewImage([]),setCroppedArea([]) ,setError(''),setEditImage(true),setIndex(0)}} className="mif-backspace mif-2x"/>
                    <TitleTextPost>
                      Crop
                    </TitleTextPost>
                    <SharePost onClick={() => {onCropDone(0),setIndex(0)}}>
                      Next
                    </SharePost>
                </TopContainer>

                <ModelImageContainarEdit>
                        {previewImage.map((val, index) => {
                         return <ImageCropper key={index} oref={ImageRef} image={previewImage[index]} setCroppedArea={setCroppedArea} index={index} CroppedAreaState={croppedArea}>
                                  {/* <ModelImage ref={ImageRef} src={previewImage[0]} alt={`Preview image`} /> */}
                              </ImageCropper>
                        })}

                        <ImageCropper ImageCropper oref={ImageRef} image={previewImage[index]} setCroppedArea={setCroppedArea} index={index} CroppedAreaState={croppedArea}>
                                  {/* <ModelImage ref={ImageRef} src={previewImage[0]} alt={`Preview image`} /> */}
                        </ImageCropper>
                        {previewImage.length > 1 && <LeftButton onClick={() => {ChangeImage(-1)}}/>}


                        {previewImage.length > 1 && <RightButton onClick={() => {ChangeImage(1)}}/>}

                            
                             
                </ModelImageContainarEdit>
            </ModalContainerEditPost>  
                  
            : 
            

      <ModalContainerPost>
        <TopContainer>
          <BackPost onClick={()=> {
            tagsRef.current.value =''
            setError('')
            setEditImage(true)
            setIndex(0)
            setTags([])
           
            }} className="mif-backspace mif-2x"/>
          <TitleTextPost>
            Create new post
          </TitleTextPost>
          <SharePost onClick={onClickSharePost}>
            Share
          </SharePost>
        </TopContainer>
       
          <LinePost/>
          <ModelContainerPost>
            <ModelImageContainar>
            {(previewImage[index].split(':')[1].split('/')[0] === 'video') ? <ModelCotnainerVideo>
                <ModelVideo ref={videoRef} loop preload="auto" onClick={handleClickVideo}>
                    <ModelVideoSource src={previewImage[index]} type={previewImage[index].split(':')[1].split(';')[0]}/>
                    Your browser does not support the video tag.
                </ModelVideo>
              </ModelCotnainerVideo> :  <ModelImage ref={ImageRef} src={imgAfterCrop} alt={`Preview image`} />}
           
            {previewImage.length > 1 && <LeftButton onClick={() => {ChangeImage(-1)}}/>}
             {previewImage.length > 1 && <RightButton onClick={() => {ChangeImage(1)}}/>}
               
            </ModelImageContainar>
               
              <ModelPostInfo>
                      <TopSharePostInfoUserContainer>
                        <TopSharePostInfoUserImage src={user.profile_img} />
                        <TopSharePostInfoUsername>{user.username}</TopSharePostInfoUsername>
                      </TopSharePostInfoUserContainer>
                      <SharePostContantWriteContainer>
                          <SharePostContantWrite ref={content} type="text" cols="40" rows="10"placeholder="Write a caption..." >
                          </SharePostContantWrite>
                      </SharePostContantWriteContainer>
                      <InputTagsContainer>
                            <InputTagsText>Tags:</InputTagsText>
                            <InputTags ref={tagsRef} placeholder="example (food,games)" onKeyPress={handleKeyPress}/>
                      </InputTagsContainer>

                      <TagList>
                              {tags.map((tag, index) => (
                                 <Tag key={index}><TagClose className="mif-highlight_remove" onClick={()=>RemoveTag(index)}/> {tag}</Tag>
                              ))}
                        </TagList>

                      {error && <Error>Error: {error}</Error>}
                      
              </ModelPostInfo>
          </ModelContainerPost>
          
      </ModalContainerPost>
      
      : 
      <ModalContainer>
          <TitleText>
            Create new post
          </TitleText>
          <Line/>
          <DragAndDropContainer {...getRootProps()}>
          <svg aria-label="Icon to represent media such as images or videos" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
            <DragText>
              Drag photos and video here
            </DragText>

            <SelectImages>
                <Input type="file" name='images' accept="image/*,video/mp4" multiple onClick={() => setError('')} onChange={HandleImage}/>
                Select from computer
            </SelectImages>

          </DragAndDropContainer>
          {error && <Error>Error: {error}</Error>}
      </ModalContainer>}
      
    </ModalBackground>
  )
}

export default AddPostModel
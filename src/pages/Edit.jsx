import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import styled from 'styled-components';
import ChangePhoto from '../components/editProfile/ChangePhoto';
import ImageCropper from '../components/addPost/ImageCropper';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { useNavigate } from 'react-router-dom';
const ProfileContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 150px;
    @media screen and (max-width: 1300px) {
      margin-left: 50px;
    }
     @media screen and (max-width: 1023px) {
      margin-left: 0px;
    }
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`;

const EditProfileTitle = styled.h5`
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 1.5em;

`;

const ChnageProfileImageContainer =  styled.div`
    display: flex;
    width: 600px;
    background-color: #323436;
    justify-content: space-between;
    border-radius: 12px;
    padding: 12px;
    @media screen and (max-width: 1023px) {
      width: 500px;
    }

`;

const ChangeProfileImageInsideLeftContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const ChangeProfileImageImg = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`;

const ChangeProfileImageNameContainer = styled.div`

`;
const ChangeProfileImageUsername = styled.p``;

const ChangeProfileImageFullname = styled.p``;

const ChangePhotoButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChangePhotoButton = styled.button`
    background-color: var(--primary-button);
    border: none;
    padding: 8px;
    color: white;
    cursor: pointer;
    border-radius: 8px;
`;
const Input = styled.input`
  &[type="file"]{
    display: none;
  }
`;
const SelectImages = styled.label`
    color:white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-button);
    border: none;
    width: 150px;
    height: 35px;
    font-size: .9em;
    border-radius: 8px;
   font-weight: bold;
    &:hover{
        background-color:var(--primary-button-hover);
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


  @media screen and (max-width: 1023px) {
      width: 100%;
      height: 100%;
      border-radius: 0px;
    }

`;

const ModelImageContainarEdit = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
const SharePost = styled.div`
cursor: pointer;
  color :var(--primary-button);
  font-weight: bold;
  font-size:.9em;

`
const BackPost = styled.div`
  cursor: pointer;
`





const Edit = () => {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate();
  const [editImage, setEditImage] = useState(true);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [croppedArea, setCroppedArea] = useState([null]);

  const [imgAfterCrop, SetImgAfterCrop] = useState()
 
  const ImageRef = useRef();

  const HandleImage = (e) => {
    setEditImage(true)
    handleUpload(e.target.files)
  }
 
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = {
        name: file[0].name,
        type: file[0].type,
        size: file[0].size,
        data: reader.result 
      };
      setPreviewImage(reader.result);
      setSelectedFiles(fileData);
    };
    reader.readAsDataURL(file[0]);
  };

  const onCropDone = (getIndex) => {
    const canvasEle = document.createElement('canvas')
    canvasEle.width = croppedArea[getIndex].width;
    canvasEle.height = croppedArea[getIndex].height;

    const context = canvasEle.getContext('2d');

    let imageObj1 = new Image();
    imageObj1.src = previewImage;
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
      setSelectedFiles(dataUrl)
      SetImgAfterCrop(dataUrl)

    fetch('http://localhost:3001/uploadProfilePicture',{
        method:'post',
        headers:{'content-Type':'application/json'},
        body:JSON.stringify({
            username:user.username,
            profileImage:dataUrl
        })
    }).then(data => data.json())
    .then(data => {
        if(data === 'profile image upload')
        {
            user.profile_img = dataUrl
        }
        else{
            //set error
        }
    })
}

    if(editImage === true)
        setEditImage(false)
  }
  useEffect(() => {
    if(!user)
    {
        navigate('/')
    }
  },[user])



  return (
    <>
    {user && <ProfileContainer>
        {previewImage.length > 0 && editImage ? 
            <ModalContainerEditPost>
            <TopContainer>
                <BackPost onClick={()=> {setPreviewImage([]),setCroppedArea([]),setEditImage(true)}} className="mif-backspace mif-2x"/>
                <TitleTextPost>
                    Crop
                </TitleTextPost>
                <SharePost onClick={() => {onCropDone(0)}}>
                    Done
                </SharePost>
            </TopContainer>

            <ModelImageContainarEdit>

                    <ImageCropper oref={ImageRef} image={previewImage} setCroppedArea={setCroppedArea} index={0} CroppedAreaState={croppedArea} circle={true}>
                                {/* <ModelImage ref={ImageRef} src={previewImage[0]} alt={`Preview image`} /> */}
                    </ImageCropper>
                        
                        
            </ModelImageContainarEdit>
        </ModalContainerEditPost>
      :
      <RightContainer>
            <EditProfileTitle>
                Edit profile
            </EditProfileTitle>

            <ChnageProfileImageContainer>

                <ChangeProfileImageInsideLeftContainer>
                    <ChangeProfileImageImg ref={ImageRef} src= {(imgAfterCrop) ? imgAfterCrop : user.profile_img} alt='profile image'/>
                    <ChangeProfileImageNameContainer>
                            <ChangeProfileImageUsername>maor_gigi1</ChangeProfileImageUsername>
                            <ChangeProfileImageFullname>מאור גיגי</ChangeProfileImageFullname>
                    </ChangeProfileImageNameContainer>
                   
                </ChangeProfileImageInsideLeftContainer>
            <ChangePhotoButtonContainer>
                <SelectImages>
                    <Input type="file" name='images' accept="image/jpeg, image/png, image/jpg" onChange={HandleImage}/>
                    Change Photo
                </SelectImages>
                
            </ChangePhotoButtonContainer>

            </ChnageProfileImageContainer>
        </RightContainer>
      }
        
        <NavBar />
    </ProfileContainer>}
    </>
    
   
  )
}

export default Edit
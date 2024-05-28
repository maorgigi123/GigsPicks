import { useRef, useState } from "react"
import Cropper from "react-easy-crop";
import styled from "styled-components";
const AspectRatioContainer = styled.div`
  cursor: pointer;
    margin-right: 10px;
    left: 0;
    bottom: 0;
    margin: 10px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #323436;
    &:hover{
      background-color: #232526;
    }
`;

const AspectRatioContainerTop = styled.div`
  cursor: pointer;
    left: 0;
    border-radius: 12px;
    bottom: 40px;
    height: 30px;
    width: 110px;
    height: 160px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #323436;
    opacity: .6;
    z-index: 1;
`;


const AspectRatioContainerTopItems = styled.div`
    cursor: pointer;
    left: 0;
    bottom: 45px;
    height: 30px;
    width: 100px;
    height: 140px;
    position: absolute;
    display: flex;
    z-index: 2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    gap: 5px;
    opacity: 1;

`;

const AspectRatioItems = styled.div`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
z-index: 3;
text-align: center;
gap: 7px;
color: ${(props) => (props.$selected === 'true') ? 'white' : 'lightgray'};

`;
const AspectRatirBorder = styled.div`

  width: calc(100%);
  margin-left: 10px;
  text-align: center;
  margin-top: 4px;
  border-bottom: ${(props) => (props.$lastChild === 'true') ? 0 : 1}px solid #1c1f21;
  opacity: .7;
`;

const ImageCropper = ({image,setCroppedArea,index,CroppedAreaState,circle=false}) => {
  const [crop,setCrop] = useState({x:0,y:0});
  const [zoom,setZoom] = useState(1)

  const [aspectRatio,setAspectRatio] = useState(4 /3);
  const [aspectRatiorSelect, setAspectRatiorSelect] = useState(false)
  const [updateSelectedAspectRatioOriginal, setUpdateSelectedAspectRatioOriginal] = useState('false')
  const [updateSelectedOneOnOneAspectRatio, setUpdateSelectedOneOnOneAspectRatio] = useState('false')
  const [updateSelectedFourFiveAspectRatio, setUpdateSelectedFourFiveAspectRatio] = useState('false')
  const [updateSelectedSixOnNineAspectRatio, setUpdateSelectedSixOnNineAspectRatio] = useState('false')


  const OriginalAspectRatio = useRef();
  const OneOnOneAspectRatio = useRef();
  const FourFiveAspectRatio = useRef();
  const SixOnNineAspectRatio = useRef();


  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    const newItem = CroppedAreaState[index] = croppedAreaPixels;
    const updatedItems = [...CroppedAreaState.slice(0, index), newItem, ...CroppedAreaState.slice(index + 1)];
    setCroppedArea(updatedItems);
  }

  const onAspectRatiorChange = (event) => {
    setAspectRatio(event)
  }

  const HandleClickAspectRatior = (click) => {
    switch(click){
      case "original":
        setUpdateSelectedAspectRatioOriginal('true')
        setUpdateSelectedOneOnOneAspectRatio('false')
        setUpdateSelectedFourFiveAspectRatio('false')
        setUpdateSelectedSixOnNineAspectRatio('false')
        onAspectRatiorChange(4/3)
        break;
      case "one":
        setUpdateSelectedAspectRatioOriginal('false')
        setUpdateSelectedOneOnOneAspectRatio('true')
        setUpdateSelectedFourFiveAspectRatio('false')
        setUpdateSelectedSixOnNineAspectRatio('false')
        onAspectRatiorChange(1/1)
        break;
    case "four":
        setUpdateSelectedAspectRatioOriginal('false')
        setUpdateSelectedOneOnOneAspectRatio('false')
        setUpdateSelectedFourFiveAspectRatio('true')
        setUpdateSelectedSixOnNineAspectRatio('false')
        onAspectRatiorChange(4/5)
        break;
      case "six":
        setUpdateSelectedAspectRatioOriginal('false')
        setUpdateSelectedOneOnOneAspectRatio('false')
        setUpdateSelectedFourFiveAspectRatio('false')
        setUpdateSelectedSixOnNineAspectRatio('true')
        onAspectRatiorChange(16/9)
         break;
    }
  }
  const isVideo = image.split(':')[1].split('/')[0] === 'video';
  return (
    <div>
        <Cropper
        image ={isVideo ? '' : image}
        video = {isVideo ? image : ''}
        showGrid = {isVideo ? false : (circle) ? false : true}
        aspect={isVideo ? 16 /10 : aspectRatio}
        crop={isVideo ? {x:0,y:0} : crop}
        zoom={isVideo ? 1 : zoom}
        onCropChange={setCrop}
        onZoomChange={isVideo ? null : setZoom}
        onCropComplete={onCropComplete}
      
        cropShape ={(circle ? 'round' : 'rect')}
        objectFit="fill"
        style={{
            containerStyle:{
                height:"100%",
                backgroundColor:"#323436",

            },
            
        }}
        />

<AspectRatioContainer>
    <svg onClick={()=> setAspectRatiorSelect(prev => !prev)} aria-label="Select crop" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Select crop</title><path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path></svg>

    {aspectRatiorSelect && 
        <>
        <AspectRatioContainerTop>
            </AspectRatioContainerTop>
            <AspectRatioContainerTopItems>
                <AspectRatioItems $selected = {updateSelectedAspectRatioOriginal} ref={OriginalAspectRatio} onClick={()=> HandleClickAspectRatior('original')}>
                    Original <svg aria-label="Photo outline icon" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Photo outline icon</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </AspectRatioItems>
                <AspectRatirBorder $lastChild='false'> </AspectRatirBorder>
                <AspectRatioItems $selected = {updateSelectedOneOnOneAspectRatio} ref={OneOnOneAspectRatio} onClick={()=> HandleClickAspectRatior('one')}>
                    1:1 <svg aria-label="Crop square icon" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Crop square icon</title><path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                    </AspectRatioItems>
                    <AspectRatirBorder $lastChild='false'> </AspectRatirBorder>
                    <AspectRatioItems $selected = {updateSelectedFourFiveAspectRatio} ref={FourFiveAspectRatio} onClick={()=> HandleClickAspectRatior('four')}>
                    4:5 <svg aria-label="Crop portrait icon" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Crop portrait icon</title><path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                    </AspectRatioItems>
                    <AspectRatirBorder $lastChild='false'> </AspectRatirBorder>
                    <AspectRatioItems $selected = {updateSelectedSixOnNineAspectRatio} ref={SixOnNineAspectRatio} onClick={()=> HandleClickAspectRatior('six')}>
                    16:9 <svg aria-label="Crop portrait icon" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Crop portrait icon</title><path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                    </AspectRatioItems>
                    <AspectRatirBorder $lastChild='true'> </AspectRatirBorder>
            </AspectRatioContainerTopItems>
        </>
    }
    
</AspectRatioContainer>

    </div>
  );
}

export default ImageCropper
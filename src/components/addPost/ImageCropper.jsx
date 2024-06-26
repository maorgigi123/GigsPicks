import { useRef, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import {getVideoDurationFromBase64} from "../../utils/VideoDurationFromBase64";
import Slider from "./Slider";
import VideoPlayer from "./VideoPlayer";

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
  &:hover {
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
  opacity: 0.6;
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
  color: ${(props) => (props.$selected === 'true' ? 'white' : 'lightgray')};
`;

const AspectRatirBorder = styled.div`
  width: calc(100%);
  margin-left: 10px;
  text-align: center;
  margin-top: 4px;
  border-bottom: ${(props) => (props.$lastChild === 'true' ? 0 : 1)}px solid #1c1f21;
  opacity: 0.7;
`;

const CoverContainer = styled.div`
  cursor: pointer;
    margin-right: 10px;
  left: 40px;
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
  &:hover {
    background-color: #232526;
  }
`;

const ImageSvg = styled.svg`
  transform: scale(.8);
`

const ContainerVideo = styled.div`
  position: absolute;
  left: 40px;
  bottom: -15px;
  width: 900px;
  height: 80px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
  overflow-x: scroll;
  @media screen and (max-width: 1023px) {
    width: 400px;
    }
`;


const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Loader = styled.div`
  display: ${({ $isLoading }) => ($isLoading ? 'block' : 'none')};
  border: 6px solid #f3f3f3;
  border-top: 6px solid var(--gray);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin .8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TypeOfPost = styled.div`
    position: absolute;
    top:70px;
    padding: 8px;
    right: 0;
`;

const ImageCropper = ({ image, setCroppedArea, index, CroppedAreaState, circle = false, cover,duration,setCover,indexForCover }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(circle ?1 / 1 : 4 / 3);
  const [aspectRatiorSelect, setAspectRatiorSelect] = useState(false);
  const [updateSelectedAspectRatioOriginal, setUpdateSelectedAspectRatioOriginal] = useState('true');
  const [updateSelectedOneOnOneAspectRatio, setUpdateSelectedOneOnOneAspectRatio] = useState('false');
  const [updateSelectedFourFiveAspectRatio, setUpdateSelectedFourFiveAspectRatio] = useState('false');
  const [updateSelectedSixOnNineAspectRatio, setUpdateSelectedSixOnNineAspectRatio] = useState('false');
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const OriginalAspectRatio = useRef();
  const OneOnOneAspectRatio = useRef();
  const FourFiveAspectRatio = useRef();
  const SixOnNineAspectRatio = useRef();

  const [loadCover,setLoadCover] = useState(false)
  const videoDuration = duration;
  const [currentFrame, setCurrentFrame] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);



  //test2

  const [selectedFrame, setSelectedFrame] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState([]);
 // Callback to capture frame selection from VideoPlayer
 const handleFrameCapture = (frameData) => {
  setCapturedFrames((prevFrames) => [...prevFrames, frameData]);
};


  // Extract frame based on slider position
  const handleSliderChange = (event) => {
    const time = event.target.value;
    setSliderValue(time);

    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Capture the current frame when the video time is updated
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameData = canvas.toDataURL('image/png');


      setCurrentFrame(frameData);
    }
  };


  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    const newItem = CroppedAreaState[index] = croppedAreaPixels;
    const updatedItems = [...CroppedAreaState.slice(0, index), newItem, ...CroppedAreaState.slice(index + 1)];
    setCroppedArea(updatedItems);
  };

  const onAspectRatiorChange = (event) => {
    setAspectRatio(event);
  };
  const isVideo = image.split(':')[1].split('/')[0] === 'video';
  const HandleClickAspectRatior = (click) => {
    if(isVideo) return
    switch (click) {
      case "original":
      
        setUpdateSelectedAspectRatioOriginal('true');
        setUpdateSelectedOneOnOneAspectRatio('false');
        setUpdateSelectedFourFiveAspectRatio('false');
        setUpdateSelectedSixOnNineAspectRatio('false');
        if(!circle)
          onAspectRatiorChange(imageSize.width / imageSize.height);
        else
          onAspectRatiorChange(1 / 1);
        break;
      case "one":
        setUpdateSelectedAspectRatioOriginal('false');
        setUpdateSelectedOneOnOneAspectRatio('true');
        setUpdateSelectedFourFiveAspectRatio('false');
        setUpdateSelectedSixOnNineAspectRatio('false');
        onAspectRatiorChange(1 / 1);
        break;
      case "four":
        setUpdateSelectedAspectRatioOriginal('false');
        setUpdateSelectedOneOnOneAspectRatio('false');
        setUpdateSelectedFourFiveAspectRatio('true');
        setUpdateSelectedSixOnNineAspectRatio('false');
        onAspectRatiorChange(4 / 5);
        break;
      case "six":
        setUpdateSelectedAspectRatioOriginal('false');
        setUpdateSelectedOneOnOneAspectRatio('false');
        setUpdateSelectedFourFiveAspectRatio('false');
        setUpdateSelectedSixOnNineAspectRatio('true');
        onAspectRatiorChange(16 / 9);
        break;
    }
  };

  

  useEffect(() => {
    if(circle) return
    if (image) {
      const isVideo = image.split(':')[1].split('/')[0] === 'video';
      if (isVideo) {
        const video = document.createElement('video');
        video.src = image;
        video.onloadedmetadata = () => {
          setImageSize({ width: video.videoWidth, height: video.videoHeight });
          setAspectRatio(video.videoWidth / video.videoHeight);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        };
      } else {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
          setAspectRatio(img.width / img.height);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        };
      }
    }
  }, [image]);

  const handleCoverVideo = () =>{
    console.log('cover')
  }
  return (
    <div>
      <Cropper
        image={isVideo ?  capturedFrames.length ? capturedFrames[selectedFrame] : cover : image}
        // video={isVideo ? image : ''}
        showGrid={isVideo ? false : circle ? false : true}
        aspect={aspectRatio}
        crop={isVideo ? { x: 0, y: 0 } : crop}
        zoom={isVideo ? 1 : zoom}
        onCropChange={setCrop}
        onZoomChange={isVideo ? null : setZoom}
        onCropComplete={onCropComplete}
        cropShape={circle ? 'round' : 'rect'}
        objectFit={isVideo ? 'fill' : ''}
        style={{
          containerStyle: {
            height: "100%",
            backgroundColor: "#323436",
          },
        }}
      />

      <AspectRatioContainer>
        <svg
          onClick={() => setAspectRatiorSelect((prev) => !prev)}
          aria-label="Select crop"
          className="x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <title>Select crop</title>
          <path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path>
        </svg>

        {aspectRatiorSelect && (
          <>
            <AspectRatioContainerTop></AspectRatioContainerTop>
            <AspectRatioContainerTopItems>
              <AspectRatioItems $selected={updateSelectedAspectRatioOriginal} ref={OriginalAspectRatio} onClick={() => HandleClickAspectRatior('original')}>
                Original
                <svg aria-label="Photo outline icon" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Photo outline icon</title>
                  <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path>
                  <path
                    d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </AspectRatioItems>
              <AspectRatirBorder $lastChild="false"> </AspectRatirBorder>
              <AspectRatioItems $selected={updateSelectedOneOnOneAspectRatio} ref={OneOnOneAspectRatio} onClick={() => HandleClickAspectRatior('one')}>
                1:1
                <svg aria-label="Crop square icon" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Crop square icon</title>
                  <path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path>
                </svg>
              </AspectRatioItems>
              <AspectRatirBorder $lastChild="false"> </AspectRatirBorder>
              <AspectRatioItems $selected={updateSelectedFourFiveAspectRatio} ref={FourFiveAspectRatio} onClick={() => HandleClickAspectRatior('four')}>
                4:5
                <svg aria-label="Crop portrait icon" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Crop portrait icon</title>
                  <path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path>
                </svg>
              </AspectRatioItems>
              <AspectRatirBorder $lastChild="false"> </AspectRatirBorder>
              <AspectRatioItems $selected={updateSelectedSixOnNineAspectRatio} ref={SixOnNineAspectRatio} onClick={() => HandleClickAspectRatior('six')}>
                16:9
                <svg aria-label="Crop portrait icon" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Crop portrait icon</title>
                  <path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path>
                </svg>
              </AspectRatioItems>
              <AspectRatirBorder $lastChild="true"> </AspectRatirBorder>
            </AspectRatioContainerTopItems>
          </>
        )}
      </AspectRatioContainer>

    {isVideo && 
    <>
      <TypeOfPost>
      <svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
      </TypeOfPost>
                    <CoverContainer onClick={handleCoverVideo}>
    {/* // <video
    //         ref={videoRef}
    //         src={image}
    //         style={{ display: 'none' }}
    //         onSeeked={captureFrame}
    //       />
    // <canvas ref={canvasRef} style={{ display: 'none' }} />
    //       <input
    //         type="range"
    //         min="0"
    //         max={videoDuration}
    //         step="0.1"
    //         value={sliderValue}
    //         onChange={handleSliderChange}
    //       /> */}
        {loadCover && capturedFrames.length <= (duration >= 14 ? 14 : duration) &&      
        <LoaderContainer>
            <Loader $isLoading={(loadCover)} />
          </LoaderContainer>
          }
 
              <ImageSvg onClick={() => {capturedFrames.length <=0 && setLoadCover(true)}} aria-label="Photo outline icon" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                          <title>Photo outline icon</title>
                          <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path>
                          <path
                            d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                          <path
                            d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </ImageSvg>
            <ContainerVideo>

        {loadCover && 
        <>
        <Slider frames={capturedFrames} selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame}  setCover={setCover} indexForCover={indexForCover}/>
      {capturedFrames.length <=0  && <VideoPlayer videoSrc={image} onFrameCapture={handleFrameCapture} duration={duration} setLoadCover={setLoadCover}/>}
           

          
        </>
            }
           
          </ContainerVideo>
            

          </CoverContainer> 
    </>
   }
      
    </div>
  );
};

export default ImageCropper;

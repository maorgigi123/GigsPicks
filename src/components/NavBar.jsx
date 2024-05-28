import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { selectCurrentUser } from "../store/user/user.selector";
import { useSelector } from "react-redux";
import AddPostModel from "./addPost/addPostModel";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
const NavBarPage = styled.div`
    left: 0;
    z-index: 999;
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 100vh;

`;
const NavBarContainer = styled.div`
    padding: 12px;
    height: 100vh;
    background-color: black;
    width: 244px;
    border-right: .1px solid lightgray;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
`;
const NavBarTitle = styled.h1`
    height:30px;
    padding: 12px;
    margin-bottom: 30px;

`;
const NavBarComponents = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    height:40px;
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    &:hover{
        background-color: gray;
        border-radius: 8px;
    }
`;
const Icons = styled.span`
    margin-right: 20px;
`
const BottomButtonContainer = styled.div`
    padding: 12px;
    height: 100vh;
    display: flex;
    background-color: black;
    border-right: .1px solid lightgray;
    align-items: end;
    width: 244px;
    padding: 12px;
`;
const MoreInfoButon = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px;  
    height: 40px;
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    &:hover{
        background-color: gray;
        border-radius: 8px;
    }
`;


const NavBar = () => {
    const [showCreate,setShowCreate] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const ClickNavigate = (NavigateTo) => {
        window.scrollTo(0, 0);
        
        if(NavigateTo !== location.pathname)
            navigate(NavigateTo)
    }
    const OnClickCreate = () => {
        setShowCreate((prev) =>{
        if(prev === true){
            document.body.classList.remove('active-modal')
            return false;
        }else{
            document.body.classList.add('active-modal')
            return true;
        }
    })
    }
  return (
    <NavBarPage>
        {showCreate && <AddPostModel OnClickCreate={OnClickCreate}/>        }
        <NavBarContainer>
            <NavBarTitle>Gigs</NavBarTitle>
            <NavBarComponents onClick={() => {ClickNavigate(`/`)}}><Icons className="mif-home mif-2x"/> Home</NavBarComponents>
            <NavBarComponents><Icons className="mif-search mif-2x"/> Search</NavBarComponents>
            <NavBarComponents><Icons className="mif-compass2 mif-2x"/>Explore</NavBarComponents>
            <NavBarComponents><Icons className="mif-video-camera mif-2x"/>Reels</NavBarComponents>
            <NavBarComponents><Icons className="mif-qa mif-2x"/>Messages</NavBarComponents>
            <NavBarComponents><Icons className="mif-notifications mif-2x"/>Notifications</NavBarComponents>
            <NavBarComponents onClick={OnClickCreate}><Icons className="mif-plus mif-2x"/>Create</NavBarComponents>
            <NavBarComponents onClick={() => {ClickNavigate(`/${user.username}`)}}><Icons className="mif-account_circle mif-2x"/>Profile</NavBarComponents>
        </NavBarContainer>
        <BottomButtonContainer>
            <MoreInfoButon><Icons className="mif-lines mif-3x"/>More</MoreInfoButon>
        </BottomButtonContainer>
        
    </NavBarPage>
  )
}

export default NavBar
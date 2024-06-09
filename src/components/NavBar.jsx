import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { selectCurrentUser } from "../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import AddPostModel from "./addPost/addPostModel";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { setCurrentUser } from "../store/user/user.action";
const NavBarPage = styled.div`
    left: 0;
    z-index: 100;
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
    position: relative;
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

const MoreContainer = styled.div`
    position: absolute;
    height: 300px;
    width: 100px;
    background-color: var(--gray);
    top: -165px;
    width: 200px;
    border-radius: 12px;
    display: ${({ $active }) => ($active ? 'flex' : 'none')};
    flex-direction: column;
    gap: 6px;
    padding-top: 6px;
    overflow: hidden;
`;

const LogOut = styled.p`
    cursor: pointer;
    width: 100%;
    border-radius: 8px;
    padding: 8px 4px 6px 16px;
    &:hover{
        background-color: gray;
    }
`

const LogToGigs = styled.div`
    width: 100vw;
    height: 80px;
    position: absolute;
    bottom: 0;
    z-index: 2;
    background-color: var(--gray);
    display: flex;
    justify-content: center;
    align-items: center;

`;

const GigsTextLoginContainer = styled.div`
    display: flex;
    gap: 10px;
    font-size: .8em;
    font-weight: 700;
`;

const GigsTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const GigsTextLogin = styled.p``;

const GigsLogoLogin = styled.h1``;

const GigsLoginButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    justify-content: center;
    align-items: center;

`;

const GigsLoginButton = styled.button`
    border: none;
    border-radius: 4px;
    padding: 4px;
    width: 80px;
    background-color: var(--primary-button);
    cursor: pointer;
    &:hover{
        background-color: var(--primary-button-hover);
    }
    
`;
const GigsSignUpButton = styled.a`
font-size: .8em;
cursor: pointer;
color: var(--primary-button);
&:hover{
    color: var(--link);
}

`;

const NavBar = () => {
    const [showCreate,setShowCreate] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    const [morePanel,setMorePanel] = useState(false)
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
    {user ? <>
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
            <MoreContainer $active={morePanel}>
                <LogOut onClick={() => dispatch(setCurrentUser(null),navigate('/'))}>Log Out</LogOut>

            </MoreContainer>
            <MoreInfoButon onClick={() => { setMorePanel((prev) =>!prev)}}><Icons className="mif-lines mif-3x"/>More</MoreInfoButon>
        </BottomButtonContainer>
        </> :
        <LogToGigs>
            <GigsTextLoginContainer>
                <GigsLogoLogin>Gigs Picks</GigsLogoLogin>
                <GigsTextContainer>
                    <GigsTextLogin>Log into GigsPicks</GigsTextLogin>
                    <GigsTextLogin>Log in to see photos and videos from friends and discover other accounts you'll love.</GigsTextLogin>
                </GigsTextContainer>
            </GigsTextLoginContainer>
            <GigsLoginButtonContainer>
                    <GigsLoginButton onClick={() => {navigate('/accounts/login')}}>Log in</GigsLoginButton>
                    <GigsSignUpButton href='/accounts/signup'>Sign Up</GigsSignUpButton>
                </GigsLoginButtonContainer>
        </LogToGigs>
        }
       
        
    </NavBarPage>
  )
}

export default NavBar
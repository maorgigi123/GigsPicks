import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { selectCurrentUser } from "../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import AddPostModel from "./addPost/addPostModel";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { setCurrentUser } from "../store/user/user.action";
import { selectCurrentWs } from "../store/webSocket/ws.selector";
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
      @media screen and (max-width: 1300px){
       width: 100px;
    }
    @media screen and (max-width: 1023px) {
        display: none;
    }
    
`;
const NavBarTitle = styled.h1`
    height:30px;
    padding: 12px;
    margin-bottom: 30px;
    @media screen and (max-width: 1300px){
       margin-bottom: 50px;
    }

`;
const NavBarComponents = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    height:40px;
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    &::after{
        content: '${({ $type }) => $type}';
        margin-left: 8px;
    }
    &:hover{
        background-color: gray;
        border-radius: 8px;
    }
     @media screen and (max-width: 1300px){
        &::after{
        content: '';
        }
        padding-right: 0;
        padding-left:0;
        justify-content: center;
        margin:0;
    }
`;
const Icons = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
`
const BottomButtonContainer = styled.div`
    padding: 12px;
    height: 70px;
    display: flex;
    background-color: black;
    border-right: .1px solid lightgray;
    align-items: end;
    width: 244px;
    padding: 12px;
    position: relative;
    @media screen and (max-width: 1300px){
       width: 100px;
    }
    @media screen and (max-width: 1023px) {
        display: none;
    }
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
    &::after{
        content: '${({$type}) => $type}';
    }
    &:hover{
        background-color: gray;
        border-radius: 8px;
    }
    @media screen and (max-width: 1300px){
        &::after{
        content: '';
        }
        padding-right: 0;
        padding-left:0;
        justify-content: center;
    }
`;

const MoreContainer = styled.div`
    position: absolute;
    height: 300px;
    width: 100px;
    background-color: var(--gray);
    top: -280px;
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



// mobile nav bar ----------
const MobileNavBar = styled.div`
      background-color: black;
      width: 100vw;
      position: fixed;
      bottom: 0;
      height: 50px;
      border-top: 1px solid white;
      display: none;
      justify-content: space-evenly;
      align-items: center;
      @media screen and (max-width: 1023px) {
        display: flex;
    }
`
const NavBarComponentsMobile = styled.div`
    padding: 12px;
    height:40px;
    font-size: 1.1em;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: scale(1);
    &:hover{
        transform: scale(1.2);
    }

`;






const NavBar = () => {
    const [showCreate,setShowCreate] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    const [morePanel,setMorePanel] = useState(false)
    const ws = useSelector(selectCurrentWs);
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
            <NavBarComponents $type={'home'} onClick={() => {ClickNavigate(`/`)}}><svg aria-label="Home" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg></NavBarComponents>
            <NavBarComponents $type={'Search'}><svg aria-label="Search" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg></NavBarComponents>
            <NavBarComponents $type={'Explore'}><svg aria-label="Explore" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg></NavBarComponents>
            <NavBarComponents $type={'Reels'}><svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg></NavBarComponents>
            <NavBarComponents $type={'Messages'} onClick={() => {ClickNavigate(`/direct`)}}><svg aria-label="Messenger" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg></NavBarComponents>
            <NavBarComponents $type={'Notifications'} ><svg aria-label="Notifications" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></NavBarComponents>
            <NavBarComponents $type={'Create'} onClick={OnClickCreate}><svg aria-label="New post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg></NavBarComponents>
            <NavBarComponents $type={'Profile'} onClick={() => {ClickNavigate(`/${user.username}`)}}><Icons src={user.profile_img}/></NavBarComponents>
        </NavBarContainer>
        <BottomButtonContainer>
            <MoreContainer $active={morePanel}>
                <LogOut onClick={() => dispatch(setCurrentUser(null),navigate('/'),ws.currentWs.send(JSON.stringify({ type: 'disconnect', username: `${user.username}` })))}>Log Out</LogOut>

            </MoreContainer>
            <MoreInfoButon $type={'More'} onClick={() => { setMorePanel((prev) =>!prev)}}><div className="mif-lines mif-3x"/></MoreInfoButon>
        </BottomButtonContainer>

        <MobileNavBar>
                <NavBarComponentsMobile $type={'home'} onClick={() => {ClickNavigate(`/`)}}><svg aria-label="Home" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg></NavBarComponentsMobile>
                <NavBarComponentsMobile $type={'Explore'}><svg aria-label="Explore" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg></NavBarComponentsMobile>
                <NavBarComponentsMobile $type={'Create'} onClick={OnClickCreate}><svg aria-label="New post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg></NavBarComponentsMobile>
                <NavBarComponentsMobile $type={'Messages'} onClick={() => {ClickNavigate(`/direct`)}}><svg aria-label="Messenger" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg></NavBarComponentsMobile>
                <NavBarComponentsMobile $type={'Profile'} onClick={() => {ClickNavigate(`/${user.username}`)}}><Icons src={user.profile_img}/></NavBarComponentsMobile>
        </MobileNavBar>
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
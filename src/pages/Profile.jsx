
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';
import ProfileLayout from '../components/profile/ProfileLayout';

import styled from 'styled-components';
import { selectCurrentUser } from '../store/user/user.selector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProfileContainer = styled.div`
    min-height: 100vh;
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 150px;
`;

const Profile = () => {
    const {username} = useParams();
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!user){
            navigate('/')
        }
    },[user])
    
    return (
        <ProfileContainer>
            <NavBar/>
            <ProfileLayout/>
            
        </ProfileContainer>
    )
}

export default Profile
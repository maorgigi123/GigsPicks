
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';
import ProfileLayout from '../components/profile/ProfileLayout';

import styled from 'styled-components';


const ProfileContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 150px;

    @media screen and (max-width: 1300px){
        margin-left: 100px;
    }
    @media screen and (max-width: 1023px) {
        margin-left: 0px;
        display: block;
    }

`;

const Profile = () => {    
    return (
        <ProfileContainer>
            <NavBar/>
            <ProfileLayout/>
            
        </ProfileContainer>
    )
}

export default Profile
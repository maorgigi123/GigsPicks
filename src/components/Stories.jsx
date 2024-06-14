import StoriesComponents from "./StoriesComponents";

import styled from "styled-components"
const Stories_db = [{
    user_name:'maor gidsdssdgi',
    profile_img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg', //Link
    view : true,
    close_freind:false
},{
  user_name:'maor_gigi1',
    profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
    view : false,
    close_freind:true
},{
  user_name:'maor gigi',
    profile_img: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg', //Link
    view : false,
    close_freind:true
},{
  user_name:'maor gigi',
    profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
    view : false,
    close_freind:false
},{
  user_name:'maor gidsdssdgi',
  profile_img: 'https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg', //Link
  view : false,
  close_freind:true
},{
  user_name:'maor gidsdssdgi',
  profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
  view : true,
  close_freind:false
},{
  user_name:'maor gidsdssdgi',
  profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
  view : false,
  close_freind:false
},{
  user_name:'maor gidsdssdgi',
  profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
  view : false,
  close_freind:false
},{
  user_name:'maor gidsdssdgi',
  profile_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBpJdC55Kolps8LpekoBpESVk8SJanIPDNwfQSm4QsA&s', //Link
  view : false,
  close_freind:false
},]

const StoriesContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  @media screen and (max-width: 1023px) {
    width: 100vw;
    position: absolute;
    left: 0;
    padding: 20px;
    }
`;
const StorieContainerFix = styled.div`
  width: 700px;
  @media screen and (max-width: 1023px) {
    width: 100%;
    }
`

const ProfileStorysContainer =styled.div`
  display:flex;
  align-items: center;
  height: 100%;
  gap:5px;
  overflow-x: scroll;
  padding: 12px;

`;



const Stories = () => {
  return (
    <StoriesContainer>
      <StorieContainerFix>
      <ProfileStorysContainer>
            <StoriesComponents stories={Stories_db} />
        </ProfileStorysContainer>
      </StorieContainerFix>
        
    </StoriesContainer>
  )
}

export default Stories
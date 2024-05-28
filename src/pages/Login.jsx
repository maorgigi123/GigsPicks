import React, { useEffect, useRef, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom';
import { setCurrentUser } from '../store/user/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEqual } from '../utils/Helper';
import styled from 'styled-components'
import { selectCurrentUser } from '../store/user/user.selector';

const ContainerAllThePage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
`
const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 380px;
    height: 500px;
`;
const ContainerLoginItems = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
`;
const TitleLogin = styled.h1`
    margin-top: 40px;
    margin-bottom: 30px;
    text-align:center;

`;
const ContainerInputs = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    :nth-child(2){
        margin-bottom: 20px;
    }
    :last-child{
        margin-bottom: 10px;
    }
`;
const InputLogin = styled.input`
    width: 280px;
    height: 30px;
    &::placeholder {
        color: gray;
        font-weight: 400;
    }
    padding-left: 5px;
`;

const ButtonSubmitLogin = styled.button`
    color:white;
    background-color: var(--primary-button);
    border: none;
    width: 280px;
    height: 30px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.05em;
    cursor: pointer;
    &:hover{
        background-color:var(--primary-button-hover);
    }
`;

const ContainerOfLineBreak = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 15px;
`;

const LineBreak = styled.div`
    width: 100px;
    background-color: lightgray;
    height: 1.5px;
`;

const LineBreakText = styled.p`
    color:gray;
    font-weight: bold;
    font-size: 0.8em;

`;

const DontHaveAccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const ContainerFacebook = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const LogoFacebook = styled.div`
    width: 20px;
    height: 20px;
    background-image:  url('../../public/img/facebook.png');
    background-size: cover;
    cursor: pointer;
 
`;

const LogWithFacebook = styled.a`
    font-weight: 550;
    color:var(--link);
`;

const ForgetPassword = styled.a`
    font-weight: 300;
    color:var(--link);
`;


const ContainerSignUp = styled.div`
    height: 80px;
    width: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
`;

const ContainerTextSignUp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const DontHaveAccountText  = styled.p``;

const SignUpText = styled(Link)`
    color:var(--primary-button);
    font-weight: bold;
`;
const ErrorText = styled.p`
    color:red;
    font-size:.8em;
`;


const Login = () => {
    const refForm = useRef();
    const [haveError,SetError] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    useEffect(() =>{
        if(user){
            navigate('/')
        }
    },[user])

    let {source} = useParams()
    if(source)
        source = DeleteEqual(source);

    const HandleSignin = (e) => {
        e.preventDefault()
        SetError('')
        
        const username = refForm.current.username.value;
        const password = refForm.current.password.value;

        if(username.length < 8) {
            return SetError('username need be at least 8 characters')
        }

        if(password.length < 8 ){
            return SetError('password need be at least 8 characters')
        }

        fetch('http://localhost:3001/signIn',{
            method:"post",
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        }).then(data => data.json())
        .then(data => {
            if(data === 'wrong credentials'){
                return SetError('wrong credentials, try again')
            }
            refForm.current.username.value ='';
            refForm.current.password.value ='';
            dispatch(setCurrentUser(data))
            
        })
    }

  return (
    <ContainerAllThePage>
        <ContainerLogin>
        <ContainerLoginItems>
            <TitleLogin>Gigs Picks</TitleLogin>
            <ContainerInputs ref={refForm} onSubmit={HandleSignin}>
     
                <InputLogin placeholder='Phone number, username, or email' type='text' name='username' required/>
                <InputLogin placeholder='password' type='password' name='password' required/>
                <ButtonSubmitLogin>Log In</ButtonSubmitLogin>
                {(haveError.length > 0) && <ErrorText>{haveError}</ErrorText>}
            </ContainerInputs>
            
            
            <ContainerOfLineBreak>
                <LineBreak/>
                <LineBreakText>
                    OR
                </LineBreakText>
                <LineBreak/>
            </ContainerOfLineBreak>
            <DontHaveAccountContainer>
                <ContainerFacebook>
                    <LogoFacebook/>
                    <LogWithFacebook href='#'>Log In With Facebook</LogWithFacebook>
                </ContainerFacebook>
                
                <ForgetPassword href='#'>Forget password?</ForgetPassword>
                
            </DontHaveAccountContainer>
            
        </ContainerLoginItems>
        <ContainerSignUp>
            <ContainerTextSignUp>
                <DontHaveAccountText>Don`t have an account?</DontHaveAccountText>
                <SignUpText to='/accounts/signup'>Sign up</SignUpText>
            </ContainerTextSignUp>
        </ContainerSignUp>
    </ContainerLogin>
    </ContainerAllThePage>
    
    
  )
}

export default Login
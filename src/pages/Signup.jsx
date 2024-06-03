import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectCurrentUser } from "../store/user/user.selector";
import { useSelector } from "react-redux";

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
    height: 620px;
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
    height: 35px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.05em;
    margin-bottom: 10px;
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
const LogoFacebook = styled.div`
    width: 20px;
    height: 20px;
    background-image:  url('/img/facebook.png');
    background-size: cover;
    cursor: pointer;
 
`;

const LogWithFacebook = styled.a`
    font-weight: 550;
    color:white;
    font-weight: bold;
    font-size: 0.9em;
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

const LoginInLink = styled(Link)`
    color:var(--primary-button);
    font-weight: bold;
`;

const ContainerCenter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
const ContainerBottomText = styled.div`
    display:flex;
    flex-direction: column;

    gap: 10px;
    width: 280px;
    font-size: 0.85em;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    color: gray;

    :last-child{
        margin-bottom: 15px;
    }
`;
const BottomText = styled.p`
    display: block;
    text-align: center;
`;
const BottomLink = styled.a``;

const ErrorText = styled.p`
    color:red;
    font-size:.8em;
`;
const Signup = () => {
    const refForm = useRef();
    const [haveError,SetError] = useState(false);
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    useEffect(() =>{
        if(user){
            navigate('/')
        }
    },[user])

    const HandleRegister = (e) => {
        e.preventDefault()
        SetError('')
        let username = refForm.current.username.value;
        let password = refForm.current.password.value;
        let fullName = refForm.current.fullName.value;
        let email = refForm.current.email.value;

        if(username.length < 8) {
            return SetError('username need be at least 8 characters')
        }

        if(fullName.length < 6) {
            return SetError('full name must be at least 6 characters')
        }

        if(password.length < 8 ){
            return SetError('password need be at least 8 characters')
        }

        fetch('http://localhost:3001/RegisterPlayer',{
            method:'post',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
                username,
                email,
                password,
                fullName
            })
        }).then(data => data.json())
        .then(user => {
            if(user === 'this username is alerdy in used')
            {
                return SetError('this username is alerdy in used')
            }
                
            if(user === 'error')
            {
                return SetError('Something went wrong, try again')
            }
            
            if(user === 'this email is alerdy in used')
            {
                return SetError('this email is alerdy in used')
            }

            refForm.current.username.value = '';
            refForm.current.password.value ='';
            refForm.current.fullName.value ='';
            refForm.current.email.value ='';
        })

    }

  return (
    <ContainerAllThePage>
        <ContainerLogin>
        <ContainerLoginItems>
            <TitleLogin>Gigs Picks</TitleLogin>

            <ContainerCenter>
                <ButtonSubmitLogin>
                    <ContainerCenter>
                        <LogoFacebook/>
                        <LogWithFacebook>Log In With Facebook</LogWithFacebook>
                    </ContainerCenter>
                </ButtonSubmitLogin>
            </ContainerCenter>
            <ContainerOfLineBreak>
                <LineBreak/>
                <LineBreakText>
                    OR
                </LineBreakText>
                <LineBreak/>
            </ContainerOfLineBreak>
            <ContainerInputs ref={refForm} onSubmit={HandleRegister}>
                <InputLogin placeholder='Mobile Number or Email' name='email' type='email' required/>
                <InputLogin placeholder='Full Name' name='fullName' type='text' required/>
                <InputLogin placeholder='Username' name='username' type='text' required/>
                <InputLogin placeholder='Password' name='password' type='password' required/>
                <ContainerBottomText>
                    <BottomText>
                        People who use our service may have uploaded your contact information to Gigs. <BottomLink href="#">Learn More</BottomLink>
                    </BottomText>
                    <BottomText>
                        By signing up, you agree to our <BottomLink href="#">Terms , Privacy Policy and Cookies Policy .</BottomLink>
                    </BottomText>
                </ContainerBottomText>
               
                <ButtonSubmitLogin type="submit">Sign up</ButtonSubmitLogin>
                {(haveError.length > 0) && <ErrorText>{haveError}</ErrorText>}
                
            </ContainerInputs>
            
    
            
        </ContainerLoginItems>
        <ContainerSignUp>
            <ContainerTextSignUp>
                <DontHaveAccountText>Have an account?</DontHaveAccountText>
                <LoginInLink to='/accounts/login'>Log in</LoginInLink>
            </ContainerTextSignUp>
        </ContainerSignUp>
    </ContainerLogin>
    </ContainerAllThePage>
    
    
  )
}

export default Signup
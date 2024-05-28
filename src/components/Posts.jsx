import styled from "styled-components"
import PostComponents from "./PostComponents"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/user/user.selector"
import { useNavigate } from "react-router-dom"
const PostsContainer = styled.div`
    padding: 12px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Posts = () => {
  const [posts,setPosts] = useState()
  const [allLikes, setLikes] = useState([])
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate()
  const GetPosts = () => {
      fetch('http://localhost:3001/findPosts',{
      method:"post",
      headers:{'content-Type':'application/json'},
      body: JSON.stringify({
        userId : user._id
      })
    }).then(data => data.json())
      .then(data => {
          setPosts(data)
       })
    }
    useEffect(() => {
      if(!user)
        {
          navigate('/')
        }
        else{
          GetPosts();
        }
    },[])

      
  return (
    <>
    {posts && 
        <PostsContainer>
        
      {posts.map((data)=> {
          return <PostComponents key={nanoid()} post={data}/>
      })}
    
      </PostsContainer>
    }
    </>
    
    
  )
}

export default Posts
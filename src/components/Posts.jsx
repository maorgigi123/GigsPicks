import styled from "styled-components";
import PostComponents from "./PostComponents";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const PostsContainer = styled.div`
    padding: 12px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
 const postsID = []
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const LoaderRef = useRef(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/findPosts', {
        method: "post",
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          seenPosts: postsID
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Filter out duplicate posts
      const uniquePosts = data.filter(post => !postsID.includes(post._id));
      setPosts(prevPosts => [...prevPosts, ...uniquePosts]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    if (!posts) return;
  
    // Extract new post IDs from the fetched data
    const newPostsIDs = posts.map(post => post._id);
    
    // Filter out duplicates from new post IDs
    const uniqueNewPostsIDs = newPostsIDs.filter(id => !postsID.includes(id));

    if(uniqueNewPostsIDs.length === 0 ) return;
    postsID.push(...uniqueNewPostsIDs)
    // Update postsID state with unique IDs
    // setPostsID(prevIDs => [...prevIDs, ...uniqueNewPostsIDs]);
  }, [posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (Math.ceil((window.innerHeight + window.scrollY)) >= document.body.offsetHeight && !isLoading) {
        fetchPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <PostsContainer>
      {posts.map(data => (
        <PostComponents key={data._id} post={data} isLike={data.likes.some(like => like._id === user._id)} />
      ))}
      <Loader $isLoading={isLoading} ref={LoaderRef}/>
    </PostsContainer>
  );
};

export default Posts;

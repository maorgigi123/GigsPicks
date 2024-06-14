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
    background-color: black;
    @media screen and (max-width: 1023px){
      margin-top: 120px;
      width: 100vw;
      display: flex;
      position: absolute;
      left:0;
    }
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

const SeenAllPosts = styled.div`
   display: ${({ $display }) => ($display ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  background-color: #84c0d5;
  border-radius: 12px;
  padding: 20px;
  width:300px;
`;
const SeenAllPostsText = styled.p`
  font-size: 1.3em;
  font-weight: bold;
`;
const SeeAllPostsAgain = styled.button`
  margin-top:10px;
  border:none;
  background-color:var(--primary-button);
  border-radius:12px;
  padding:12px;
  width:120px;
  cursor: pointer;
  &:hover{
    background-color: var(--primary-button-hover)
  }
`;

const Hr = styled.div`
 display: ${({ $display }) => ($display ? 'block' : 'none')};
  background-color: red;
  width: 100%;
  max-width: 500px;
  border: 1px solid white;
  margin-top:30px;
  margin-bottom:70px;
  @media screen and (max-width: 1023px) {
      max-width: 460px;
  }
`;

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openSeeAllPosts , setOpenSeeAllPosts] = useState(false)

  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const LoaderRef = useRef(null);

  const PostsContainerRef = useRef()

  const [viewedPosts, setViewedPosts] = useState(() => {
    // Retrieve viewed posts from localStorage
    const saved = localStorage.getItem('viewedPosts');
    return saved ? JSON.parse(saved) : [];
  });


  const [postsID, setPostsID] = useState(JSON.parse(localStorage.getItem('viewedPosts')));

  const fetchPosts = async () => {
    if(openSeeAllPosts) return;
    setIsLoading(true);
    console.log('posts seen: ',postsID)
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
      console.log(data)
      // Filter out duplicate posts
      const uniquePosts = data.filter(post => !postsID.includes(post._id));
      setPosts(prevPosts => [...prevPosts, ...uniquePosts]);
      setPostsID(prevIDs => [...prevIDs, ...uniquePosts.map(post => post._id)]);
      if(viewedPosts.length > 0 && data.length <=0) setOpenSeeAllPosts(true)
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
      if(!isLoading)
        fetchPosts();
    }
  }, []);

  useEffect(() => {
    if (!posts) return;
  
    // Extract new post IDs from the fetched data
    const newPostsIDs = posts.map(post => post._id);
    // Filter out duplicates from new post IDs
    const uniqueNewPostsIDs = newPostsIDs.filter(id => !postsID.includes(id));
    if (uniqueNewPostsIDs.length === 0) return;
    setPostsID(prevIDs => [...prevIDs, ...uniqueNewPostsIDs]);
  }, [posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (Math.ceil((window.innerHeight + window.scrollY)) >= PostsContainerRef.current.scrollHeight && !isLoading && posts.length>0) {
        fetchPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  const handleView = (id) => {
    // Add the post ID to the viewedPosts state if it's not already there
    setViewedPosts((prevViewedPosts) => {
      if (!prevViewedPosts.includes(id)) {
        const updatedPosts = [...prevViewedPosts, id];
        // Save updated posts to localStorage
        localStorage.setItem('viewedPosts', JSON.stringify(updatedPosts));
        return updatedPosts;
      }
      return prevViewedPosts;
    });
  };
  const resetViewedPosts = () => {
    setViewedPosts([]); // Reset state
    localStorage.setItem('viewedPosts', JSON.stringify([])); // Clear localStorage
    setPostsID([]) // Clear the state that tracks viewed posts
    setPosts([])
    setOpenSeeAllPosts(false)
  };
   // Use useEffect to fetch posts after resetting state
   useEffect(() => {
    // Only fetch posts if the state has actually been reset
    if (posts.length === 0 && postsID.length === 0 && !isLoading) {
      console.log('hetyyyyy')
      fetchPosts();
    }
  }, [viewedPosts, postsID, fetchPosts]); 

  return (
    <PostsContainer ref={PostsContainerRef}>
      {posts.map((data,_idx) => (
        <PostComponents key={_idx} setPosts ={setPosts} post={data} posts={posts} isLike={data.likes.some(like => like._id === user._id)} onView={handleView}/>
      ))}
      {!isLoading &&
        <>
        <SeenAllPosts $display={openSeeAllPosts}>
              <SeenAllPostsText>You Seen All Posts</SeenAllPostsText>
              <SeeAllPostsAgain onClick={resetViewedPosts}>Show Again</SeeAllPostsAgain>
            </SeenAllPosts>
            <Hr $display={openSeeAllPosts} />
        </>
           

      }
       
      <Loader $isLoading={isLoading} ref={LoaderRef}/>
     
    </PostsContainer>
  );
};

export default Posts;

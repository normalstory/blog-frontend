import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
//2 import Header from '../components/common/Header'; //+상단 고정(로그인 유지)
//1 import Button from '../components/common/Button';
import PostListContainer from '../containers/posts/PostListContainer';
// import PostList from '../components/posts/PostList';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </div>
  );
};

export default PostListPage;

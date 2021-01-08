import React from 'react';
//1 import Button from '../components/common/Button';
//2 import Header from '../components/common/Header'; //+상단 고정(로그인 유지)
import HeaderContainer from '../containers/common/HeaderContainer';
import PostList from '../components/posts/PostList';

const PostListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <PostList />
    </div>
  );
};

export default PostListPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
//+ 수정삭제 컴포넌트 추가
import PostActionButtons from '../../components/post/PostActionButtons';
//++ 수정삭제 액션 연동
import { setOriginalPost } from '../../modules/write';

//++ history : 수정삭제 액션 연동
const PostViewerContainer = ({ match, history }) => {
  //처음 마운트될때 포스트 읽기 api요청
  const { postId } = match.params;
  const dispatch = useDispatch();

  //++ 수정삭제 액션 연동 : user 추가
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user, //++ 수정삭제 액션 연동
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    //언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  //++ 수정삭제 액션 연동
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };
  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={ownPost && <PostActionButtons onEdit={onEdit} />}
    />
  );
};

//url 파라미터로 받아온 id값을 조회하기 위해 withRouter 사용
export default withRouter(PostViewerContainer);

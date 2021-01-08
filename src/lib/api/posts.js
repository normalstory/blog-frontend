import client from './client';
import qs from 'qs';

//포스트 작성
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

//포스트 읽기
export const readPost = (id) => client.get(`/api/posts/${id}`);

//포스트 리스트 조회 api/post?username=tester&page=2
export const listPosts = ({ username, page, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts${queryString}`);
};

import React from 'react';
import EditorContainer from '../containers/write/EditorContainer'; //++리덕스 모듈
//import Editor from '../components/write/Editor'; // +
import Responsive from '../components/common/Responsive'; //+
import TagBoxContainer from '../containers/write/TagBoxContainer'; //++리덕스 모듈
//import TagBox from '../components/write/TagBox'; //++
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer'; //++리덕스 모듈
import { Helmet } from 'react-helmet-async';
//import WriteActionButtons from '../components/write/WriteActionButtons';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>글 작성하기 - REACTERS ;)</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;

import React from 'react';
import EditorContainer from '../containers/write/EditorContainer'; //++리덕스 모듈
//import Editor from '../components/write/Editor'; // +
import Responsive from '../components/common/Responsive'; //+
import TagBoxContainer from '../containers/write/TagBoxContainer'; //++리덕스 모듈
//import TagBox from '../components/write/TagBox'; //++
import WriteActionButtons from '../components/write/WriteActionButtons';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;

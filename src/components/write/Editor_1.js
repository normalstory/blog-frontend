import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  //페이지 위아래에 여백 지정
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  //최소 크기 지정 및 패딩 제거
  .ql-editor {
    padding: 0;
    min-height: 320;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-black::before {
    left: 0px;
  }
`;

const Editor = () => {
  const quillElement = useRef(null); //quill을 적용할 divElement선정
  const quillInstance = useRef(null); //quill 인스턴스 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세오...',
      modules: {
        //더 많은 옵션 : https://quilljs.com/docs/modules/toolbar/
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });
  }, []);

  return (
    <EditorBlock>
      <TitleInput placeholder="제목을 작성하세요" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;

2020.12.31 react-blog 01.login_UI_redux


01 작업환경 준비하기 

    0. 프로젝트 생성 
        > yarn create react-app blog-frontend
        
    1. 설정파일 만들기 
        root/.prettierrc
            {
                "singleQuote": true,
                "semi": true,
                "useTabs": false,
                "tabWidth": 2,
                "trailingComma": "all",
                "printWidth": 80
            }

        root/jsconfig.json
            {
                "compilerOptions": {
                    "target": "es6"
                }
            }

    2. 라우터 적용 
      1) 라이브러리 설치
        > yarn add react-router-dom 
      2) 라우트 관련 컴포넌트 생성
        src/pages/LoginPage.js 로그인, RegisterPage.js 회원가입, WritePage.js 글쓰기, PostPage.js 글상세|읽기, PostListPage.js 글목록
      3) 엔트리 파일 index.js에 있는 APP을 BrowserRouter로 감싸기 
        src/index.js 
      4) 라우트 경로 지정
        src/App.js 
        * <Route component={PostListPage} path={['/@:username', '/']} exact />
          = <Route component={PostListPage} path="/" exact />
            <Route component={PostListPage} path="@:username" exact />
          = 경로/@이름 으로 접근가능 

    3. 스타일 설정 
      1) 라이브러리 설치
        > yarn add styled-components
      2) 색상 팔레트 파일 생성  
        src/lib/styles/palette.js (<- https://bit.ly/mypalette)
      3) 재사용 용, 버튼 컴포넌트 만들기 
        src/components/commen/Button.js
            ...
            const Button = (props) => <StyledButton {...props} />;
      4) 글로벌 스타일 수정 
        src/index.css      

    4. 리덕스 적용 
      1) 라이브러리 설치
        > yarn add redux react-redux redux-actions immer redux-devtools-extension
       2) 모듈 생성 
       src/modules/auth.js
       3) 루트 리듀서
       src/modules/index.js
       4) 엔트리 파일 index.js에 스토어 생성, Provider를 통해 리액트에 리덕스 적용 
       src/index.js       


02 로그인 및 리덕스 연동 

    1. UI 준비하기
      1) 스냅챗 세팅 https://snippet-generator.app/
      2) Auth 템플릿 완성하기 
      3) Auth 폼 완성하기 

    2. 리덕스로 폼 상태관리하기 
      1) 모듈 작성  
       - AuthForm.js :
          import produce from 'immer'
          changeField=createAction() 
          initalizeForm=createAction() 
          initalState
          dauth=handleActions() 
      2) useDispatch와 useSelector 함수를 통해 컴포넌트(connect 대신, hooks)와 리덕스 연동 
       - LoginForm.js, 
         LoginPage.js : <AuthForm type="login" /> -> <LoginForm />
       - RegisterForm.js
         RegisterPage.js : <AuthForm type="register" /> -> <RegisterForm />
      2) 모듈 수정 
       - AuthForm.js : type, 컨테이너 props인 form, onChange, onSubmit 적용

    3. API 연동하기 
      yarn add axios redux-saga

      1) API 클라이언트에 공통된 설정을 쉽게 넣을 수 있도록 별도의 axios 인스턴스를 만든다 
        > src/lib/api/client.js

            import axios from 'axios';
            const client = axios.create();

            /** 글로벌 설정 예시 
            // API 주소를 다른 곳으로 사용함
            client.defaults.baseURL = 'https://external-api-server.com';

            // 헤더 설정
            client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

            // 인터셉터 설정
            axios.intercepter.response.use(
              (response) => {
                //요청 성공시 할 작업 내용 위치
                return response;
              },
              (error) => {
                //요청 실패시 할 작업 내용 위치
                return Promise.reject(error);
              },
            );
            */

            export default client;

      2) 프록시 설정 
        - 백엔드 서버 4000포트, 리액트 개발 서버는 3000포트 
        - CORS Cross Origin Request 오류
          -> 원인 : 별도 설정없이 API를 호출하는 경우 발생하는 에러 
          -> 대안 : 다른 주소에서도 API를 호출할 수 있도록 서버 코드 수정
                  but 실서버에서는 같은 둘 다 호스트에서 제공할테니..   
                  - 임시로-> 웹팩 개발 서버에서 지원하는 프록시Proxy 기능 사용
                    = CRA의 경우, 
                      > src/package.json 파일에 "proxy":"http://localhost:4000/" 추가 
                      -> client.get('/api/posts')하면 
                        웹팩 개발 서버가 
                        프록시 역할을 해서 http://localhost:4000/api/posts에 대신 요청 후 결과물 반환해줌 
      3) api 함수 작성 
        > src/lib/api/auth.js 
            import client from './client';

            //로그인
            export const login = ({ username, password }) =>
              client.post('api/auth/login', { username, password });

            //회원가입
            export const register = ({ username, password }) =>
              client.post('api/auth/register', { username, password });

            //로그인 상태확인
            export const check = () => client.get('api/auth/check');
            
      4) api 요청 상태관리 - redux-saga 활용 
        (1) loading 리덕스 모듈작성  
          > src/modules/loading.js 
        (2) 루트 리듀서 작성    
          > src/modules/index.js 
        (3) createRequestSaga 함수 설정
          > lib/createRequestSaga.js : 사사 생성, 리팩토링(반복코드 간소화) 
          > src/modules/auth.js : 액션생성함수와 리듀서 구현 
          > src/modules/index.js : rootSaga 생성 
          > src/index.js : redux-saga 적용 


03 회원 가입  

      1) 기본기능 구현 
        > src/containers/auth/RegisterForm.js 
      2) 사용자의 상태를 담을 user 리덕스 모듈 
        > src/modules/user.js
      3) root리듀서에 등록 
        > src/modules/index.js 
      4) 회원 가입 성공후 check를 호출-> 현재 사용자의 로그인 상태 확인 
        > src/containers/auth/RegisterForm.js   
      5) 회원 가입 성공후 홈 화면으로 이동 : withRouter로 컴포넌트 감싸기 
        > src/containers/auth/RegisterForm.js   


04 로그인   

      1) 기본 기능 구현, 성공 후 홈으로 이동 
        > src/containers/auth/LoginForm.js   
      2) 회원인증 에러처리 : 요청이 실패했을때 에러 메시지 제공
        (1) 에러발생 dom, style 작성, props로 error를 받아왔을때, 이를 반영한 랜더링 구현
        > src/components/auth/AuthForm.js  
        (2) 로그인 시, 상황별 에러 메시지 표시 
        > src/containers/auth/LoginForm.js
        (2) 회원가입 시, 상황별 에러 메시지 표시 
        > src/containers/auth/RegisterForm.js   
          - 이름,패스워드,확인 란이 비어있을때
          - 패스워드와 확인이 불일치할때 
          - 이름이 중복될때 
      *) 해더 컴퍼넌트 만들기 전에(반응형 대응)
        > src/components/common/Responsive.js 
      3) 헤더 컴포넌트 생성 -> 로그인 후 새로고침해도 로그인이 유지됨 
        > src/components/common/Header.js 
        (1) 상시 페이지 상단에 떠 있도록 fixed , 겹치지 않도록 Spacer 컴포넌트로 헤더 크기만큼의 공간확보
        (2) PostListPage에서 랜더링 
        (3) Button 클릭 -> 페이지 이동 : Link 컴포넌트를 직접 사용 (withRouter보다 웹접근성)
        > src/components/common/Header.js 
        > src/components/common/Button.js 
      4) 로그인 상태 정보제공
        > src/containers/common/HeaderContainer.js
        > src/containers/common/Header.js
      5) 로그인 상태 유지하기 
        > 브라우저에 내장되어 있는 localStorage 활용 
        > src/containers/auth/LoginForm.js 수정
              ...
              useEffect(() => {
                if (user) {
                  history.push('/');
                  try {
                    localStorage.setItem('user', JSON.stringify(user));
                  } catch (e) {
                    console.log('localStorage is not working');
                  }
                }
              }, [history, user]);
              return(...);
              ...
        > src/containers/auth/RegisterForm.js 수정 
            ..동일하게 적용 
        > src/index.js 
            localStorage를 사용하여 로그인 상태 유지
      6) 로그인 점증 실패 시 초기화
        > src/modules/user.js


05 로그아웃
    
        > src/lib/api/auth.js : 로그아웃 함수 추가 
        > src/modules/user.js : 로그아웃 액션 추가 
                                -> 액션이 디스패치되면 api 호출 후 로컬스토리지 초기화 
        > src/containers/common/HeaderContainer.js : 로그아웃 액션생성 함수를 디스패치하는 
                                                     함수를 만들어서 Header component에 전달 
        > src/components/common/Header.js : 로그아웃 호출 
        

06 글쓰기

    1 외부 라이브러리 설치 
        > yarn add quill
    2 외부 라이브러리(에디터) 적용 컴포넌트 구성 
        > src/components/write/Editor.js 
    3 글쓰기 페이지에 에디터 렌더링 
        > src/pages/writePage.js 
    4 하단 컴포넌트(태그, 취소, 완료버튼) 
        1) UI작성 
            > src/components/write/TagBox.js
                - 렌더링 최적화 : 하나만 바뀌어도 전체 렌더링되는 현상 방지 
                    -> TagItem, TagList 컴포넌트 분리 
                    -> React.memo 적용 
                - input이 바뀔 때, 태그 목록이 바뀔때만 리렌더링 처리 
        2) 글쓰기 페이지에 하단 컴포넌트 렌더링 
            > src/pages/writePage.js 
    5 태그 추가,제거 기능 구현 
            > src/components/write/TagBox.js
                - Hooks(useState, useCallback) 사용 
    6 포스트 작성 및 취소 컴포턴트 
        1) UI작성
            > src/components/write/WriteActionButtons.js
        2) 글쓰기 페이지에 하단 컴포넌트 렌더링 
            > src/pages/writePage.js 

    7 리덕스로 글쓰기 '상태' 관리하기 
        *글쓰기에 관련된 상태들이 모두 리덕스에서 관리 
        1) write 리덕스 모듈 작성 
            > src/modules/write.js 
        2) 루트 리듀서에 포함시키기 
            > src/modules/index.js 
        3) 컨테이너 컴포넌트 만들기
            (1) Editor 컨테이너 컴포넌트 만들기
                > src/containers/write/EditorContainer.js 
                (1-1) writePage에서 기존 Editor를 EditorContainer로 교체 
                    > src/pages/writePage.js
                (1-2) Editor 컴포넌트 속성에 (각각의 객션) 추가 
                    > src/components/write/Editor.js 
            (2) TagBox 컨테이너 컴포넌트 만들기
                > src/containers/write/TagBoxContainer.js 
                (2-1) writePage에서 기존 TagBox TagBoxContainer 로 교체 
                    > src/pages/writePage.js
                (3-2) TagBox 컴포넌트 속성에 (각각의 객션) 추가 
                    > src/components/write/TagBox.js 

            (2-1) WriteActionButtons 컨테이너 컴포넌트 만들기
                > src/containers/write/WriteActionButtonsContainer.js 

    8 글쓰기 API 연동하기 
        (1) 회원인증 api는 auth.js, 포스트 api는 post.js 
            > src/lib/posts.js 
                import client from './client';
                export const writePost = ({ title, body, tags }) =>
                    client.post('/api/posts', { title, body, tags });
        (2) write 리덕스 모듈에서 포스트 api를 호출하는 리덕스 액션과 writeSaga 사가 준비 
            > src/modules/write.js
        (3) 리덕스 모듈인 writeSaga를 rootSaga에 등록 
            > src/modules/index.js
        (4) WriteActionButtonsContainer.js 컨테이너 생성 
            > src/containers/write/WriteActionButtonsContainer.js 
             - 포스트 등록 버튼 -> 현재 리덕스 스토어 안의 값 사용 
                    => 새 포스트 작성 
             - 취소 등록 버튼 -> history 객체를 사용 
                    => withRouter로 컴포넌트를 미리 감싸 준 다음에 컨테이너를 만들어 줌 
             - 포스트 작성 성공 -> 서버에서 응답한 포스트 정보의 _id와 username 값을 참조
                    => 포스트를 읽을 수 있는 경로 생성 
                    => history.push를 사용하여 해당 경로로 이동 
        (5) writePage에서 기존 WriteActionButtons 컴포넌트를 WriteActionButtonsContainer로 대체


07 포스트 읽기(조회하기) 

    1 UI 준비
        1) PostViewer 컴포넌트 - UI : 포스트 제목, 작성자 계정명, 작성된 시간, 태그, 제목, 내용 
          > src/components/post/PostViewer.js 
        2) 페이지 연동 
          > src/pages/PostPage.js
    2 API 연동
        1) post 라이브러리에 readPost api 추가 
          > src/lib/api/posts.js 
        2) post 리덕스 모듈 
          > src/moudules/post.js 
        3) PostViewer 컴포넌트를 위한 컨테이너 컴포넌트 
          > src/containers/PostViewerContainer.js 
        4) PostPage에서 기존 PostViewer 컴포넌트를 PostViewerContainer로 교체 
          > src/pages/PostPage.js
        5) 이제, PostViewer 컴포넌트에 적용된 props를 사용 
          > src/components/post/PostViewer.js 

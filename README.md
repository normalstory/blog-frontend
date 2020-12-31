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

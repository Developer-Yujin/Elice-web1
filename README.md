# 포트폴리오 웹 서비스
21c 개발자들(21cDevs)

- 마이페이지에서 포트폴리오를 관리하고 커뮤니티에서 다른 사용자와 소통할 수 있는 취업 준비생들을 위한 SNS형 웹 서비스
- 편리한 디자인과 유용한 기능 위주 구현

## 서비스 구성 안내

### 1. 서비스 소개

✔기술 스택

- **FRONT** : React.js
- **BACK** : Node.js, Express.js
- **DB** : MongoDB
- **Cloud Storage** : AWS S3
- **Auth** : JWT, OAuth
- **Deploy Server** : Linux (ubuntu 20.04) / vCPU 2개 / RAM 4 GB / Disk 20GB
- **CI/CD** : Docker, gitlab-runner

✔웹 서비스에 대한 자세한 개요(차후 수정)

<커뮤니티 페이지(HOME)>
- **카테고리** : 카테고리 생성, 조회, 수정
- **게시글** : 카테고리 내 게시글 작성, 조회, 수정, 삭제
- **댓글** : 게시글 내 댓글 작성, 조회, 수정, 삭제
- **좋아요** : 게시글 좋아요 기능

<포트폴리오 페이지>
- **개인 프로필** : 프로필 조회 및 설명 수정, 프로필 사진 업로드(s3, 기본 이미지)
- **수상 이력** : 수상 이력 추가, 수상 정보 수정, 삭제, 사용자별 수상 이력 조회
- **학력** : 교육 정보 추가, 교육 정보 수정, 삭제, 사용자별 교육 정보 조회
- **프로젝트** : 프로젝트 추가, 프로젝트 정보 수정, 삭제, 사용자별 프로젝트 정보 조회, 프로젝트 기간 자동 명시
- **자격증** : 자격증 추가, 자격증 정보 수정, 삭제, 사용자별 자격증 정보 조회

<회원 관리>
- **유저 리스트** : 회원가입한 유저 전체 리스트 조회
- **유저 팔로우** : 팔로우 기능
- **회원가입** : 회원가입 시 이메일 인증, 회원가입
- **로그인** : JWT 토근 로그인(SSL로 변경 예정), SNS Login(facebook, naver, kakao, google)
- **비밀번호 바꾸기** : 이메일 인증 후 비번 변경
- **회원 탈퇴** : 사용자 회원 탈퇴

<코드 개선과 배포>
- **회원 탈퇴** : 사용자 회원 탈퇴


## 2. 서비스 주요 기능 설명(차후 수정)

**웹 서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**

- 주요 기능 (주된 활용성) 및 서브 기능 소개
- 프로젝트만의 차별점, 기대 효과

## 3. 서비스 구성도(차후 수정)

- 서비스 구조도 (사용한 기술 스택)
- 와이어프레임 (예상 웹 화면 UI) e.g) figma 사용
- API Docs

## 4. 프로젝트 팀원 역할 분담

### **멤버별 responsibility**

|이름|주요 포지션|담당 업무|
|---|---|---|
|박수정|팀장 / 백엔드 개발|깃랩 담당|
|박정미|프론트엔드 개발|오피스아워 담당|
|이유진|프론트엔드 개발|발표 담당|
|김경빈|백엔드 개발|스크럼 담당|
|노송희|백엔드 개발|오피스아워 담당|

✔세부 내역

1. 박수정: 팀장 / 백엔드 / 깃랩 담당
- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성, API Docs 제작
- 개발 단계: 팀원 간의 일정 등 조율 + 백엔드 개발, 깃랩 관리
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정
2. 박정미 : 프론트엔드 / 오피스아워 프론트엔드 담당
- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 디자인과 스토리보드 작성
- 개발 단계: 디자인과 스토리보드 기반 브라우저 완성
- 수정 단계: 피드백 반영해서 프론트엔드 설계 수정, 오피스아워issue 정리(프론트)
3. 이유진 : 프론트엔드 / 발표 담당
- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 디자인과 스토리보드 작성
- 개발 단계: 디자인과 스토리보드 기반 브라우저 완성
- 수정 단계: 피드백 반영해서 프론트엔드 설계 수정, 발표 준비
4. 김경빈 : 백엔드 / 스크럼 담당
- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, API Docs 제작
- 개발 단계: API Docs 기반으로 API 완성, DB 연동
- 수정 단계: 피드백 반영해서 백엔드 설계 수정, 스크럼 미팅 로그 작성
5. 노송희 : 백엔드 / 오피스아워 백엔드 담당
- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, API Docs 제작
- 개발 단계: API Docs 기반으로 API 완성, DB 연동
- 수정 단계: 피드백 반영해서 백엔드 설계 수정, 오피스아워issue 정리(백)

## 5. 실행 방법

- 프론트엔드:
    
    ```shell
    # creact-react-app으로 생성된 프로젝트 폴더입니다.
    - npm start
    ```
    
- 백엔드:
    
    ```shell
    # back-end 내부에서 다룸
    - npm start
    ```
    
## 6. 버전

- 프로젝트의 버전 기입 (예: 1.0.0)

## 7. FAQ

- 자주 받는 질문 정리
- 예시) 이 서비스는 어떻게 실행하면 되나요?
    - git clone을 하신 후 .env 파일을 요청하고 아래 커맨드를 입력하시면 됩니다. ~~~
    ```shell
    $ cd back
    $ npm install
    $ npm start
    # diff terminal
    $ cd front
    $ npm install
    $ npm start
    ```

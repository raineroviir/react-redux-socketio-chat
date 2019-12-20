# React-redux-socketio-chat - 한국어 번역

![alt tag](ReadmeVideo.gif)
앱의 라이브 버전을 보려면 http://slackclone.herokuapp.com를 방문하십시오.

## 사용 안내서
먼저, 저장소를 복제한 -> ‘cd resact-redux-socketio-chat’ 과 ‘npm install’

왼쪽에 있는 탐색 막대에 + 기호를 눌러 채널을 만들 수 있다.
사용자 이름을 클릭하여 개인 메시지를 보내는 경우(개인 채널 열기)

### MongoDB 설정

참고: 코드를 로컬에서 실행하려면 MongoDB를 설정하고 실행해야 한다. [Installation instructions](https://docs.mongodb.org/manual/installation/)

MongoDB를 설치했으면 다음 명령으로 새 터미널에서 MongoDB 서버를 시작하십시오.

```
mkdir db
mongod --dbpath=./db --smallfiles
```

그런 다음 새 터미널을 열고 `몽고`를 입력하고 ` chat_dev`를 입력하십시오.
이것이 당신의 데이터베이스 인터페이스 입니다.
데이터베이스에 기록을 조회하려면 db.users.find() or db.stats()를 입력하세요
모든 채널을 제거하려면 db.channels.remove({})를 입력하십시오.

그렇게 다 했으니 어서 코드를 뽑아 버려!

### Development
```
npm run dev
```
그런 다음 브라우저에서 `localhost:3000`을 가리키십시오.

참고: 이 프로그램에는 [redux-dev tools](https://github.com/gaearon/redux-devtools)가 제공됨
* Dev 도구 패널을 표시하거나 숨기려면 ctrl+h를 누르십시오.
* 위치를 변경하려면 ctrl+m을 누르십시오.

### Production

```
npm run build
npm start
```
그런 다음 브라우저에서 `localhost:3000`을 가리키십시오.

## 유용한 리소스 및 프로젝트 활용

* Erikras의 Resources and 영감을 주는 프로젝트 예: https://github.com/erikras/react-redux-universal-hot-example
* The facebook react flux-chat example: https://github.com/facebook/flux/tree/master/examples/flux-chat
* reactiflux의 멋진 커뮤니티 https://discordapp.com/channels/102860784329052160/102860784329052160

## 해야할 일 (Todos)
* 채팅 및 채널 모델에 대한 가상 스크롤을 구현하여 dom 요소가 더 빨리 로드되도록 하십시오!
* 접힌 내용물 위로만 로딩하여 initial load를 더 빠르게 할 수 있는 방법을 알아보십시오. 타원? 또는 다른 생각을 알아보십시오.

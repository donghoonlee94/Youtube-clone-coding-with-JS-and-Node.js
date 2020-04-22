// require는 어디선가 (node_modules내 포함)express를 찾아옴.
const express = require('express');
// express 실행 
const app = express();
// 4000 포트와 연결

const PORT = 4000;

function handleListening() {
  console.log(`Listening on : http://localhost:${PORT} `);
}

// request, response, get 메소드의 경로로 접근하면 해당 함수를 실행한다. send로 응답을 보내줄 수 있다. 

function handleHome(req, res) {
  res.send('Hello from home!');
}

function handleProfile(req, res) {
  res.send('Hello from profile!');
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
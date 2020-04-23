// package json에서 npm start 스크립트 추가로 명령어 지정 실행이 가능, npm install {package} -d 로하면 배포에 포함되는 게 아닌 개발자 전용으로 설치됨. nodemon --exec를 붙이면 저장할 때마다 서버 재 시동
//  const express = require('express');  < es6 문법을 사용하지 않은 경우 
// require는 어디선가 (node_modules내 포함)express를 찾아옴.
// babel 설치 후 es6 문법으로 import를 사용할 수 있음.
import "core-js";
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from './router';

// express 실행 
const app = express();
// 4000 포트와 연결

// request, response, get 메소드의 경로로 접근하면 해당 함수를 실행한다. send로 응답을 보내줄 수 있다. 

const handleHome = (req, res) => res.send('Hello from home!');

const handleProfile = (req, res) => res.send('Hello from profile!');

// use()는 middleware,순서가 중요, 위에서 아래로 실행되기 때문에 가장 위는 글로벌, 위에서 아래 순으로 순서를 정할 수 있음.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

// /user에서 userRouter를 사용하겠다는 것,
app.use("/user", userRouter);

export default app;
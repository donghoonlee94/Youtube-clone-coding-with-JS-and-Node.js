// package json에서 npm start 스크립트 추가로 명령어 지정 실행이 가능, npm install {package} -d 로하면 배포에 포함되는 게 아닌 개발자 전용으로 설치됨. nodemon --exec를 붙이면 저장할 때마다 서버 재 시동
//  const express = require('express');  < es6 문법을 사용하지 않은 경우
// require는 어디선가 (node_modules내 포함)express를 찾아옴.
// babel 설치 후 es6 문법으로 import를 사용할 수 있음.
import dotenv from 'dotenv';
import 'core-js';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from './middlewares';
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

dotenv.config();
import './passport';

// express 실행
const app = express();

// CookieStore Created 
const CokieStore = MongoStore(session);

// request, response, get 메소드의 경로로 접근하면 해당 함수를 실행한다. send로 응답을 보내줄 수 있다.

// use()는 middleware,순서가 중요, 위에서 아래로 실행되기 때문에 가장 위는 글로벌, 위에서 아래 순으로 순서를 정할 수 있음.
app.use(helmet());
app.set('view engine', 'pug');
// express의 기본 제공 middleware로, 루트 디렉토리를 지정함. 앞에 /uploads 경로를 통해 파일을 로드할 수 있게 해줌.
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// secret – 쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장합니다.
// resave – 세션을 언제나 저장할 지(변경되지 않아도) 정하는 값입니다.express - session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
//   saveUninitialized – 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.
// new CokieStore({ mongooseConnection: mongoose.connection }) mongodb와 session을 연결하는 것.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
// passport를 초기화하고 위에 cookieParser로 가져온 쿠키를 session 저장함.
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

// /user에서 userRouter를 사용하겠다는 것,
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

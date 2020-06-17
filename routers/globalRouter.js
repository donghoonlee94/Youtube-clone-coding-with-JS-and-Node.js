import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, logout, postJoin, postLogin } from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
// methods가 post로 들어오고, 경로가 routes.join이면 아래 함수가 실행된다.
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;

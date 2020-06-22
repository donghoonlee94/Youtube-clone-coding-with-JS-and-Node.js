import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, logout, postJoin, postLogin, githubLogin, postGithubLogin, getMe } from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares';
import passport from 'passport';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
// methods가 post로 들어오고, 경로가 routes.join이면 아래 함수가 실행된다.
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(routes.githubCallback, passport.authenticate("github", { failureRedirect: "/login" }), postGithubLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;

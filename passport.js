import passport from 'passport';
import User from './models/User';
import githubStrategy from 'passport-github';
import { githubLoginCallback } from './controllers/userController'
import routes from "./routes";


// createStrategy는 이미 구성된 passport-local의 localstrategy를 생성함.
passport.use(User.createStrategy());
passport.use(new githubStrategy({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: `http://localhost:4000${routes.githubCallback}`
},
  githubLoginCallback
))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serializeUser 는 로그인 성공 시 전달받은 정보를 세션, ( req.session.passport.user ) 에 저장함. 페이지 이동 시에도 로그인 정보가 유지될 수 있게 하는 것.
// deserializeUser 는 실제 서버로 들어오는 요청마다 세션 정보 ( serializeUser 에서 저장된 것 )을 실제 DB 데이터와 비교함.

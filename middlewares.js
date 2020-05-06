import routes from "./routes";
// res.locals.{변수} 를 등록함으로 전역에서 해당 값을 참고할 수 있음.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };  
  next();
};
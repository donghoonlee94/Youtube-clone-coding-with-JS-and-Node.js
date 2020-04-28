// render 함수의 인자로 파일명을 적어주면 되고, 확장자가 pug인 템플릿 파일을 찾은 후 렌더해준다. app.set('view engine', 'pug')를 설정했기에 가능한 것.
export const join = (req, res) => res.render("join", { pageTitle: "Join" });
export const login = (req, res) => res.render("login", { pageTitle: "Log In" });
export const logout = (req, res) =>
  res.render("logout", { pageTitle: "Log Out" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
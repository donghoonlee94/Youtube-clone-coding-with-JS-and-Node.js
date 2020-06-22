import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

// render 함수의 인자로 파일명을 적어주면 되고, 확장자가 pug인 템플릿 파일을 찾은 후 렌더해준다. app.set('view engine', 'pug')를 설정했기에 가능한 것.

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    // error를 res 해준다.
    return res.status(400);
    // res.render('join', { pageTitle: 'Join' });
    // } else {
    //   res.redirect(routes.home);
  }
  try {
    const user = await User({
      name,
      email,
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });

export const postLogin = passport.authenticate('local', {
  // 실패 시, 성공 시
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    id, avatar_url: avatarUrl, name, email
  } = profile._json;
  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });

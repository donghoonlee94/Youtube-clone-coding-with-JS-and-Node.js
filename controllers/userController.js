import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

// render 함수의 인자로 파일명을 적어주면 되고, 확장자가 pug인 템플릿 파일을 찾은 후 렌더해준다. app.set('view engine', 'pug')를 설정했기에 가능한 것.

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
export const postJoin = async (req, res, next) => {
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
    console.log(user);
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
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
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

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postFacebookLogin = (req, res) => {
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

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
    user: { _id }
  } = req;
  try {
    const user = await User.findById(_id)
    await User.findByIdAndUpdate(_id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    await user.save();
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};
export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
    user
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      return res.redirect(`/users/${routes.changePassword}`);
    }
    await user.changePassword(oldPassword, newPassword);
    return res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    return res.redirect(`/users/${routes.changePassword}`);
  }
};
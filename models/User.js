import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

// passport-local-mongoose는 passport를 사용한 이름 및 비밀번호 로그인을 단순화 시키는 mongoose 플러그인
// usernameField를 UserSchame의 email로 설정하겠다는 뜻.
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;

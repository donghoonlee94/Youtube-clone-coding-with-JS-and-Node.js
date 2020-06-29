import mongoose from "mongoose";

// schema는 형태 (definition)를 의미함. 형태를 만드는 것

const VideoSchema = new mongoose.Schema({
  // required : 값에 문제가 있어 (값이 오지 않아) 에러가 발생할 경우 뱉게 됨.
  // type은 mongoose 에서 어떤 타입을 사용할 수 있는지 확인 가능.
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Tilte is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    // type은 객체의 ID를 얻게 됨, ref는 어디를 참고할 것인지, Comment의 이름을 가진 model이 참고됨.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// model의 이름은 "Video", Schema는 위의 변수. mongoose.model('이름', '스키마')
const model = mongoose.model("Video", VideoSchema);
export default model;
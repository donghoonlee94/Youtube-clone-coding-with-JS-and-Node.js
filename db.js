import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoDB와 연결, mongoose.connect(' mongoDB서버 URL/이름 ')
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);


const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

// 연결되면 실행되는 함수, on으로 error를 묶을 경우 에러 발생 시 error가 인자로 들어온다.

db.once("open", handleOpen);
db.on("error", handleError);
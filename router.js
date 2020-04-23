import express from "express";

export const userRouter = express.Router();

// 루트 "/"는 export해서 사용한 곳에서 get 주소를 어떻게 해주냐에 따라 달라짐. 자식 라우터 같은 개념.
userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
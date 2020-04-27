import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

// 4000 포트와 연결
app.listen(PORT, handleListening);
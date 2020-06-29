import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    // find({}) 모든 데이터 베이스 정보를 가져온다.
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const search = async (req, res) => {
  // 아래 문법이 const searchingBy = req.query.term 와 같음. es6의 문법.
  const {
    query: { term: searchingBy },
  } = req;
  // input에서 name으로 데이터를 보내고, req.query에서 해당 네임에 들어가 있는 값 데이터를 render 시 같이 내려준다. 내려주기 때문에 search.pug 에서 #{searchingBy} 로 노출해줄 수 있음.
  let videos = [];
  try {
    videos = await Video.find({
      // regular express, searchingBy를 포함하는 것 모두 검색, $options: i 는 대소문자를 구분하지 않겠다는 뜻.
      title: { $regex: searchingBy, $options: 'i' },
    });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
  // 이 함수를 부르기 전 uploadVideo 미들웨어 함수에서 multer으로 전달받은 파일을 requset.file에 포함시켜줌. 그 외에 텍스트 필드는 body에 저장됨.
  const {
    body: { title, description },
    file: { path },
    user
  } = req;
  // create 로 데이터베이스에 저장하는 것. 객체나 배열을 전달 받음. 프로미스 함수
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: user.id
  });
  // {
  //   views: 0,
  //     comments: [],
  //       _id: 5ec67fab44ae8b13c078d4c5,
  //         fileUrl: 'uploads\\videos\\9b5fdfd6c4af1867b1aeb1f0de0dbd97',
  //           title: '1234',
  //             description: '1234',
  //               createdAt: 2020 - 05 - 21T13: 18: 35.671Z,
  //                 __v: 0
  // }
  // id는 mongodb에서 임의로 만들어줌.
  // newVideo.id (ObjectID)를 user의 videos에 푸쉬
  user.videos.push(newVideo.id);
  user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // const VIDEO_DETAIL = "/:id"; 로 되어 있어서 params에 id로 받을 수 있음.
  try {
    // populate는 ObjectId 타입에만 사용할 수 있고 객체를 가져옴.
    const video = await Video.findById(id).populate("creator");
    console.log(video);
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

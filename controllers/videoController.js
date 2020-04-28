export const home = (req, res) => res.render("home", { pageTitle: 'home' });

export const search = (req, res) => {
  // 아래 문법이 const searchingBy = req.query.term 와 같음. es6의 문법. 
  const { query: {term: searchingBy }} = req;
  // 데이터를 render 시 같이 내려준다. 내려주기 때문에 search.pug 에서 #{searchingBy} 로 노출해줄 수 있음.
  res.render("search", { pageTitle: 'search', searchingBy});
}

export const upload = (req, res) => res.render("upload", { pageTitle: 'upload' });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: 'videoDetail' });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: 'editVideo' });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: 'deleteVideo' });
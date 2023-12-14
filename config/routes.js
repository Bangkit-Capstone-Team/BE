const {
  getUsers,
  getUserById,
  insertUser,
  updateDataUser,
  deleteUser
} = require('../controller/user');

const {
  getReviews,
  getReviewById,
  insertReview,
  updateDataReview,
  deleteReview
} = require('../controller/review');

const {
  getCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory
} = require('../controller/category');

const {
  getHasCategories,
  getHasCategoryById,
  insertHasCategory,
  updateDataHasCategory,
  deleteHasCategory
} = require('../controller/has-category');

const {
  getContents,
  getContentById,
  searchContent,
  searchContentByImage,
  insertContent,
  updateContent,
  deleteContent
} = require('../controller/content');

const {
  getContentViewLogs,
  getContentViewLogById,
  insertContentViewLog,
} = require('../controller/content-view-log');

const {
  getContentReactionLogByIDContent,
  insertContentReactionLog,
  updateContentReactionLog,
} = require('../controller/content-reaction-log');

const {
  getBanner,
  getBannerById,
  insertBanner,
  updateBanner,
  deleteBanner
} = require('../controller/banner');

const {
  home
} = require('../controller/home')

const { authLogin, register } = require('../controller/auth')
const { verifyUser } = require('./middleware')
const {get_image_search, get_files_content, proses_image} = require('../helper/image-handler');

const base_url = '/api/v1'


module.exports = (app) => {
  //user
  app.get(`${base_url}/users`, getUsers);
  app.get(`${base_url}/users/:id`, getUserById);
  app.post(`${base_url}/users`, insertUser);
  app.put(`${base_url}/users/:id`, updateDataUser);
  app.delete(`${base_url}/users/:id`, deleteUser);

  //review
  app.get(`${base_url}/reviews`, getReviews);
  app.get(`${base_url}/reviews/:id`, getReviewById);
  app.post(`${base_url}/reviews`, insertReview);
  app.put(`${base_url}/reviews/:id`, updateDataReview);
  app.delete(`${base_url}/reviews/:id`, deleteReview);

  //categories
  app.get(`${base_url}/categories`, getCategories);
  app.get(`${base_url}/categories/:id`, getCategoryById);
  app.post(`${base_url}/categories`, insertCategory);
  app.put(`${base_url}/categories/:id`, updateCategory);
  app.delete(`${base_url}/categories/:id`, deleteCategory);

  //has_category
  app.get(`${base_url}/has-categories`, getHasCategories);
  app.get(`${base_url}/has-categories/:id`, getHasCategoryById);
  app.post(`${base_url}/has-categories`, insertHasCategory);
  app.put(`${base_url}/has-categories/:id`, updateDataHasCategory);
  app.delete(`${base_url}/has-categories/:id`, deleteHasCategory);

  //content
  app.get(`${base_url}/contents`, getContents);
  app.get(`${base_url}/contents/:id`, getContentById);
  app.get(`${base_url}/contents/search/:keyword`, searchContent);
  app.post(`${base_url}/contents/search`, get_image_search, proses_image, searchContentByImage);
  app.post(`${base_url}/contents`,get_files_content, insertContent);
  app.put(`${base_url}/contents/:id`, updateContent);
  app.delete(`${base_url}/contents/:id`, deleteContent);

  //content_view_logs
  app.get(`${base_url}/content-view-logs`, getContentViewLogs);
  app.get(`${base_url}/content-view-logs/:id`, getContentViewLogById);
  app.post(`${base_url}/content-view-logs`, insertContentViewLog);

  //content_reaction_logs
  // app.get(`${base_url}/content-reaction-logs`, getContentReactionLogs);
  app.get(`${base_url}/content-reaction-logs/:id_content`, getContentReactionLogByIDContent);
  app.post(`${base_url}/content-reaction-logs`, insertContentReactionLog);
  app.put(`${base_url}/content-reaction-logs/:id_content`, updateContentReactionLog);

  //banner
  app.get(`${base_url}/banners`, getBanner);
  app.get(`${base_url}/banners/:id`, getBannerById);
  app.post(`${base_url}/banners`, insertBanner);
  app.put(`${base_url}/banners/:id`, updateBanner);
  app.delete(`${base_url}/banners/:id`, deleteBanner);

  //home
  app.get(`${base_url}/home/:id`, home)

  app.post(`${base_url}/auth/login`, authLogin)
  app.post(`${base_url}/auth/register`, register)

  const gen_token = require('../helper/generate-token')
  app.post(`${base_url}/gen-access-token`, (req, res) => {
    const { refresh_token } = req.body
    gen_token(refresh_token, (err, acces_token) => {
      if (err) return res.status(401).json({ status: false, msg: "Unauthorized" });
      res.status(200).json({status: true, acces_token})
    })
  })
};

const {
  getUsers,
  getUserById,
  insertUser,
  updateDataUser,
  deleteUser
} = require('../controller/User');

const {
  getReviews,
  getReviewById,
  insertReview,
  updateDataReview,
  deleteReview
} = require('../controller/Review');

const {
  getCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory
} = require('../controller/Category');

const {
  getHasCategories,
  getHasCategoryById,
  insertHasCategory,
  updateDataHasCategory,
  deleteHasCategory
} = require('../controller/HasCategory');

const {
  getContents,
  getContentById,
  insertContent,
  updateContent,
  deleteContent
} = require('../controller/Content');

const {
  getContentViewLogs,
  getContentViewLogById,
  insertContentViewLog,
  updateContentViewLog,
  deleteContentViewLog
} = require('../controller/ContentViewLog');

const {
  getContentReactionLogs,
  getContentReactionLogById,
  insertContentReactionLog,
  updateContentReactionLog,
  deleteContentReactionLog
} = require('../controller/ContentReactionLog');

const { authLogin } = require('../controller/Auth')
const { verifyUser } = require('./middleware')

const base_url = '/api/v1'


module.exports = (app) => {
  //user
  app.get(`${base_url}/users`, getUsers);
  app.get(`${base_url}/user/:id`, getUserById);
  app.post(`${base_url}/user/add`, insertUser);
  app.put(`${base_url}/user/:id`, updateDataUser);
  app.delete(`${base_url}/user/:id`, deleteUser);

  //review
  app.get(`${base_url}/review`, getReviews);
  app.get(`${base_url}/review/:id`, getReviewById);
  app.post(`${base_url}/review/`, insertReview);
  app.put(`${base_url}/review/:id`, updateDataReview);
  app.delete(`${base_url}/review/:id`, deleteReview);

  //categories
  app.get(`${base_url}/categories`, getCategories);
  app.get(`${base_url}/category/:id`, getCategoryById);
  app.post(`${base_url}/category/add`, insertCategory);
  app.put(`${base_url}/category/:id`, updateCategory);
  app.delete(`${base_url}/category/:id`, deleteCategory);

  //has_category
  app.get(`${base_url}/has-categories`, getHasCategories);
  app.get(`${base_url}/has-category/:id`, getHasCategoryById);
  app.post(`${base_url}/has-category/add`, insertHasCategory);
  app.put(`${base_url}/has-category/:id`, updateDataHasCategory);
  app.delete(`${base_url}/has-category/:id`, deleteHasCategory);

  //content
  app.get(`${base_url}/contents`, getContents);
  app.get(`${base_url}/content/:id`, getContentById);
  app.post(`${base_url}/content/add`, insertContent);
  app.put(`${base_url}/content/:id`, updateContent);
  app.delete(`${base_url}/content/:id`, deleteContent);

  //content_view_logs
  app.get(`${base_url}/content-view-logs`, getContentViewLogs);
  app.get(`${base_url}/content-view-log/:id`, getContentViewLogById);
  app.post(`${base_url}/content-view-log/add`, insertContentViewLog);
  app.put(`${base_url}/content-view-log/:id`, updateContentViewLog);
  app.delete(`${base_url}/content-view-log/:id`, deleteContentViewLog);

  //content_reaction_logs
  app.get(`${base_url}/content-reaction-logs`, getContentReactionLogs);
  app.get(`${base_url}/content-reaction-log/:id`, getContentReactionLogById);
  app.post(`${base_url}/content-reaction-log/add`, insertContentReactionLog);
  app.put(`${base_url}/content-reaction-log/:id`, updateContentReactionLog);
  app.delete(`${base_url}/content-reaction-log/:id`, deleteContentReactionLog);

  app.post(`${base_url}/login`, authLogin)
  app.get(`${base_url}/get-access-token`, (req, res) => {
    res.send("ok")
  })
};

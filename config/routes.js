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
} = require('../controller/categories');

const {
  getHasCategories,
  getHasCategoryById,
  insertHasCategory,
  updateDataHasCategory,
  deleteHasCategory
} = require('../controller/hasCategory');

const {
  getContents,
  getContentById,
  insertContent,
  updateContent,
  deleteContent
} = require('../controller/content');

const {
  getContentViewLogs,
  getContentViewLogById,
  insertContentViewLog,
  updateContentViewLog,
  deleteContentViewLog
} = require('../controller/contentViewLog');

const {
  getContentReactionLogs,
  getContentReactionLogById,
  insertContentReactionLog,
  updateContentReactionLog,
  deleteContentReactionLog
} = require('../controller/contentReactionLog');

const { authLogin } = require('../controller/Auth')
const { verifyUser } = require('./middleware')

module.exports = (app) => {
  //user
  app.get('/users', getUsers);
  app.get('/user/:id', getUserById);
  app.post('/user/add', insertUser);
  app.put('/user/update/:id', updateDataUser);
  app.delete('/user/delete/:id', deleteUser);

  //review
  app.get('/review', getReviews);
  app.get('/review/:id', getReviewById);
  app.post('/review/add', insertReview);
  app.put('/review/update/:id', updateDataReview);
  app.delete('/review/delete/:id', deleteReview);

  //categories
  app.get('/categories', getCategories);
  app.get('/category/:id', getCategoryById);
  app.post('/category/add', insertCategory);
  app.put('/category/update/:id', updateCategory);
  app.delete('/category/delete/:id', deleteCategory);

  //has_category
  app.get('/has-categories', getHasCategories);
  app.get('/has-category/:id', getHasCategoryById);
  app.post('/has-category/add', insertHasCategory);
  app.put('/has-category/update/:id', updateDataHasCategory);
  app.delete('/has-category/delete/:id', deleteHasCategory);

  //content
  app.get('/content', getContents);
  app.get('/content/:id', getContentById);
  app.post('/content/add', insertContent);
  app.put('/content/update/:id', updateContent);
  app.delete('/content/delete/:id', deleteContent);

  //content_view_logs
  app.get('/content-view-logs', getContentViewLogs);
  app.get('/content-view-log/:id', getContentViewLogById);
  app.post('/content-view-log/add', insertContentViewLog);
  app.put('/content-view-log/update/:id', updateContentViewLog);
  app.delete('/content-view-log/delete/:id', deleteContentViewLog);

  //content_reaction_logs
  app.get('/content-reaction-logs', getContentReactionLogs);
  app.get('/content-reaction-log/:id', getContentReactionLogById);
  app.post('/content-reaction-log/add', insertContentReactionLog);
  app.put('/content-reaction-log/update/:id', updateContentReactionLog);
  app.delete('/content-reaction-log/delete/:id', deleteContentReactionLog);

  app.post('/login', authLogin)
};

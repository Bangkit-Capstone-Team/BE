const {
    getUsers,
    getUserById,
    insertUser,
    updateDataUser,
    deleteUser,
} = require('../controller/Users');

const { authLogin } = require('../controller/Auth')
const { verifyUser } = require('./middleware')

module.exports = (app) => {
  app.post('/login', authLogin);
  
  app.get('/users', verifyUser, getUsers);
  app.get('/user/:id', getUserById);
  app.post('/user/add', insertUser);
  app.put('/user/update/:id', updateDataUser);
  app.delete('/user/delete/:id', deleteUser);

};

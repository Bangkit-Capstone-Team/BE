const {
    getDataAll,
    getDataById,
    insertProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/handler');

module.exports = (app) => {
  app.get('/products', getDataAll);
  app.get('/product/:id', getDataById);
  app.post('/product/add', insertProduct);
  app.put('/product/update/:id', updateProduct);
  app.delete('/product/delete/:id', deleteProduct);
};

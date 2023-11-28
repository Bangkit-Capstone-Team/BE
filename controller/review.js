const { Review } = require('../src/models')

//Handler Reviews
const getReviews = (req, res) => {
    Review
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getReviewById = (req, res) => {
      Review.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };
  
  const insertReview = (req, res) => {
    Review.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
  };
  
  const updateDataReview = (req, res) => {
      Review.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
  };
  
  const deleteReview = (req, res) => {
      Review.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {

    getReviews,
    getReviewById,
    insertReview,
    updateDataReview,
    deleteReview

  }
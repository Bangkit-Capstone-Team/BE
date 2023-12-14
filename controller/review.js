const { Reviews } = require('../database/models')

//Handler Reviews
const getReviews = (req, res) => {
    Reviews
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getReviewById = (req, res) => {
      Reviews.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };
  
  const insertReview = (req, res) => {
    Reviews.create(req.body).then(() => res.json({ status: true, msg: 'Data berhasil ditambahkan' }));
  };
  
  const updateDataReview = (req, res) => {
      Reviews.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: true, msg: 'Data berhasil diperbarui' }));
  };
  
  const deleteReview = (req, res) => {
      Reviews.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {
    getReviews,
    getReviewById,
    insertReview,
    updateDataReview,
    deleteReview
  }
const { Banner, Content_view_log } = require('../database/models');
const { Op } = require('sequelize');

// Contoh data
const categoryList = "1,2,2,1,3,4,5";

const home = (req, res) => {
  const categoryIds = categoryList.split(',');

  // Menggunakan Promise.all untuk mengeksekusi kueri secara paralel
  Promise.all([
    Banner.findAll({
      where: {
        id_category: { [Op.in]: categoryIds },
      },
      limit: 5,
    }),
    Content_view_log.findAll({
      where: {
        id_user: req.params.id,
      },
      limit: 5,
      order: [['createdAt', 'ASC']],
    }),
  ])
    .then(([bannerData, watchLogData]) => {
      const response = {
        banners: bannerData,
        watchLog: watchLogData,
      };
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

module.exports = {
  home,
};

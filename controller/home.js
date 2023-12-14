const { Banners, Content_view_logs,  Contents } = require('../database/models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

// Contoh data
const categoryList = "1,2,2,1,3,4,5";

const home = (req, res) => {
  const categoryIds = categoryList.split(',');

  // Menggunakan Promise.all untuk mengeksekusi kueri secara paralel
  Promise.all([
    //data banner
    Banners.findAll({
      where: {
        id_category: { [Op.in]: categoryIds },
      },
      limit: 5,
    }),

    //data view log
    Content_view_logs.findAll({
      where: {
        id_user: req.params.id,
      },
      limit: 5,
      order: [['createdAt', 'ASC']],
    }),

    //data content terbaru
    Contents.findAll({
        order: [['createdAt', 'ASC']],
      }),

    //data terpopuler
    Content_view_logs.findAll({
        attributes: ['id_content', [sequelize.fn('COUNT', 'id_content'), 'viewCount']],
        group: ['id_content'],
        order: [[sequelize.literal('viewCount'), 'DESC']],
        limit: 20, // limit contents
    })
  ])
  .then(([bannerData, watchLogData, newDocumentData, contentPopularData]) => {
    const response = {
      banners: bannerData,
      watchLog: watchLogData,
      newDocument: newDocumentData,
      contentPopular: contentPopularData
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

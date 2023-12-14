const { Content_view_logs } = require('../database/models');

//Content_views_logs
const getContentViewLogs = (req, res) => {
  Content_view_logs.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};

const getContentViewLogById = (req, res) => {
  Content_view_logs.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length == 0) return res.status(404).json({ status: false, msg: 'Data tidak ditemukan' });
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const insertContentViewLog = (req, res) => {
  Content_view_logs.create(req.body).then(() => res.json({ status: true, msg: 'Data berhasil ditambahkan' }));
};

module.exports = {
  getContentViewLogs,
  getContentViewLogById,
  insertContentViewLog,
};

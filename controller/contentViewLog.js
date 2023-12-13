const { Content_view_log } = require('../database/models');

//Content_views_logs
const getContentViewLogs = (req, res) => {
  Content_view_log.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => console.error(err));
};

const getContentViewLogById = (req, res) => {
  Content_view_log.findAll({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => {
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const insertContentViewLog = (req, res) => {
  Content_view_log.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
};

const updateContentViewLog = (req, res) => {
  Content_view_log.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
};

const deleteContentViewLog = (req, res) => {
  Content_view_log.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
};

module.exports = {
  getContentViewLogs,
  getContentViewLogById,
  insertContentViewLog,
  updateContentViewLog,
  deleteContentViewLog,
};

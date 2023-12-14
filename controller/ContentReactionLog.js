const { Content_reaction_logs } = require('../database/models');

//Content_reaction_logs
// const getContentReactionLogs = (req, res) => {
//   Content_reaction_logs.findAll()
//     .then((datas) => res.json(datas))
//     .catch((err) => {
//       console.log(err)
//       res.status(500).send('Server Error')
//     })
// };

const getContentReactionLogByIDContent = (req, res) => {
  Content_reaction_logs.findAll({ where: { id: req.params.id_content } })
    .then((data) => {
      if(data.length == 0) return req.status(404).json({status: false, msg: 'Reaction tidak ditemukan'})
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const insertContentReactionLog = (req, res) => {
  Content_reaction_logs.create(req.body)
    .then(() => res.json({ status: true }))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
};

const updateContentReactionLog = (req, res) => {
  Content_reaction_logs.update(req.body, { where: { id: req.params.id_content } })
    .then(() => res.status(200).json({ status: true }))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Error');
    });
};

// const deleteContentReactionLog = (req, res) => {
//   Content_reaction_logs.destroy({ where: { id: req.params.id } })
//     .then(() => res.json({ status: true, msg: 'Data berhasil terhapus' }))
//     .catch(err)
// };

module.exports = {
  getContentReactionLogByIDContent,
  insertContentReactionLog,
  updateContentReactionLog,
};

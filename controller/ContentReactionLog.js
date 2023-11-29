const  { Content_reaction_log }  = require('../database/models');

//Content_reaction_logs
const getContentReactionLogs = (req, res) => {
    Content_reaction_log
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getContentReactionLogById = (req, res) => {
    Content_reaction_log.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };
  
  const insertContentReactionLog = (req, res) => {
    Content_reaction_log.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
  };
  
  const updateContentReactionLog = (req, res) => {
    Content_reaction_logg.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
  };
  
  const deleteContentReactionLog = (req, res) => {
    Content_reaction_log.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {

    getContentReactionLogs,
    getContentReactionLogById,
    insertContentReactionLog,
    updateContentReactionLog,
    deleteContentReactionLog
  };

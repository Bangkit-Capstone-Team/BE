const { Contents, Products } = require("../database/models");
const { Op } = require("sequelize");
const { queryContent } = require("../helper/model-recomendation");
const { image_reconition } = require("../helper/model-image");

//content
const getContents = (req, res) => {
  Contents.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send("Server Error");
    });
};

const getContentById = (req, res) => {
  Contents.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length == 0)
        return res.status(404).json({ msg: "id content not found" });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send("Server Error");
    });
};

const searchContent = async (req, res) => {
  const query = req.params.keyword;
  const page = req.query.page;
  const size = req.query.size;

  Contents.findAll()
    .then(async (data) => {
      const response = await queryContent(query, data, page, size);
      // console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).send("Server Error");
    });
};

const searchContentByImage = async (req, res) => {
  try {
    let { status, predict } = await image_reconition(req.file.path);
    if (status) {
      Contents.findAll()
        .then(async (data) => {
          const response = await queryContent(predict, data);
          // console.log(response);
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Server Error");
        });
    } else {
      res.status(500).json();
    }
    // const inputTensor = tf.
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const insertContent = (req, res) => {
  const thumbnail = req.files["thumbnail"][0];
  const source = req.files["source"][0];
  req.body.thumbnail = thumbnail.filename;
  req.body.source = source.filename;

  Contents.create(req.body)
    .then(() => res.json({ status: true, msg: "Data berhasil ditambahkan" }))
    .catch((error) => {
      console.error(error);
      res.status(500).send("server error");
    });
};

const updateContent = (req, res) => {
  Contents.update(req.body, { where: { id: req.params.id } })
    .then(() => res.json({ status: true, msg: "Data berhasil diupdate" }))
    .catch((error) => {
      console.error(error);
      res.status(500).send("server error");
    });
};

const deleteContent = (req, res) => {
  Contents.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(200).json({ status: true, msg: "Data berhasil terhapus" })
    )
    .catch((error) => {
      console.error(error);
      res.status(500).send("server error");
    });
};

module.exports = {
  getContents,
  getContentById,
  searchContent,
  searchContentByImage,
  insertContent,
  updateContent,
  deleteContent,
};

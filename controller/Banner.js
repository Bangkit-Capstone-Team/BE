const { Banner } = require('../database/models')

const getBanner = (req, res) => {
  Banner
    .findAll()
    .then((datas) => res.json(datas))
    .catch(err => {
      console.log(err)
      res.statusCode = 500
      res.send("Server Error")
  });
};
  
const getBannerById = (req, res) => {
  Banner
    .findAll({ where: { id: req.params.id } })
    .then((data) => {
      if(data.length == 0) return res.status(404).json({msg: "id banner not found"})
      res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.statusCode = 500
        res.send("Server Error")
    })
};


const getBannerByCategory = (req, res) => {
    const categoryIds = req.params.id_category.split(',');
  
    Banner
      .findAll({ 
        where: { 
          id: req.params.id,
          id_category: { [Op.in]: categoryIds }
        }, 
        limit: 5 
      })
      .then((data) => {
        if(data.length === 0) return res.status(404).json({ msg: "category banner not found" });
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Server Error");
      });
  };


const insertBanner = (req, res) => {
  Banner
    .create(req.body)
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
    });

};


const updateBanner = (req, res) => {
  Banner
    .update(req.body, { where: { id: req.params.id } })
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil diupdate' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
    })
};

  
const deleteBanner = (req, res) => {
  Banner
    .destroy({ where: { id: req.params.id } })
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
    })
};

module.exports = {
  getBanner,
  getBannerById,
  getBannerByCategory,
  insertBanner,
  updateBanner,
  deleteBanner
}

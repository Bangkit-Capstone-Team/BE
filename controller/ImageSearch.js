const multer = require('multer');
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UploadImage = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'error', msg: 'Multer error', error: err.message });
        }

        const response = await axios.post('http:/example.api.ml_model/image', {
            file: req.file,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
    });
}

module.exports = { UploadImage };

const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (data) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(data, salt);
};

const decrypt = (data, dataCompare, callback) => {
    bcrypt.compare(data, dataCompare, (err, result) => {
        return callback(result);
  });
};

module.exports = { encrypt, decrypt };
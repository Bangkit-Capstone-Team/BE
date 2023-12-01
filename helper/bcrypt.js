const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (data) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(data, salt, function (err, hash) {
      return hash;
    });
  });
};

const decrypt = (data, dataCompare) => {
  bcrypt.compare(data, dataCompare, (err, result) => {
    return result;
  });
};

module.exports = { encrypt, decrypt };
const jwt = require('jsonwebtoken');

module.exports = (refresh_token, cb) => {
  jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decode) => {
    if (err) return cb(err, null);

    const { id, email, role } = decode;
    const access_token = jwt.sign({ id, email, role }, process.env.ACCESS_TOKEN, { expiresIn: '600s' });
    cb(err, access_token);
  });
};

const redis = require("redis");
const client = redis.createClient(6379);

function getToken(payload) {
  const { userId, type = "access.token" } = payload;
  return new Promise((resolve, reject) => {
    client.get(`${type}.${userId}`, function (err, reply) {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
}

function setToken(payload) {
  const { userId, token, type = "access.token", expirein = 1000 } = payload;
  return new Promise((resolve, reject) => {
    client.setex(`${type}.${userId}`, expirein, token, function (err, reply) {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
}

module.exports = { getToken, setToken };

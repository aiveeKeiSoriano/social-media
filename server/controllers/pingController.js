const Ping = require("../models/ping");

const createPing = async (data, auth) => {
  let newPing = new Ping({name: auth || 'Ping'});
  await newPing.save();
  return newPing;
};

module.exports = {
  createPing,
};

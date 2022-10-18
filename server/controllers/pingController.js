const Ping = require("../models/ping");

const createPing = async () => {
  let newPing = new Ping({name: 'Ping'});
  await newPing.save();
  return newPing;
};

module.exports = {
  createPing,
};

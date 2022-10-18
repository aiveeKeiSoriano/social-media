const Ping = require("../models/ping");

const createPing = async (data) => {
  let newPing = new Ping({name: data?.user?.email || 'Ping'});
  await newPing.save();
  return newPing;
};

module.exports = {
  createPing,
};

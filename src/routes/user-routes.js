const db = require("../models/user-model");

async function getUsers(req, res, next) {
  try {
    const users = await db.User.find({}).lean();

    res.status(200).send({ data: users });
  } catch (err) {
    next(error);
  }
}

module.exports = { getUsers: getUsers };

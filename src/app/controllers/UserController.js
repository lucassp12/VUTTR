const User = require("../models/User");

class UserController {
  async index(req, res) {
    const user = await User.find();

    return res.json(user);
  }
  async store(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: "User already exists" });
      }
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new UserController();

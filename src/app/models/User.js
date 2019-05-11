const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const MongooseAutoIncrementID = require("mongoose-auto-increment-reworked")
  .MongooseAutoIncrementID;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });
  }
};
const plugin = new MongooseAutoIncrementID(UserSchema, "User", {
  field: "_id",
  incrementBy: 1,
  nextCount: false,
  startAt: 0
});
plugin.applyPlugin();
UserSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: "User" });

module.exports = mongoose.model("User", UserSchema);

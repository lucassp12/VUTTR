const express = require("express");
const validate = require("express-validation");

const routes = express.Router();

const validators = require("./app/validators");
const authMiddleware = require("./app/middlewares/auth");

//User
const UserController = require("./app/controllers/UserController");
routes.get("/users", UserController.index);
routes.post("/users", validate(validators.User), UserController.store);

//Session
const SessionController = require("./app/controllers/SessionController");
routes.post("/session", validate(validators.Session), SessionController.store);

routes.use(authMiddleware);

//Tools
const ToolsController = require("./app/controllers/ToolsController");
routes.get("/tools", ToolsController.index);
routes.post("/tools", validate(validators.Tool), ToolsController.store);
routes.delete("/tools/:id", ToolsController.destroy);
module.exports = routes;

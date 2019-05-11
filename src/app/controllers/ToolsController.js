const Tools = require("../models/Tools");

class ToolsController {
  async index(req, res) {
    const filters = {};
    if (req.query.tags) {
      filters.tags = new RegExp(req.query.tags, "i");
    }
    const tool = await Tools.paginate(filters);

    return res.json(tool);
  }
  async store(req, res) {
    const tool = await Tools.create(req.body);

    return res.json(tool);
  }
  async destroy(req, res) {
    await Tools.findByIdAndRemove(req.params.id);

    return res.json();
  }
}

module.exports = new ToolsController();

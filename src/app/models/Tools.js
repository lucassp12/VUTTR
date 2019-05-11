const mongoose = require("mongoose");
const MongooseAutoIncrementID = require("mongoose-auto-increment-reworked")
  .MongooseAutoIncrementID;
const mongoosePaginate = require("mongoose-paginate");

const ToolsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});
const plugin = new MongooseAutoIncrementID(ToolsSchema, "Tools", {
  field: "id",
  incrementBy: 1,
  nextCount: false,
  startAt: 1
});
ToolsSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    // remove o _id dos documentos antes de retornar
    delete ret._id;
  }
});
plugin.applyPlugin();
ToolsSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: "Tools" });

ToolsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Tools", ToolsSchema);

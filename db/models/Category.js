const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CategorySchema = Schema(
  {
    name: String,
    image: String,
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Category", CategorySchema);

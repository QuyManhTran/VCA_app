const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    history: {
      type: Array,
      items: {
        type: Object,
        properties: {
          title: {
            type: String,
          },
          content: {
            type: String,
          },
          image: {
            type: String,
          },
        },
      },
    },
    recipes: {
      type: Object,
      properties: {
        prepare: String,
        cook: String,
      },
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    ingredient_list: {
      type: Array,
      items: {
        type: Object,
        properties: {
          name: {
            type: String,
          },
          quantity: {
            type: String,
          },
          image: {
            type: String,
          },
        },
      },
    },
    like: {
      type: Number,
      format: "int32",
      default: 0,
    },
    rate: {
      type: Number,
      format: "Double",
      default: 0,
    },
    tags: {
      type: Array,
      items: {
        type: String,
      },
    },
    comment: {
      type: Array,
      items: {
        type: Object,
        property: {
          username: {
            type: String,
          },
          avatar: {
            type: String,
          },
          content: {
            type: String,
          },
        },
      },
    },
    rate_list: {
      type: Array,
      items: {
        type: Object,
        prototype: {
          user_id: String,
          rate: {
            type: Number,
            format: "int32",
          },
        },
      },
    },
    model_3d: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("food", FoodSchema);

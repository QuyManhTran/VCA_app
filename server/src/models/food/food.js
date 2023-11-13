const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema ({
    name: {
        type: String,
    },
    describe: {
        type: String,
    },
    history: {
        type: Array,
        items: {
            type: Object,
            properties: {
                title: {
                    type: String
                },
                content: {
                    type: String
                },
                image: {
                    type: String
                }
            },
        },
    },
    recipes: {
        type: Object,
        properties: {
            prepare: String,
            cook: String,
        }
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    ingredient_list: {
        type: Array,
        items: {
            type: Object,
            properties: {
                name: {
                    type: String
                },
                quantity: {
                    type: String
                },
                image: {
                    type: String
                }
            },
        },
    },
    like: {
        type: Number,
        format: "int32",
        default: 0
    },
    rate: {
        type: Number,
        format: "double",
        default: 0
    },
    tag: {
        type: Array,
        items: {
            type: String
        }
    },
    comment: {
        type: Array,
        items: {
            type: Object,
            property: {
                username: {
                    type: String
                },
                avatar: {
                    type: String
                },
                content: {
                    type: String
                }
            }
        }
    }


})

module.exports = mongoose.model('food', FoodSchema)
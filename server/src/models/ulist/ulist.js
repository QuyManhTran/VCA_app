const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UList = new Schema({
    name: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    list: {
        type: Array,
        items: {
            type: Object,
            properties: {
                id_food: {
                    type: String,
                    unique: true
                },
                image: {
                    type: String,
                }
            }

        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ulist', UList)
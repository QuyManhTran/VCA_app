const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
    id_user: {
        type: String,
        require: true,
        ref: 'accounts'
    },
    watchedFoods: [
        {
            food: {
                id_food: mongoose.Schema.Types.ObjectId,
                // ref: 'food'
            },

            watchedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('history', History)
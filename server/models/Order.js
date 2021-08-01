const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    foods: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Food'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

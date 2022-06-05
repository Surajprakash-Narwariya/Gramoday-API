const mongoose = require('mongoose');

//---------------------- SCHEMA FOR REPORT --------------------
const report = new mongoose.Schema(
    {
        commodityName: String,
        commodityId: String,
        marketId: String,
        marketName: String,
        users: [String],
        priceUnit: String,
        price: Number,
    },
    { timestamps: true }
);

mongoose.model('Report', report);
module.exports = report;

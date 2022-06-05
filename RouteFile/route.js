const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { rawListeners } = require('../Database/Schema');

// POST method to put data into Database
router.post('/reports', (req, res) => {
    // Getting refrence of the Report schema
    const report = mongoose.model('Report');

    const marketId = req.body.marketId;
    const commodityId = req.body.commodityId;

    // Checking if marketID-commodity already exists
    report.findOne(
        { marketId: marketId, commodityId: commodityId },
        (err, docs) => {
            if (!docs || docs.length === 0) {
                // No data for given market & commodity
                const newReport = new report({
                    commodityName: req.body.commodityName,
                    commodityId: req.body.commodityId,
                    marketId: req.body.marketId,
                    marketName: req.body.marketName,
                    users: [req.body.userId],
                    priceUnit: 'Kg',
                    price: req.body.price / req.body.conversionFactor,
                });

                newReport.save((err, docs) => {
                    if (err) res.send(err);
                    const obj = {
                        status: 'success',
                        reportId: docs._id,
                    };
                    res.send(obj);
                    res.status(200);
                });
            } else {
                // Data already exists for given market and commodity
                const id = docs._id;

                // Things to update -  (i) Price, (ii) Users Array
                const newPrice = req.body.price / req.body.conversionFactor;
                const currentPrice = docs.price;
                const totalUsers = docs.users.length;

                // Apply formula of average of two different averages.
                const mean =
                    (currentPrice * totalUsers + newPrice) / (totalUsers + 1);

                report.findOneAndUpdate(
                    { _id: id },
                    {
                        price: mean,
                        $push: { users: req.body.userId },
                    },
                    (err) => console.log(err)
                );
                res.send({
                    status: 'success',
                    reportId: id,
                });
                res.status(200);
            }
        }
    );

    // res.send('saved into database');
});

// GET Method to take the data from the Database
router.get('/reports/:id', (req, res) => {
    const report = mongoose.model('Report');
    report.findOne({ _id: req.params.id }, (err, docs) => {
        if (err) res.send(err);
        res.send(docs);
        res.status(200);
    });
});
module.exports = router;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routerFiles = require('./RouteFile/route');
const report = require('./Database/Schema');
require('dotenv').config();
const port = 3000;

//==================== MIDDLEWARES =======================================
const password = process.env.PASSWORD;
const db = process.env.DB;

app.use(express.json()); // parsing req in json
app.use('', routerFiles); // using routes

//==================== Connection with MongoDB ============================

mongoose.connect(
    `mongodb+srv://suraj:${password}@${db}.r3mld.mongodb.net/Gramoday?retryWrites=true&w=majority`
);

//=========================================================================

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;

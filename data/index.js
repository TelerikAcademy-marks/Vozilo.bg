/* globals module require global __dirname process */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function({ config, validator }) {
    mongoose.Promise = global.Promise;

    mongoose.connect(config.MONGOLAB_URI);

    // let models = require('./../models'); // not working
    let User = require('../models/user-model');
    let Car = require('../models/car-model');
    let CarBrandDetail = require('../models/car-brand-model');
    let Correspondention = require('../models/correspondence-model');
    let models = {
        User,
        Car,
        CarBrandDetail,
        Correspondention
    };

    let data = {};
    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            let dataModule =
                require(path.join(__dirname, file))({ models, validator });

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};
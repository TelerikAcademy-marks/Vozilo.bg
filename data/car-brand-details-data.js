/* globals module */
'use strict';

module.exports = function ({ models, validator }) {
    let {
        CarBrandDetail
    } = models;

    return {
        getAllBrands() {
            return new Promise((resolve, reject) => {
                CarBrandDetail.find()
                    .select('brand')
                    .exec((err, res) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(res);
                    });
            });
        },
        getModels(brand) {
            return new Promise((resolve, reject) => {
                CarBrandDetail.find({
                    brand
                })
                    .select('models.model')
                    .exec((err, res) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(res);
                    });
            });
        }
    };
};
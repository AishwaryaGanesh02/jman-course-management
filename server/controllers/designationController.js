const DesignationModel = require('../models/designationModel');

const getDesignations = async (req, res, next) => {
    try {
        const designations = await DesignationModel.getAll();
        res.json(designations);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDesignations,
};

const Joi = require('joi');
const createEstateValidation = require('./estate.validation.js');
const { createEstateService, findOneEsateService } = require('./estate.service.js');
const Estate = require('../estate/estate.schema.js');

// get all addedd estate properties
exports.getAddEstate = async (req, res) => {
    const estate = await Estate.find().sort('name');
    res.send(estate);
}

// create a new estate
exports.postAddEstate = async (req, res) => {
    try {
        const { error } = createEstateValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Check if estate with the same title already exists
        const existEstate = await findOneEsateService({ title: req.body.title });

        if (existEstate) {
            return res.status(400).send('Estate already exists');
        }

        const estate = await createEstateService(req.body);
        res.status(201).json({ message: 'Estate added successfully', data: estate });
    } catch (error) {
        console.error('Error adding Estate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

// edit create estate
exports.putEditEstate = async (req, res) => {
    const estate = await Estate.findByIdAndUpdate(req.params.id,
        {
            ...req.body
        }, { new: true });

    if (!estate) return res.status(404).send('The estate with the Id not found');
    return res.json({ message: "successfully updated" });

};


// get edited estate by ID
exports.getEditEstateById = async (req, res) => {
    const estateId = req.params.estateId; // Extract the estateId from route parameters

    try {
        // Find the estate by its ID
        const estate = await findOneEsateService({ _id: estateId });
        
        // If no estate is found, return a 404 error
        if (!estate) {
            return res.status(404).send({ message: "Estate not found!" });
        }
        // Send a response with the estate details and request body
        res.send({
            message: "Estate found",
            estate: {
                id: estate.id,
                title: estate.title,
            }
        });
    } catch (error) {
        console.error("Error fetching estate:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

// delete an estate
exports.deleteEstate = async (req, res) => {
    const existingEstate = await Estate.findByIdAndDelete(req.params.id);
    if (!existingEstate) {
        return res.status(404).send({ message: "Estate deleted!!!" });
    };
}
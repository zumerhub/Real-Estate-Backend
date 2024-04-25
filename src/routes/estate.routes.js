const express = require('express');
const estateController = require('../apps/estate/estate.controller.js');

const router = express.Router();

// admin/add-estates
router.get('/estates', estateController.getAddEstate );
router.get('/add-estates', estateController.getAddEstate );

router.post('/add-estate', estateController.postAddEstate );

// create edit-estates by ID
router.put('/edit-estate/:estateId', estateController.putEditEstate);
// get edit-estates by ID
router.get('/edit-estate/:estateId', estateController.getEditEstateById);
// delete estate by ID
router.delete('/edit-estate/:estateId', estateController.deleteEstate);


// router.get('/Estate', async (req, res) => {
//     const getAllEstate = Estate.findOne().sort('name');
//     res.render(getAllEstate);
// })



module.exports = router;
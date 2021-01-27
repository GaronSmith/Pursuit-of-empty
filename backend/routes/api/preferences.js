const express = require('express');
const asyncHandler = require('express-async-handler');

const {Preference } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req,res) => {
    const preferences = await Preference.findAll({
        where:{
            userId: req.params.id
        }
    })
    return res.json({preferences})
}));

module.exports = router;
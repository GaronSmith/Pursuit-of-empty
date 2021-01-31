const express = require('express');
const asyncHandler = require('express-async-handler');

const {Preference , WorkFlowStatus} = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req,res) => {
    const preferences = await Preference.findAll({
        include: WorkFlowStatus,
        where:{
            userId: req.params.id
        },
        order:[['orderIdx', 'DESC']]
    })
    return res.json({preferences})
}));

router.post('/', asyncHandler(async (req,res) =>{
    await Preference.create(req.body)

    return res.json('created')
}))

module.exports = router;
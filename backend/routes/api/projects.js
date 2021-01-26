const express = require('express');
const asyncHandler = require('express-async-handler');
const { Check, check } = require('express-validator');

const {Project} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateProject = [
    check('name')
        .exists({checkFalsy:true})
        .withMessage('Please enter a name'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({max: 500})
        .withMessage('Please enter a description no more than 500 characters'),
    handleValidationErrors,
];

router.post('/', validateProject, asyncHandler(async (req,res) => {
    const {ownerId, name, description, startDate, endDate, active} = req.body;
    const project = await Project.create({ ownerId, name, description, startDate, endDate, active});

    return res.json({
        project,
    });
}))


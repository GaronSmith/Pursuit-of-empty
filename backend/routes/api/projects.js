const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize')

const {Project, TeamMember, Story} = require('../../db/models');
const story = require('../../db/models/story');
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

router.get('/:id', asyncHandler(async(req,res) =>{
    const projects = await Project.findAll({
        where:{
            ownerId: req.params.id
        }
    })
    return res.json({projects})
}))

router.get('/:id/assigned', asyncHandler(async (req, res) => {
    const projects = await TeamMember.findAll({
        include:Project,
        where: {
            userId: req.params.id
        }
    })
    return res.json({ projects })
}))

router.get('/stories/:id', asyncHandler(async (req,res) => {
    const stories = await Story.findAll({
        include:Project,
        where: {
            projectId: req.params.id
        }
    }) 
    return res.json({ stories })
}))

router.put('/stories', asyncHandler(async (req,res) => {
    const {id, priority, workflowStatusId, minusOne, pluseOne} = req.body;
    const story = await Story.findByPk(id)

    if(story){
        await story.update({priority, workflowStatusId})
        res.json({story})
    }
}))

router.get('/test', asyncHandler( async (req,res) => {
    const ids = [1, 2, 3, 4]
    const projects = await Project.findAll({
        where: {
            id: {
                [Op.in]: [1, 2, 3, 4]
            }
        }
    });
    res.json({projects})
}))

module.exports = router;
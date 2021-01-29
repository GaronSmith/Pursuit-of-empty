const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const Sequelize = require('sequelize')

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
    const {id, priority, workflowStatusId, minusOne, plusOne} = req.body;
    const story = await Story.findByPk(id)
    let minuses = []
    let pluses =[]
    let obj
    if (story) {
        await story.update({ priority, workflowStatusId: parseInt(workflowStatusId) })
    }
    if(minusOne.length){
        await Story.update(
            { priority: Sequelize.literal('priority - 1') },
            {
                where: {
                    id: {
                        [Sequelize.Op.in]: minusOne
                    }
                }
            });
        minuses = await Story.findAll({
            where:{
                id: {
                    [Sequelize.Op.in]: minusOne
                }
            }
        })
    }

    if(plusOne.length){
        await Story.update(
            { priority: Sequelize.literal('priority + 1') },
            {
                where: {
                    id: {
                        [Sequelize.Op.in]: plusOne
                    }
                }
            });
        pluses = await Story.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: plusOne
                }
            }
        })
    }
    const arrObj = [...pluses, ...minuses, story]
   
    obj= Object.assign({}, arrObj)
    res.json({obj})
}))

router.get('/test/1', asyncHandler( async (req,res) => {
    const ids = [1, 2, 3, 4]
    const projects = await Story.update(
        {priority: Sequelize.literal('priority - 1')},
        {where: { 
            id: {
                [Sequelize.Op.in]: [1, 2, 3]
            }
        }
    });
    res.json({projects})
}))

module.exports = router;
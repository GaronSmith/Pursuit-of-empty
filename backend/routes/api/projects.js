const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const Sequelize = require('sequelize');

const {Project, TeamMember, Story, Task} = require('../../db/models');
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

router.put('/stories/:id', asyncHandler( async (req,res) => {
    const story = await Story.findByPk(req.body.id)
    if(story){
        await story.update(req.body)
        return res.json({story})
    }

}))

router.post('/stories', asyncHandler( async (req,res) => {
    const body = req.body 
    const story = await Story.create(body)
    if (story){
        res.json({story})
    }
}))

router.delete('/stories/:id', asyncHandler( async (req,res) => {
    const story = await Story.destroy({
        where:{
            id:req.params.id
        }
    })
    res.json('deleted')
}))

router.get('/tasks/:id', asyncHandler (async (req, res) => {
    const tasks = await Task.findAll({
        where: {
            storyId: req.params.id
        }
    })
    if(tasks){
        res.json({tasks})
    }
}))

router.post('/tasks', asyncHandler( async (req,res) => {
    const{completed, name, storyId} = req.body
    const task = await Task.create({ completed, name, storyId})
    res.json({task})
}))

router.delete('/tasks/:id', asyncHandler(async (req,res) => {
    const task = await Task.destroy({
        where:{
            id:req.params.id
        }
    })
    res.json('deleted')
}))

router.put('/tasks/:id', asyncHandler( async (req, res) => {
    const {completed} = req.body
    const task = await Task.findByPk(req.params.id)

    await task.update({completed})

    res.json(task)
}))

module.exports = router;
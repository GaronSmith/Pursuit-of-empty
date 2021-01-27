const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const projectsRouter = require('./projects');
const preferencesRouter = require('./preferences')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/projects', projectsRouter)

router.use('/preferences', preferencesRouter)

module.exports = router;
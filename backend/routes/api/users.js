const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const  { Op }  = require('sequelize');

const router = express.Router()

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

router.post(
    '/', validateSignup,
    asyncHandler(async (req, res) => {
        const { email, firstName, lastName, password, username } = req.body;
        const user = await User.signup({ email, firstName, lastName, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.post('/search', asyncHandler(async (req,res) => {
    const search = req.body

    const searchResults = await User.findAll({
        where:{
            username:{
                [Op.iLike]: `%${search.value}%`
            }
        },
        limit:10,
    })
    res.json({searchResults})
}))

module.exports = router;
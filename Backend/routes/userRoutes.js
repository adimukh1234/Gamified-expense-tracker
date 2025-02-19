const express = require('express');
const {signup, login} = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();

router.post('/signup', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], signup);



router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], login);


module.exports = router;
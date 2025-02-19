const router = require('express').Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('set', authMiddleware, budgetController.setBudget);
router.get('get', authMiddleware, budgetController.getBudget);
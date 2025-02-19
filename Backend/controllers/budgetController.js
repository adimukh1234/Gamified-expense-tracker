const user = require('../models/User');

exports.setBudget= async (req, res) => {
    const userId = req.user.id;
    const { budget } = req.body;

    try {
        if (!budget || budget < 0) {
            return res.status(400).json({ success: false, message: 'Valid budget amount required' });

        }
        const updatedUser = await user.findById(userId);
        updatedUser.budget = budget;
        user.currentBalance = budget;
        await updatedUser.save();

        res.status(200).json({ success: true, message: 'Budget updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBudget = async (req, res) => {
    const userId = req.user.id;

    try {
        const currentUser = await user.findById(userId);
        res.status(200).json({ success: true, budget: currentUser.budget });
        return currentUser.budget;
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

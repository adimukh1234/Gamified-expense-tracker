const Expense = require('../models/Expense');
const User = require('../models/User');

exports.addExpense= async (req, res) => {
    const { amount, description, category, date } = req.body;
    const userId= req.user.id;

    try {
        const user= await User.findById(userId);
        // if(user.currentBalance < amount){
        //     return res.status(400).json({ message: 'Insufficient balance' });
        // }

        const newExpense= new Expense({
            amount,
            description,
            category,
            date: date || Date.now(),
            user: userId
        });
        // user.currentBalance -= amount;
        await user.save();
        await newExpense.save();

        res.status(201).json({
            success: true,
            data: {
                expense: newExpense,
                currentBalance: user.currentBalance
            }});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getExpenses= async (req, res) => {
    const userId= req.user.id;

    try {
        const expenses= await Expense.find({ user: userId });
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExpense= async (req, res) => {
    const userId= req.user.id;
    const expenseId= req.params.id;

    try {
        const expense= await Expense.findOne({ user: userId, _id: expenseId });
        if (!expense) {
            return res.status(404).json({success: false, message: 'Expense not found' });
        }
        const user= await User.findById(userId);
        user.currentBalance += expense.amount;
        await user.save();
        await expense.remove();

        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


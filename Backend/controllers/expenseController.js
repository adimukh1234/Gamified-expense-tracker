const Expense = require('../models/Expense');

exports.addExpense= async (req, res) => {
    const { amount, description, category, date } = req.body;
    const userId= req.user.id;

    try {
        const newExpense= new Expense({ user: userId, amount, category, description, date });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully' });
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
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.remove();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


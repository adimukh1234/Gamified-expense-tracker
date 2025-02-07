const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const User= require('../models/User');

exports.signup= async (req, res) => {
    const { name, email, password, monthlyIncome, currency }= req.body;

    try {
        const existingUser= await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword= await bcrypt.hash(password, 12);
        const newUser= new User({ name, email, password: hashedPassword, monthlyIncome, currency });
        await newUser.save();

        const token= jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ token, user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    icon: {
        type: String,
        default: 'default-icon'
    },
    color: {
        type: String,
        default: '#000000'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
});


categorySchema.statics.getDefaultCategories = function() {
    return [
        { name: 'Food', description: 'Food and drinks expenses', icon: '🍔', color: '#FF5733' },
        { name: 'Transport', description: 'Transportation costs', icon: '🚗', color: '#33FF57' },
        { name: 'Shopping', description: 'Shopping expenses', icon: '🛍️', color: '#3357FF' },
        { name: 'Bills', description: 'Regular bills and payments', icon: '📄', color: '#FF33F6' },
        { name: 'Entertainment', description: 'Entertainment costs', icon: '🎮', color: '#33FFF6' }
    ];
};

module.exports = mongoose.model('Category', categorySchema);

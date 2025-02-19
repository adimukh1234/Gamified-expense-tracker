const jwt= require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user= { id: decoded.id };
        next();
      

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = authMiddleware;
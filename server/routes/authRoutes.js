const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, (req, res) => {
    console.log("ppppppppp")
    res.json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router;

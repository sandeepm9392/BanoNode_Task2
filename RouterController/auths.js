const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.js");

const router = express.Router();
//Register user

router.post('/register', async (req, res) => {
    try {
        const {  username,email, password } = req.body;        
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({ username,email, password: hashedPassword });
        await user.save();

        res.status(200).json({ message: 'User has been registered successfully', user_id: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Password incorrect please check' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT);
        res.status(200).json({ 
            message: `Login successful welcome  ${username}!`, 
            user_id: user._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//forgot password
router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({error:"Email not registered"})
        }
        res.status(200).json({ message: `Password reset link is sent to Registered email :${email}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
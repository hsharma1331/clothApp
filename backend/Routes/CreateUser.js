const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "yahanKuchBhiLikhSakteHainUsuallyBattishBitKa"

router.post('/createuser',
    body('name'),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // creating hash password for more secure
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                // password: req.body.password,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post('/loginuser', async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "User not registered" });
        }
        const passCompare = await bcrypt.compare(req.body.password, userData.password)
        // if (req.body.password !== userData.password) {
        if (!passCompare) {
            return res.status(400).json({ errors: "Wrong Password" });
        }
        data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)

        return res.json({ success: true , authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})


module.exports = router;
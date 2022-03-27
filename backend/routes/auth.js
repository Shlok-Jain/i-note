const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')

// json web token
const JWT_SECRET = "shloksecretverysecretjwtjwt"

// ROUTE1:  POST: /api/auth/createuser * for new user

router.post('/createuser',[

    //validations by express validator

    body('email','Enter valid email').isEmail(),
    body('name','Enter valid name (min:3,max:100)').isLength({min:3,max:100}),
    body('password','Password must be atlesat 5 chars').isLength({min:5,max:100})
],async (req,res)=>{

    //If there are errors in values

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    
    try{

    //if email already exists

    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success:false,error:"This email already exists"})
    }

    //hashing and salting passowrd
    const salt = await bcrypt.genSalt(10)
    const sec_pass = await bcrypt.hash(req.body.password,salt)

    //Creating user 
    
    user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password: sec_pass,
      })
      const data = {
          user:{
              id: user.id
          }
      }

      const authtoken = jwt.sign(data,JWT_SECRET)
      res.json({success:true,authtoken:authtoken})
    }

    // cathing errors if any
    catch(error){
        console.error(error.message)
        res.status(500).json({success:false,error:"Some error occured"})
    }
})

// ROUTE2:  POST: /api/auth/login * for login

router.post('/login',[
    //validations by express validator

    body('email','Enter valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email:email})

        //Error if user doesnot exist 
        if(!user){
            return res.status(400).json({success:false,error:"Invalid creditionals"})
        }

        //comparing hashed password
        const compare_pass = await bcrypt.compare(password,user.password)
        if(!compare_pass){
            return res.status(400).json({success:false,error:"Invalid creditionals"})
        }
        //sending jwt data
        const data = {
            user:{id: user.id}
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({success:true,authtoken:authtoken})

    }
    catch(error){
        console.error(error.message)
        res.status(500).json({success:false,error:"Some error occured"})
    }
})

// ROUTE3:  POST: /api/auth/getdetails * for getting user details
router.post('/getdetails',fetchuser,async (req,res)=>{
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({error:"Some error occured"})
    }
})
module.exports = router
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const validator = require('validator');
require('dotenv').config();

exports.signup=async(req,res)=>{
    try {
        const {
            accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword, 
            
        } = req.body;
        console.log("signup data",req.body)
        console.log("before all filed required")

             //validata data
             if(
                !firstName ||
                !lastName ||
                !email || 
                !password ||
                !confirmPassword ||
                !accountType
                 
            ) {
                return res.status(403).json({
                    success: false,
                    message: 'All Fields are required',
                });
            }
            console.log("after all filed required")
            

            if(password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Password and Confirm Password do not match. Please try again',
                });
            }
             

             //check if user already exist or not 
                const existingUser = await User.findOne({ email });
                if(existingUser) {
                    return res.status(400).json({
                        success: false,
                        message : 'User already exists. Please Sign in to continue.',
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    // // contactNumber,
                    password: hashedPassword,
                    accountType: accountType,
                    
                });
        
                //return response
                return res.status(200).json({
                    success: true,
                    user,
                    message: 'User Registered Successfully',
                })
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Cannot be Registered, Please Try Again.'
        })
        
    }
}

exports.login = async (req, res) => {
    try {
         //get data from req body
         const {email, password} = req.body;
         console.log("login data",req.body)
         //validation of data
         if(!email || !password) {
             //Return 400 Bad Request status code with error message
             return res.status(400).json({
                 success: false,
                 message: `Please Fill up All the Required Fields`,
             });
         }
         //check user exists or not
         const user = await User.findOne({email}) 
         
         if(!user) {
             return res.status(401).json({
                 //Return 401 unauthorized status code with error message
                 success: false,
                 message: `User is not registered with Us, Please signup to Continue`,
             });
         }

        //Generate JWT, after password match
        if(await bcrypt.compare(password, user.password)) {
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });

            //save token to user document in database
            user.token = token;
            user.password = undefined;
        
            //create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
            
        } else {
            return res.status(401).json({
                success: false,
                message: `Password Is Incorrect`,
            });
        }

         


    } catch (error) {
        console.log(error);
        //Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}
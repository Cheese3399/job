import { compare } from "bcryptjs";
import userModel from "../models/userModel.js";

export const registerController = async (req,res,next) => {
    try {
        const { name,email,password } = req.body
        // validation
        if(!name){
            next("name is required")
        }
        if(!email){
            next("email is required")
        }
        if(!password){
            next("password is required and greater than 6 character");
        }
        // chesk user
       const exisitingUser = await userModel.findOne({email});
       if(exisitingUser){
            next('Email Already Register PLease Login')
       }    
       const user = await userModel.create({name,email,password})
    //    token
    const token = user.createJWT()
       res.status(201).send({
        success:true,
        message:'User Created Successfully',
        user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location
        },
        token
       });

    } catch (error) {
        next(error);
    }
};

export const loginController = async (req,res,next) => {
    const {email,password} = req.body
    // validation
    if(!email || !password){
        next('Please Provide All Fields')
    }
    // find user by email.
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next('Invalid Username or password')
    }
    // compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next('Invalid Username or password')
    }
    user.password =undefined;
    const token =user.createJWT();
    res.status(200).json({
        success:true,
        message: 'Login Successfully',
        user,
        token,  
})
};
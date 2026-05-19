import exp from "express"
import {register,authenticateUser} from '../Services/authService.js'
import UserTypeModel from '../Models/UserModel.js'
import { verifyToken } from "../Middlewares/verifyToken.js"
import bcrypt from 'bcrypt'
 const commonRouter = exp.Router()

//login
commonRouter.post('/login',async(req,res)=>{
    try {
        //get user credentials from request body
        const userObj=req.body
        // use the role from the request body (sent by frontend), uppercased for consistency
        const role = userObj.role?.toUpperCase() || 'USER'
        //authenticate user
        const {user,token}=await authenticateUser({...userObj,role})
        //save token in cookie
        res.cookie('token',token,{httpOnly:true,sameSite:'lax',secure:false})
        //send response
        res.status(200).json({message:"User authenticated",payload:user})
    } catch(err) {
        res.status(err.status||500).json({message:err.message||"Login failed"})
    }
})
//logout
commonRouter.get('/logout',(req,res)=>{
    //clear the cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true,//must match original set settings
        sameSite:'lax',//must match original set settings
        secure:false//must match original set settings
    })
    res.json({message:"Logged out successfully"})
})
//change password(protected route)
commonRouter.put('/change-password', verifyToken('USER', 'AUTHOR', 'ADMIN'), async (req, res) => {
   //get current password and new password
   const {email,currentPassword,newPassword}=req.body
   //check the current password is correct or not
   const user=await UserTypeModel.findOne({email})
   if(!user)
   {
    return res.status(200).json({message:"user not exists"});
   }
   const isMatch=await bcrypt.compare(currentPassword,user.password)
   if(!isMatch)
   {
    return res.status(200).json({message:"password not match"});
   }
   if(currentPassword===newPassword)
   {
    return res.status(200).json({message:"new password should be different from current password"});
   }
   //replace current password with new password
   user.password=await bcrypt.hash(newPassword,10)
   //save the new password 
   await user.save()
   //send response
   res.status(200).json({message:"password changed successfully",user});
})

//get user by token
commonRouter.get('/user', verifyToken('USER', 'AUTHOR', 'ADMIN'), (req, res) => {
    res.status(200).json({ message: "User session found", payload: req.user })
})

export default commonRouter
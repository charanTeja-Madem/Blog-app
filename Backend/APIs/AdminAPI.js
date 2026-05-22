import ex from 'express'
import Articles from '../Models/ArticleModel.js'
import UserTypeModel from '../Models/UserModel.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
const AdminRouter=ex.Router()
//authenticate admin
//read all articles(optional)
// AdminRouter.get('/articles',async(req,res)=>{
//     let articles=await Articles.find();
//     if(!articles)
//     {
//         return res.status(200).json({message:"articles not exists"});
//     }
//     res.status(200).json({message:"articles are",payload:articles});
// })
//block users
AdminRouter.put('/block/:id', verifyToken('ADMIN'), async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(404).json({message:"user not found"});
    }
    user.isActive=false
    await user.save()
    res.status(200).json({message:"user blocked",user});
})
//unblock users
AdminRouter.put('/unblock/:id', verifyToken('ADMIN'), async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(404).json({message:"user not found"});
    }
    user.isActive=true
    await user.save()
    res.status(200).json({message:"user unblocked",user});
})
export default AdminRouter

import ex from 'express'
import Articles from '../Models/ArticleModel.js'
import UserTypeModel from '../Models/UserModel.js'
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
AdminRouter.put('/block/:id',async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(200).json({message:"user not exists"});
    }
    user.isActive=false
    await user.save()
    res.status(200).json({message:"user blocked",user});
})
//unblock users
AdminRouter.put('/unblock/:id',async(req,res)=>{
    let id=req.params.id
    let user=await UserTypeModel.findById(id)
    if(!user)
    {
        return res.status(200).json({message:"user not exists"});
    }
    user.isActive=true
    await user.save()
    res.status(200).json({message:"user unblocked",user});
})
export default AdminRouter

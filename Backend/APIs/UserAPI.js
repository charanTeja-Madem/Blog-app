import ex from 'express'
import ArticleTypeModel from '../Models/ArticleModel.js'
import UserTypeModel from '../Models/UserModel.js'
import {register,authenticateUser} from '../Services/authService.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
const UserRouter=ex.Router()
//Register user
UserRouter.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
//Autheticate user

//read all articles (public route - no auth required)
UserRouter.get('/articles', async(req,res)=>{
    try {
        let articles = await ArticleTypeModel.find({isArticleActive: true}).populate("author","firstName lastName")
        res.status(200).json({message:"Articles",articles})
    } catch(err) {
        res.status(500).json({message:"Error fetching articles"})
    }
})
//Add comment to an article(protected route)
UserRouter.put('/article/:id/comment', verifyToken('USER'), async(req,res)=>{
    const {comment} = req.body
    const {id} = req.params
    const userId = req.user.userId || req.user._id
    
    try {
        //find article by id and update
        let articleWithComment = await ArticleTypeModel.findOneAndUpdate(
            {
                _id: id,
                isArticleActive: true
            },
            {$push: {comments: {user: userId, comment}}},
            {new: true, runValidators: true}
        ).populate("comments.user", "firstName lastName")
        
        if(!articleWithComment){
            return res.status(404).json({message:"Article not found"})
        }
        
        res.status(201).json({message:"Comment added", payload: articleWithComment})
    } catch(err) {
        res.status(400).json({message: err.message || "Error adding comment"})
    }
})
//read single article by id (public route - no auth required)
UserRouter.get('/article/:id', async(req,res)=>{
    const {id} = req.params
    try {
        let article = await ArticleTypeModel.findById(id)
            .populate("author","firstName lastName")
            .populate("comments.user", "firstName lastName")
        if(!article){
            return res.status(404).json({message:"Article not found"})
        }
        res.status(200).json({message:"Article", payload: article})
    } catch(err) {
        res.status(500).json({message: "Error fetching article"})
    }
})

export default UserRouter
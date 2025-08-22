const { createPostSchema } = require('../middleware/validator');
const Post = require('../models/posts')

const getPosts = async(req, res) => {

    const {page} = req.query;
    const pageNumber = parseInt(page) || 1;
    const postsPerPage = 10;

    try {

        let pageNum;
        if(pageNumber <= 1) {
            pageNum = 0;
        } else {
            pageNum = pageNumber - 1;
        }

        const Posts = await Post.find().sort({createdAt: -1})
        .skip(pageNum * postsPerPage)
        .limit(postsPerPage)
        .populate({
            path : 'author',
            select : 'email, name'
        });

        res.status(200).json({
            success : true,
            Posts,
            nbHits : Posts.length
        })
        
    } catch (error) {
        console.log(error)

        return res.status(404).json({
            success : false,
            msg : 'Failed to get Posts'
        })
    }
}

const createPost = async (req, res) => {
    const {title, description} = req.body;
    const {userId} = req.user;

    try {
        const {error, value} = createPostSchema.validate({title, description, userId})

        if(error) {
            
            return res.status(404).json({success : false, msg : error.details[0].message});
        
        }

        const result = await Post.create({
            title, description, userId
        })

        res.status(200).json({
            success : true,
            data : 'Post created successfully'
        })

    } catch (error) {
        console.log(error)
    }
}

const singlePost = async (req, res) => {
    const {_id} = req.query;

   try {
        const result = await Post.findOne({_id}).populate({
            path : 'author',
            select : 'email'
        })

        if(!result) {
            res.status(200).json({
                success : false,
                msg : 'post does not exist'
            })
        }

        res.status(200).json({
            success : true,
            msg : 'single post',
            result
        })
   } catch (error) {
        console.log(error)

        res.status(404).json({
            success : false,
            msg : 'error fetching data'
        })
   }

}

const updatePost = async (req, res) => {
    const {_id} = req.query;
    const {title, description} = req.body;
    const {userId} = req.user;

    try {
        const {error, value} = createPostSchema.validate({title, description, userId})

        if(error) {
            
            return res.status(404).json({success : false, msg : error.details[0].message});
        
        }

        const existingPost = await Post.findOne({_id});

        if(!existingPost) {
            return res.status(400).json({
                success : false,
                msg : 'post does not exist'
            })
        }

        if(existingPost.userId.toString() !== userId) {
            return res.status(400).json({
                success : false,
                msg : 'unauthorized'
            })
        }

        existingPost.title = title;
        existingPost.description = description;

        const result = await existingPost.save();
        
        // const newPost = {
        //     title, description, userId
        // }

        // await newPost.save()

        res.status(200).json({
            success : true,
            data : 'Post updated successfully',
            result
        })

    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    const {_id} = req.query;

    const {userId} = req.user;

    try {

        const existingPost = await Post.findOne({_id});

        if(!existingPost) {
            return res.status(400).json({
                success : false,
                msg : 'post does not exist'
            })
        }

        if(existingPost.userId.toString() !== userId) {
            return res.status(400).json({
                success : false,
                msg : 'unauthorized'
            })
        }

        await Post.deleteOne({_id})
       
        res.status(200).json({
            success : true,
            data : 'Post deleted successfully',
            result
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = { getPosts, createPost, singlePost, updatePost }
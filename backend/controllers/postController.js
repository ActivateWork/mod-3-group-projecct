const Posts = require('../models/postModel')

// Seed function export to initialize data
module.exports.seed = async (req,res) => {
    try{
        await Posts.deleteMany({})
        res.json({message: 'Database seeded'})
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}
// Index function export to fetch data from database
module.exports.index = async (req,res) => {
    try{
        //Find the post and sorts it.
        const posts = await Posts.find().sort({createdAt: 1})
        res.json(posts)
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}
// Delete function export to delete post 
module.exports.delete = async (req, res) => {
    try{
        //Finds data by ID and delete the query posts
        const posts = await Posts.findByIdAndDelete(req.params.id)
        res.json({message: 'Sucessfully Deleted'})
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}
// Update function export to update current post
module.exports.update = async (req,res) => {
    try{
        //Finds the post by ID and updates the data
        const updatePost = await Posts.findByIdAndUpdate(req.params.id)
        res.json(updatePost)
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}
// Create function export to create a new post
module.exports.create = async (req,res) => {
    try{
        // Generate a new posts from the database
        const posts = await Posts.create(req.body)
        res.json(posts)
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}
// Show function export to display post
module.exports.show = async (req, res) => {
    try{
        // This will get the data from the database by search for the ID
        const posts = await Posts.findById(req.params.id)
        res.status(200).json(posts)
    }catch(error){
        console.log(error.message)
        res.status(404).json({error: error.message})
    }
}
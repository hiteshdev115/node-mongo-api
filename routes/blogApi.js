//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var blogModel = require('../models/blog');
var userModel = require('../models/user');


exports.getallblog = async function(req, res)
{
    console.log('all blog action');
    try {
        var result = await blogModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertblog = async function(req, res)
{
    const userId  = req.params.id;
    req.body.author = userId;
    //console.log(userId);
    //console.log(req.file.filename);
    req.body.blogimage = '';
    if(req.file.filename){
        req.body.blogimage = req.file.filename;
    }
    try {
        //console.log(user);
        if(userId)
        {
            var user = await userModel.findById(userId);
            var blog = new blogModel(req.body);
            var result = await blog.save();

            //Assign cms page to author's
            user.blog.push(blog);
            await user.save();

            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateblog = async function(req, res)
{
    console.log("update page action....");
    
    try {
        //console.log("update user Id ==>"+req.params.id);
        const userId  = req.params.id;
        req.body.author = userId;
                
        const blogId  = req.params.blogid;
        //console.log(blogId);
        var blog = await blogModel.findById(blogId).exec();
        
        blog.set(req.body);
        
        var result = await blog.save();
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteblog = async function(req, res)
{
    try {
        var blog = await blogModel.findById(req.params.id).exec();
        //console.log(blog);
        if(blog.blogimage){
            fs.unlinkSync(appRoot.path + "/images/"+blog.blogimage);
        }

        var result = await blogModel.deleteOne({ _id: req.params.id }).exec();
        userModel.findByIdAndUpdate(req.params.userId,
            {$pull: {blog: req.params.id}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    res.status(500).send(error);
                }else{
                    //do stuff
                }
            }
        );
        
        res.status(200).send({ message: 'You are deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};

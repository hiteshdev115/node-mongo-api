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

exports.getSingleblog = async function(req, res)
{
    console.log('all blog action');
    try {
        var blog = await blogModel.findById(req.params.id).exec();
        res.send(blog);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getLastThreeBlog = async function(req, res)
{
    console.log('Latest blog action');
    try {
        var mysort = { created_at: -1 };
        var blog = await blogModel.find().populate('author').limit(3).sort(mysort).exec();
        res.send(blog);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.getSingleblogByName = async function(req, res)
{
    console.log('all blog action');
    try {
        var blog = await blogModel.findOne({blogname: req.params.blogname}).populate('author').exec();
        if(blog){
            res.status(200).send(blog);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getRandomblog = async function(req, res)
{
    var count = 4;
    try {
        var mysort = { created_at: -1 };
        var blog = await blogModel.find({blogname : {$ne :req.params.blogname}}).limit(4).sort(mysort).exec();
        if(blog){
            res.status(200).send(blog);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.removeThumb = async function(req, res)
{
    console.log('remove thumb');
    var id = req.body.id;
    //console.log(id);
    try {
        var blogData = await blogModel.findById(id).exec();
        if(blogData.blogimage){
            var ImgParts = blogData.blogimage.split('.');
            //console.log(ImgParts);
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.png';
                var resized_small = ImgParts[0]+'_resized-small.png';
                var thumbnail = ImgParts[0]+'_thumbnail.png';

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+blogData.blogimage);
        }

        var blog = await blogModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { blogimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(blog);
        res.send(blog);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertblog = async function(req, res)
{
    console.log(req);
    const userId  = req.params.id;
    req.body.author = userId;
    //console.log(userId);
    
    //console.log(req.body);
    if(req.body.blogimage !== '')
    {
        req.body.blogimage = req.file.filename;
    }
    
    try {
        
        if(userId)
        { 
            var user = await userModel.findById(userId);
            var blog = new blogModel(req.body);
            //console.log(blog);
            var result = await blog.save();
            
            //Assign blog to author's
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
    //console.log(req.body);
    console.log(req.file);
    //console.log(req);
    try {
        //console.log("update user Id ==>"+req.params.id);
        
        if(req.file !== undefined){
            req.body.blogimage = '';
            console.log("update user Id ==>"+req.body.blogimage);
            req.body.blogimage = req.file.filename;
        }
        const userId  = req.params.id;
        req.body.author = userId;
                
        const blogId  = req.params.blogid;
        
        var blog = await blogModel.findById(blogId).exec();
        
        blog.set(req.body);
        
        var result = await blog.save();
        
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteblog = async function(req, res)
{
    console.log('Delete Blog Action');
    try {
        var blog = await blogModel.findById(req.params.id).exec();
        //console.log(blog);
        if(blog.blogimage){
            var ImgParts = blog.blogimage.split('.');
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.'+ImgParts[1];
                var resized_small = ImgParts[0]+'_resized-small.'+ImgParts[1];
                var thumbnail = ImgParts[0]+'_thumbnail.'+ImgParts[1];

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+blog.blogimage);
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
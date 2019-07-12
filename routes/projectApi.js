//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var projectModel = require('../models/project');
var userModel = require('../models/user');



exports.getallproject = async function(req, res)
{
    console.log('all seo action');
    try {
        var sortDesc = { created_at: -1 };
        var result = await projectModel.find().sort(sortDesc).exec();
        //console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleproject = async function(req, res)
{
    console.log('all project action');
    try {
        var project = await projectModel.findById(req.params.id).exec();
        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getLastSixProject = async function(req, res)
{
    console.log('Latest project action');
    try {
        var mysort = { created_at: -1 };
        var project = await projectModel.find().limit(6).sort(mysort).exec();
        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.getSingleprojectByName = async function(req, res)
{
    console.log('single project by name action');
    try {
        var project = await projectModel.findOne({slug: req.params.slug}).exec();
        if(project){
            res.status(200).send(project);
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
        var projectData = await projectModel.findById(id).exec();
        if(projectData.blogimage){
            var ImgParts = projectData.blogimage.split('.');
            //console.log(ImgParts);
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.png';
                var resized_small = ImgParts[0]+'_resized-small.png';
                var thumbnail = ImgParts[0]+'_thumbnail.png';

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+projectData.blogimage);
        }

        var project = await projectModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { projectimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(blog);
        res.send(project);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertproject = async function(req, res)
{
    const userId  = req.params.id;
    console.log(req.body);
    if(req.body.projectimage !== '')
    {
        req.body.projectimage = req.file.filename;
    }
    
    try {
        
        if(userId)
        { 
            if(req.body.index == 'Yes' )
            {
                req.body.index = 'INDEX';
            } else {
                req.body.index = 'NOINDEX';
            }

            if(req.body.follow == 'follow' )
            {
                req.body.follow = 'FOLLOW';
            } else {
                req.body.follow = 'NOFOLLOW';
            }  

            var user = await userModel.findById(userId);
            if(user){
                var blog = new projectModel(req.body);
                var result = await blog.save();
                res.send(result);
            } else {
                res.status(401).send({ "code": 401, message: 'You are unauthorized' });
            }
            
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateproject = async function(req, res)
{
    console.log("update project action....");
    try {
        if(req.file !== undefined){
            req.body.projectimage = '';
            req.body.projectimage = req.file.filename;
        }
        
        if(req.body.index == 'Yes' )
        {
            req.body.index = 'INDEX';
        } else {
            req.body.index = 'NOINDEX';
        }

        if(req.body.follow == 'follow' )
        {
            req.body.follow = 'FOLLOW';
        } else {
            req.body.follow = 'NOFOLLOW';
        }   
        const userId  = req.params.id;
        
        const projectId  = req.params.projectid;
        
        var project = await projectModel.findById(projectId).exec();
        
        project.set(req.body);
        
        var result = await project.save();
        
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteproject = async function(req, res)
{
    console.log('Delete project Action');
    try {
        var project = await projectModel.findById(req.params.id).exec();
        //console.log(blog);
        if(project.projectimage){
            var ImgParts = project.projectimage.split('.');
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.png';
                var resized_small = ImgParts[0]+'_resized-small.png';
                var thumbnail = ImgParts[0]+'_thumbnail.png';

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+project.projectimage);
        }
        var result = await projectModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: 'You are deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};
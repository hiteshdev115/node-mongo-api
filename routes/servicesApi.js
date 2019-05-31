//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var serviceModel = require('../models/services');
var userModel = require('../models/user');


exports.getallservices = async function(req, res)
{
    console.log('all service action');
    try {
        var result = await serviceModel.find().exec();
        //console.log(result);
        if(result == '')
        {
            res.status(200).send({ message: 'Sorry, No data found!' });
        } else {
            res.status(200).send(result);
        }
        //res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertservice = async function(req, res)
{
    console.log("insert service action");
    const userId  = req.params.id;
    req.body.author = userId;
    
    //console.log(req.file.filename);
    req.body.serviceimage = '';
    if(req.file.filename){
        req.body.serviceimage = req.file.filename;
    }
    
    try {
        //console.log(user);
        
        if(userId)
        {
            var user = await userModel.findById(userId);
            
            var service = new serviceModel(req.body);
            var result = await service.save();
            console.log(result);
            //Assign cms page to author's
            user.services.push(service);
            //console.log(result);
            await user.save();

            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateservice = async function(req, res)
{
    console.log("update service action....");
    
    try {
        //console.log("update user Id ==>"+req.params.id);
        const userId  = req.params.id;
        req.body.author = userId;
                
        const serviceId  = req.params.serviceid;
        //console.log(blogId);
        var service = await serviceModel.findById(serviceId).exec();
        
        service.set(req.body);
        
        var result = await service.save();
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteservice = async function(req, res)
{
    try {
        var service = await serviceModel.findById(req.params.id).exec();
        //console.log(service);
        if(service.serviceimage){
            fs.unlinkSync(appRoot.path + "/images/"+service.serviceimage);
        }

        var result = await serviceModel.deleteOne({ _id: req.params.id }).exec();
        userModel.findByIdAndUpdate(req.params.userId,
            {$pull: {services: req.params.id}},
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

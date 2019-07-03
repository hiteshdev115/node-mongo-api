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


exports.getSingleservice = async function(req, res)
{
    console.log('single service action');
    try {
        var service = await serviceModel.findById(req.params.id).exec();
        res.send(service);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleserviceByName = async function(req, res)
{
    console.log(req.params.servicesname);
    
    try {
        var service = await serviceModel.findOne({servicesname: req.params.servicesname}).populate('author').exec();
        if(service){
            res.status(200).send(service);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getRandomservice = async function(req, res)
{
    var count = 4;
    try {
        var mysort = { created_at: -1 };
        var service = await serviceModel.find({servicesname : {$ne :req.params.servicesname}}).limit(4).sort(mysort).exec();
        if(service){
            res.status(200).send(service);
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
    console.log(id);
    try {
        var serviceData = await serviceModel.findById(id).exec();
        if(serviceData.serviceimage){
            var ImgParts = serviceData.serviceimage.split('.');
            console.log(ImgParts);
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.png';
                var resized_small = ImgParts[0]+'_resized-small.png';
                var thumbnail = ImgParts[0]+'_thumbnail.png';

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+serviceData.serviceimage);
        }

        var service = await serviceModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { serviceimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(service);
        res.status(200).send(service);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.insertservice = async function(req, res)
{
    console.log("insert service action");
    const userId  = req.params.id;
    req.body.author = userId;
    //console.log(req);
    //console.log(req.file);
    if(req.body.serviceimage !== '')
    {
        req.body.serviceimage = req.file.filename;
    }
    
    try {
        //console.log(user);
        
        if(userId)
        {
            var user = await userModel.findById(userId);
            var service = new serviceModel(req.body);
            var result = await service.save();
            //Assign service page to author's
            user.services.push(service);
            //console.log(result);
            await user.save();

            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateservice = async function(req, res)
{
    console.log("update service action....");
    
    try {
        //console.log("update user Id ==>"+req.params.id);
        if(req.file !== undefined){
            req.body.serviceimage = '';
            //console.log("update user Id ==>"+req.body.serviceimage);
            req.body.serviceimage = req.file.filename;
        }
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
            var ImgParts = service.serviceimage.split('.');
            if(ImgParts){
                var resized_big = ImgParts[0]+'_resized-big.'+ImgParts[1];
                var resized_small = ImgParts[0]+'_resized-small.'+ImgParts[1];
                var thumbnail = ImgParts[0]+'_thumbnail.'+ImgParts[1];

                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_big);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+resized_small);
                fs.unlinkSync(appRoot.path + "/client/public/images/"+thumbnail);
            }
            fs.unlinkSync(appRoot.path + "/client/public/images/"+service.serviceimage);
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

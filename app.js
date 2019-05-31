const Express = require("express");
const Mongoose = require("mongoose"); 
const BodyParser = require("body-parser");
//const MongoClient = require("mongodb").MongoClient;
Mongoose.set('useFindAndModify', false);
var app = Express();
var fs = require('fs');

Mongoose.connect("mongodb://localhost:27017/restApiDB", { useNewUrlParser: true }).then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));
Mongoose.set('useCreateIndex', true);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


var multer = require('multer'); //for upload
var path = require("path"); //for upload
var appRoot = require('app-root-path'); //for get root folder path

/*For file Upload*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appRoot.path + "/images")
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

/*var images = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, appRoot.path + "/images")
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});*/
var upload = multer({
    storage: storage
})
/*var images = multer({
  storage: images
});*/
/*End of file Upload*/




var user = require('./routes/userApi'); 
var cmspage = require('./routes/cmspageApi'); 
var blog = require('./routes/blogApi'); 
var services = require('./routes/servicesApi'); 


app.post('/api/adduser', user.insertuser); 
app.get('/api/alluser', user.getallUser);
app.get("/api/user/:id", user.getUser);
app.put("/api/updateUser/:id", user.updateUser);
app.delete("/api/deleteUser/:id", user.deleteUser);

app.post("/api/user/:id/addNewCars", user.newUserCar);
app.get('/api/car/user/:id', user.getUserCar);


app.get('/api/allcmspage', cmspage.getallpages); 
app.post('/api/:id/addcmspage', cmspage.insertpage); 
app.put('/api/:id/updatecmspage/:pageid', cmspage.updatepage); 
app.delete("/api/deletepage/:id/user/:userId", cmspage.deletepage);

app.get('/api/allblog', blog.getallblog); 
app.post('/api/:id/addblog', upload.single('blogimage'), blog.insertblog); 
app.put('/api/:id/updateblog/:blogid', blog.updateblog); 
app.delete("/api/deleteblog/:id/user/:userId", blog.deleteblog);

app.get('/api/allservices', services.getallservices); 
app.post('/api/:id/addservice', upload.single('serviceimage'), services.insertservice); 
app.put('/api/:id/updateservice/:serviceid', services.updateservice); 
app.delete("/api/deleteservice/:id/user/:userId", services.deleteservice);



/*const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});

app.post("/person", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/people", async (request, response) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response) => {
    try {
        var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});*/



app.set('port', process.env.PORT || 3001);
app.listen(3001, () => {
    console.log("Listening at :3001...");
});
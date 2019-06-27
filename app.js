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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(BodyParser.urlencoded({ extended: true }));


var multer = require('multer'); //for upload
var path = require("path"); //for upload
var appRoot = require('app-root-path'); //for get root folder path


/*For file Upload*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appRoot.path + "/client/public/images")
    },
    filename: function (req, file, callback) {
        console.log(file);
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
var login = require('./routes/login'); 
var setting = require('./routes/settingApi'); 


app.post('/api/login', login.login); 
app.post('/api/register', login.register); 

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
app.get('/api/getSingleblog/:id', blog.getSingleblog); 
//app.post('/api/:id/addblog', upload.single('blogimage'), blog.insertblog); 
app.post('/api/:id/addblog', upload.single('blogimage'), blog.insertblog); 
app.put('/api/:id/updateblog/:blogid', upload.single('blogimage'), blog.updateblog); 
app.delete("/api/deleteblog/:id/user/:userId", blog.deleteblog);
app.post("/api/removethumb/", blog.removeThumb);


app.get('/api/allservices', services.getallservices); 
app.post('/api/:id/addservice', upload.single('serviceimage'), services.insertservice); 
app.put('/api/:id/updateservice/:serviceid', services.updateservice); 
app.delete("/api/deleteservice/:id/user/:userId", services.deleteservice);

app.get('/api/getsetting', setting.getSetting); 
app.post('/api/savesetting', upload.single('logoimage'), setting.insertSetting); 
app.post('/api/updatesetting/', upload.single('logoimage'), setting.updateSetting); 
app.post("/api/removelogo/", setting.removeLogo);

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
const Express = require("express");
const Mongoose = require("mongoose"); 
const BodyParser = require("body-parser");
//const MongoClient = require("mongodb").MongoClient;

var app = Express();

Mongoose.connect("mongodb://localhost:27017/restApiDB", { useNewUrlParser: true }).then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));
Mongoose.set('useCreateIndex', true);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var user = require('./routes/userApi'); 


app.post('/api/adduser', user.insertuser); 
app.get('/api/alluser', user.getallUser);
app.get("/api/user/:id", user.getUser);
app.put("/api/updateUser/:id", user.updateUser);
app.delete("/api/deleteUser/:id", user.deleteUser);

app.post("/api/user/:id/addNewCars", user.newUserCar);
app.get('/api/car/user/:id', user.getUserCar);


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




app.listen(3000, () => {
    console.log("Listening at :3000...");
});
import express, { Express }  from "express";
import cors from 'cors';
import dotenv from 'dotenv';  
import mongoose  from "mongoose";
import { InventoryModel } from "./models/inventory";
import { UsersModel } from "./models/users";


dotenv.config();

const app: Express = express()

const port = process.env.PORT || 3000;
const clusterUrl = process.env.CLUSTER;

mongoose.set('strictQuery', false);
mongoose.connect(clusterUrl!).then(() =>{
    console.log("Connected To MongoDB");
}).catch((error) => {
    console.log(error.message);
    
})


// Middleware
app.use(cors());
app.use(express.json())

// -------------------------------------------------------------------------------------------------------



// User Routes 

app.get('/api/getuser', async (req, res ) => {
    const user = await UsersModel.find({});
    res.send(user);
});


app.post('/api/adduser', async (req, res ) => {
    const {username, name, surname, email, password} = req.body;
    const user = await UsersModel.create({username, name, surname, email, password});
    res.send(user);
});

app.put('/api/updateuser/:id', async (req, res ) => {
    const id = req.params;
    const {qty} = req.body;
    const user = await UsersModel.findByIdAndUpdate(id, {qty}, {new: true});
    res.send(user);
});


app.put('/api/deleteuser/:id', async (req, res ) => {
    const id = req.params;
    const user = await UsersModel.findByIdAndDelete(id);
    res.send(user);
});

// -------------------------------------------------------------------------------------------------------


// Item Routes 
app.get('/', (req, res ) => {
    res.send('Express + TypeScript Server');
});

app.get('/api/getinventory', async (req, res ) => {
    const inventory = await InventoryModel.find({});
    res.send(inventory);
});


app.post('/api/addinventory', async (req, res ) => {
    const {name, location, type, img, qty} = req.body;
    const inventory = await InventoryModel.create({name, location, type, img, qty});
    res.send(inventory);
});

app.put('/api/updateinventory/:id', async (req, res ) => {
    const id = req.params;
    const {qty} = req.body;
    const inventory = await InventoryModel.findByIdAndUpdate(id, {qty}, {new: true});
    res.send(inventory);
});


app.put('/api/deleteinventory/:id', async (req, res ) => {
    const id = req.params;
    const inventory = await InventoryModel.findByIdAndDelete(id);
    res.send(inventory);
});

// Server 
app.listen(port, () => {
    console.log("[server]: running on port: " + port);    
});


// -------------------------------------------------------------------------------------------------------
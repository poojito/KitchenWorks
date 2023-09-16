import express from 'express'



// import database functions
import {getItem,getItems, createItem} from "./database.js"

// initalizing express app
const app = express()
//const bodyParser = require("body-parser");
import cors from 'cors';
//  cors allows us to communiciate with the server from the backend -- requirement
app.use(express.json()) // tell the app the code below uses json
app.use(cors({
    // specifically allow requests from this address into express server -  * means all addresses ok
    origin: "*",
})) // must specify to avoid cors policy error
// create server routes

//  at the /items link: notes is the return value from the function which is sent as the response
app.get("/items", async (req, res) => {
    const notes = await getItems()
    res.send(notes)
})
// the client technically passes the id through the link 
app.get("/items/:id", async (req, res) => {
    const id = req.params.id // access the input id from the parameters list of the request
    const note = await getItem(id)
    res.send(note)
})
// sending a post request with json input through this link creates an entry in the database 
app.post('/items', async (req, res) => {
    // The client should pass in these variables when making the JSON request
    const { item, expiry_date } = req.body;

    try {
        const newitem = await createItem(item, expiry_date);
        res.status(201).send(newitem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating item');
    }
})


// async await error handling code, should work for every case
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Error")
})

 
// start running server on port

app.listen(8080, () => {
    console.log("running on port 8080")
})
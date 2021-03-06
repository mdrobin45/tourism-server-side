const { MongoClient } = require("mongodb");
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const { json } = require('express');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


// Connect mongo database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const client = new MongoClient(uri);

// Send data to database
async function insertData()
{
    try {
        await client.connect();
        const dbName = client.db('TravelRooms');
        const roomCollection = dbName.collection('Rooms');
        const orderCollection = dbName.collection('Orders');


        // POST API for rooms collection
        app.post('/rooms', async (req, res) =>
        {
            const newRoom = req.body;
            const result = await roomCollection.insertOne(newRoom);
            res.send(result);
        });
        // Get API for rooms collection
        app.get('/rooms', async (req, res) =>
        {
            const cursor = roomCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        // Get api for single room
        app.get('/rooms/:id', async (req, res) =>
        {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await roomCollection.findOne(query);
            res.send(result);
        });
        // Update Room
        app.put('/rooms/:id', async (req, res) =>
        {
            const newInfo = req.body;
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const setNewInfo = {
                $set: {
                    roomName: newInfo.roomName,
                    price: newInfo.price,
                    img: newInfo.img,
                    description: newInfo.description,
                    rating: newInfo.rating
                }
            };
            const result = await roomCollection.updateOne(query, setNewInfo);
            res.send(result);
        });
        // Delete Room
        app.delete('/rooms/:id', async (req, res) =>
        {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await roomCollection.deleteOne(filter);
            res.send(result);
        });



        // *******************************************************
        // Post api for order collection
        app.post('/my-orders/', async (req, res) =>
        {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send(result);
        });

        // Get api for order collection
        app.get('/my-orders', async (req, res) =>
        {
            const cursor = orderCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        // Delete order
        app.delete('/my-orders/:id', async (req, res) =>
        {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        });
        // Update order status
        app.put('/my-orders/:id', async (req, res) =>
        {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const replacement = {
                $set: {
                    status: 'Approved'
                }
            };
            const result = await orderCollection.updateOne(query, replacement);
            res.send('result');
        });



        // ****************************************************************
        // Get root directory
        app.get('/', (req, res) =>
        {
            res.send('Tourism server running');
        });




    } finally {

    }
    app.listen(port, () =>
    {
        console.log('node server running');
    });
}
insertData();

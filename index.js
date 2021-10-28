const { MongoClient } = require("mongodb");
const express = require('express');
const cors = require('cors');
const { json } = require('express');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


// Connect mongo database
// const uri=....
const client = new MongoClient(uri);

// Send data to database
async function insertData()
{
    try {
        await client.connect();
        const dbName = client.db('dbName');
        const dbCollection = dbName.collection('MyCollection');

        // POST API
        app.post('', async);
    } finally {

    }
}
insertData();
app.get('/', (req, res) =>
{
    res.send('Server running');
});
app.listen(port, () =>
{
    console.log('node server running');
});
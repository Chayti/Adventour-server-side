require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iea9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // await client.connect();
        const database = client.db("adventour");
        const servicesCollection = database.collection("services");
        const bookingCollection = database.collection("booking");

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        // POST API
        app.post('/addService', async (req, res) => {
            const service = req.body
            const result = await servicesCollection.insertOne(service)
            res.json(result)
        })

        // GET all bookings of an user API
        app.get('/myServices/:email', async (req, res) => {
            // const id = req.params.bookingId
            const query = { email: req.params.email }
            const service = await bookingCollection.find(query).toArray()
            res.send(service)
        })

        // GET Single Service API
        app.get('/services/:serviceId', async (req, res) => {
            const id = req.params.serviceId
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            console.log(service)
            res.send(service)
        })

        // // DELETE API
        // app.delete('/services/:serviceId', async (req, res) => {
        //     console.log(req.params.serviceId)
        //     const id = req.params.serviceId
        //     const query = { _id: ObjectId(id) }
        //     const result = await servicesCollection.deleteOne(query)
        //     res.send(result)
        // })

        // Add Orders API
        app.post('/booking', async (req, res) => {
            const booking = req.body
            const result = await bookingCollection.insertOne(booking)
            res.json(result)
        })

        // GET all bookings API
        app.get('/booking', async (req, res) => {
            const cursor = bookingCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        //update status api
        app.put('/booking/:id', async (req, res) => {
            const id = req.params.id;
            console.log('update', id)
            const data = req.body;
            console.log(data);
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: "approved"
                }
            }
            console.log(updateDoc)
            const result = await bookingCollection.updateOne(query, updateDoc, options);
            console.log(result)
            res.json(result)
        })

        // Delete single booking
        app.delete('/booking/:bookingId', async (req, res) => {
            console.log(req.params.bookingId)
            const id = req.params.bookingId
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server connected')
})

app.listen(port, () => {
    console.log("listening port: ", port)
})

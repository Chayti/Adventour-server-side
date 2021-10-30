require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iea9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("carMechanic");
//         const servicesCollection = database.collection("services");

//         // GET API
//         app.get('/services', async (req, res) => {
//             const cursor = servicesCollection.find({})
//             const services = await cursor.toArray()
//             res.send(services)
//         })

//         // GET Single Service API
//         app.get('/services/:serviceId', async (req, res) => {
//             const id = req.params.serviceId
//             console.log(id)
//             const query = { _id: ObjectId(id) }
//             const service = await servicesCollection.findOne(query)
//             res.send(service)
//         })

//         // POST API
//         app.post('/services', async (req, res) => {
//             const service = req.body
//             const result = await servicesCollection.insertOne(service)
//             console.log(result)
//             res.json(result)
//         })

//         // UPDATE API
//         app.put('/services/:serviceId', async (req, res) => {
//             const id = req.params.serviceId
//             const updatedService = req.body
//             const filter = { _id: ObjectId(id) }
//             const options = { upsert: true }
//             const updateDoc = {
//                 $set: {
//                     name: updatedService.name,
//                     description: updatedService.description,
//                     price: updatedService.price,
//                     img: updatedService.img
//                 },
//             };
//             const result = await servicesCollection.updateOne(filter, updateDoc, options)
//             console.log('updating service', id)
//             res.send(result)
//         })

//         // DELETE API
//         app.delete('/services/:serviceId', async (req, res) => {
//             const id = req.params.serviceId
//             const query = { _id: ObjectId(id) }
//             const result = await servicesCollection.deleteOne(query)
//             res.send(result)
//         })

//     }
//     finally {

//     }
// }
// run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server connected')
})

app.listen(port, () => {
    console.log("listening port: ", port)
})

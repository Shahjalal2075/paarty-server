const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('UserName: ', process.env.DB_USER);
console.log('Password: ', process.env.DB_PASS);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6b6iw5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const database = client.db("paartyDB");
    const users = database.collection("users");
    const programs = database.collection("programs");

    app.get('/program', async (req, res) => {
      const cursor = programs.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/program/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category: category }
      const product = await programs.find(query).toArray();
      res.send(product);
    })

    /* app.get('/user-list', async (req, res) => {
      const cursor = users.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.post('/user-list', async (req, res) => {
      const user = req.body;
      console.log('User Add', user);
      const result = await users.insertOne(user);
      res.send(result);
    })
    app.get('/user-list/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const product = await users.findOne(query);
      res.send(product);
    })
    app.patch('/user-list/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const updateUser = req.body;
      console.log(query);
      const updateDoc = {
        $set: {
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          email: updateUser.email,
          ahrpaNumber: updateUser.ahrpaNumber,
          medicalProviderNumber: updateUser.medicalProviderNumber,
          oaaNumber: updateUser.oaaNumber,
          pharmacyRegisterNumber: updateUser.pharmacyRegisterNumber,
          profileComplete: updateUser.profileComplete
        }
      }
      const result = await users.updateOne(query, updateDoc);
      res.send(result);
    })
    app.patch('/profile-edit/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const updateUser = req.body;
      console.log(query);
      const updateDoc = {
        $set: {
          firstName: updateUser.firstNameS,
          lastName: updateUser.lastNameS,
          phoneNumber: updateUser.phoneNumberS,
          profession: updateUser.professionS,
          professionQualification: updateUser.professionQualification,
          businessQualification: updateUser.businessQualification
        }
      }
      const result = await users.updateOne(query, updateDoc);
      res.send(result);
    })

    app.get('/job-post', async (req, res) => {
      const cursor = jobs.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/job-post/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const product = await jobs.findOne(query);
      res.send(product);
    })
    app.post('/job-post', async (req, res) => {
      const job = req.body;
      console.log('Job Add', job);
      const result = await jobs.insertOne(job);
      res.send(result);
    })
    app.get('/jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const product = await jobs.find(query).toArray();
      res.send(product);
    })

    app.get('/applied-job', async (req, res) => {
      const cursor = appliedJobs.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/applied-job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const product = await appliedJobs.findOne(query);
      res.send(product);
    })
    app.patch('/applied-job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const updateUser = req.body;
      console.log(query);
      const updateDoc = {
        $set: {
          jobStatus: updateUser.jobStatus
        }
      }
      const result = await appliedJobs.updateOne(query, updateDoc);
      res.send(result);
    })

    app.get('/my-jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = { locumEmail: email }
      const product = await appliedJobs.find(query).toArray();
      res.send(product);
    })
    app.get('/applied/:id', async (req, res) => {
      const id = req.params.id;
      const query = { oldId: id }
      const product = await appliedJobs.find(query).toArray();
      res.send(product);
    })
    app.post('/applied-job', async (req, res) => {
      const job = req.body;
      console.log('Job Add', job);
      const result = await appliedJobs.insertOne(job);
      res.send(result);
    })
    app.get('/bank-info', async (req, res) => {
      const cursor = bankInfo.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/bank-info/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const product = await bankInfo.findOne(query);
      res.send(product);
    })
    app.post('/bank-info', async (req, res) => {
      const job = req.body;
      console.log('Job Add', job);
      const result = await bankInfo.insertOne(job);
      res.send(result);
    })
    app.patch('/bank-info/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const updateUser = req.body;
      console.log(query);
      const updateDoc = {
        $set: {
          accountName: updateUser.accountName,
          bsb: updateUser.bsb,
          accountNumber: updateUser.accountNumber
        }
      }
      const result = await bankInfo.updateOne(query, updateDoc);
      res.send(result);
    })
    app.get('/notification', async (req, res) => {
      const cursor = allNotification.find()
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/notification/:email', async (req, res) => {
      const email = req.params.email;
      const query = { to: email }
      const product = await allNotification.find(query).toArray();
      res.send(product);
    })
    app.post('/notification', async (req, res) => {
      const user = req.body;
      console.log('User Add', user);
      const result = await allNotification.insertOne(user);
      res.send(result);
    }) */

  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("PAARTY Server Running.");
})

app.listen(port, () => {
  console.log(`Ser running port: ${port}`);
}) 
const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

// MongoDB connection URI and database details
const mongoURI = "mongodb+srv://joshstew:stewart@cluster0.7ppq9.mongodb.net/" // mongoDB api
const dbName = "dino"
const collectionName = "dino_collection" 

// CORS
app.use(cors())

// Show static portfolio website
app.use(express.static('public'))

// API route
app.get('/api', async (req, res) => {
    const client = new MongoClient(mongoURI)

    try {
        await client.connect()
        const database = client.db(dbName)
        const collection = database.collection(collectionName)

        const data = await collection.find({}).toArray()

        res.set('Access-Control-Allow-Origin', '*')
        res.json(data)
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err)
        res.status(500).send('Error fetching data from database')
    } finally {
        await client.close()
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

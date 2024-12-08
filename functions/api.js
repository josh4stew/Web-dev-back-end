const { MongoClient} = require('mongodb')

const uri = "mongodb+srv://joshstew:stewart@cluster0.7ppq9.mongodb.net/" // mongoDB api
const client = new MongoClient(uri)

exports.handler = async (event, context) => {
    try {
        await client.connect()
        const database = client.db('dino')
        const collection = database.collection('dino_collection')
        
        const data = await collection.find({}).toArray()

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify(data)
        }
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        }
    } finally {
        await client.close()
    }
}

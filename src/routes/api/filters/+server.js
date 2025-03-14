import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } from '$env/static/private';

let client;

async function initConnection() {
    if (!client) {
        // Check if environment variables are defined
        if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_CLUSTER) {
            console.error('MongoDB environment variables are not defined');
            throw new Error('MongoDB configuration is incomplete');
        }
        
        const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}`;
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

export async function GET() {
    const client = await initConnection();
    const db = client.db('dam-dash');
    const collection = db.collection('reports');

    const reportDates = await collection.distinct('report_date');
    const provinces = await collection.distinct('province');

    return json({
        reportDates: reportDates.sort((a, b) => b - a).map(d => d.toISOString()),
        provinces: provinces.sort()
    });
}
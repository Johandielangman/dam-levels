import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } from '$env/static/private';

let client;

async function initConnection() {
    if (!client) {
        try {
            // Check if environment variables are defined
            if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_CLUSTER) {
                console.error('MongoDB environment variables are not defined');
                throw new Error('MongoDB configuration is incomplete');
            }
            
            const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}`;
            client = new MongoClient(uri);
            await client.connect();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }
    return client;
}

export async function GET({ url }) {
    try {
        const reportDate = url.searchParams.get('reportDate') || 'All';
        const province = url.searchParams.get('province') || 'All';

        const client = await initConnection();
        const db = client.db('dam-dash');
        const collection = db.collection('reports');

        let query = {};
        if (reportDate !== 'All') query.report_date = new Date(reportDate);
        if (province !== 'All') query.province = province;

        const projection = {
            dam: 1,
            province: 1,
            river: 1,
            full_storage_capacity: 1,
            this_week: 1,
            lat_long: 1,
            last_week: 1,
            _id: 0
        };

        const items = await collection.find(query, { projection }).toArray();

        // Process data
        const data = items.map(item => {
            const change = item.this_week > item.last_week
                ? `🔼 ${(item.this_week - item.last_week).toFixed(1)}%`
                : item.this_week < item.last_week
                ? `🔻 ${(item.last_week - item.this_week).toFixed(1)}%`
                : '◼ 0%';
            return {
                ...item,
                full_storage_capacity: item.full_storage_capacity / 1e6,
                Change: change,
                last_week: undefined // Remove last_week
            };
        });

        return json(data);
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import clientPromise from '@/lib/mongodb';



// Handle GET method to fetch all clicks
export async function GET(request: Request) {
    try {
      const client = await clientPromise;
      const db = client.db('Advertisement');
      const collection = db.collection('clicks');
  
      // Fetch all records from the collection (without any filters)
      const clicks = await collection.find({}).toArray();
  
      return NextResponse.json(clicks, { status: 200 });
    } catch (error) {
      console.error('Error fetching clicks:', error);
      return NextResponse.json({ error: 'Failed to fetch clicks' }, { status: 500 });
    }
  }
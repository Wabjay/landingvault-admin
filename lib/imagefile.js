import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import sharp from 'sharp';
import express from 'express';

// Initialize Firebase Admin SDK
initializeApp();

// Create an Express app to handle image optimization requests
const app = express();

// Endpoint to serve optimized images
app.get('/optimized-image', async (req, res) => {
  const { filePath, width, height, quality } = req.query;

  if (!filePath) {
    return res.status(400).send('File path is required');
  }

  try {
    const bucket = getStorage().bucket(); // Get the default Firebase Storage bucket
    const file = bucket.file(filePath); // Reference the file in Firebase Storage

    // Download the file to a buffer
    const [fileBuffer] = await file.download();

    // Resize and optimize the image using Sharp
    const optimizedImage = await sharp(fileBuffer)
      .resize(Number(width) || undefined, Number(height) || undefined) // Resize if width/height is provided
      .jpeg({ quality: Number(quality) || 80 }) // Set JPEG quality (default: 80)
      .toBuffer();

    // Set the response content type to Different image type
    res.type('jpeg', 'png', 'webp', 'avif');

    // Send the optimized image as a response
    res.send(optimizedImage);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

// Export the Express app as a Firebase Cloud Function
export const optimizedImage = functions.https.onRequest(app);
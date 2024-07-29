import React, { useState } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const ImageUpload = ({ onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Replace these with your actual keys and endpoint
  const ACCESS_KEY = 'DO00RNPBZ3V7DE6YFQ2C';
  const SECRET_KEY = 'tFCNPM6Y6DuR98I8RRMg+iktBRotrXOxAEEfO52zTXs';
  const BUCKET_NAME = 'content-wcrow';
  const REGION = 'fra1';
  const SPACES_ENDPOINT = 'https://fra1.digitaloceanspaces.com';

  const s3Client = new S3Client({
    endpoint: SPACES_ENDPOINT,
    forcePathStyle: false,
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    }
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      Metadata: {
        "x-amz-meta-my-key": "your-value",
      }
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      const fileUrl = `${SPACES_ENDPOINT}/${BUCKET_NAME}/${file.name}`;
      setMessage(`Upload successful! File URL: ${fileUrl}`);
      onImageUpload({ url: fileUrl }); // Pass URL to parent component
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessage(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;

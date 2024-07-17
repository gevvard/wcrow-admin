import React, { useState } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Replace these with your actual keys and endpoint
  const ACCESS_KEY = 'DO00X39VMAUFJUDVWPHD';
  const SECRET_KEY = '83kHctU7z/M+v/eGcyJuMeeR4QH64mhD+cUA8E71Qz0'; // Replace with your actual secret key
  const BUCKET_NAME = 'content-wcrow';
  const REGION = 'fra1';
  const SPACES_ENDPOINT = 'https://fra1.digitaloceanspaces.com';

  // Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
  const s3Client = new S3Client({
    endpoint: SPACES_ENDPOINT,
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
    credentials: {
      accessKeyId: ACCESS_KEY, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: SECRET_KEY // Secret access key defined through an environment variable.
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
      Bucket: BUCKET_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
      Key: file.name, // Object key, referenced whenever you want to access this file later.
      Body: file, // The object's contents.
      ACL: 'public-read', // Defines ACL permissions, such as private or public.
      Metadata: {
        "x-amz-meta-my-key": "your-value" // Defines metadata tags.
      }
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      setMessage(`Upload successful! File URL: ${data.Location}`);
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

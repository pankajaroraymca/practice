"use client"
import Image from "next/image";
import React, { useState } from 'react';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

export default function Home() {

  const createEventSource = (url, headers) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    // Set headers
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 2 && xhr.status === 200) {
        const eventSource = new EventSource(url);
        eventSource.onmessage = (event) => {
          console.log('New message:', event.data);
        };

        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
          eventSource.close();
        };
      }
    };

    xhr.send();
  };

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [serverMessage, setServerMessage] = useState('');
  const CHUNK_SIZE = 1 * 1024 * 1024; // 5MB per chunk

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadProgress(0);
  };

  const uploadFileChunks = async () => {
    if (!file) return;

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = `${Date.now()}-${file.name}`; // Unique file identifier

    // listenToServerEvents(fileId);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('file_type', 'PLAN');
      formData.append('scenario_id', "67fce29fb8b48b4f893aff72");


      try {
        await axios.post('http://localhost:8001/launch-nav/api/file/upload/67fccac388f4a383df0376dc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMwOSwidXNlcklkIjozNzAsImVtYWlsIjoiZXh0LWJoYXJhdC5zYXJkYUBpbml6aW9hZHZpc29yeS5vbm1pY3Jvc29mdC5jb20iLCJuYW1lIjoiYmhhcmF0IHNhcmRhIiwidXNlcl9pZCI6IjQzODZkNWM1LTQ0MjAtNDgzZS04NmNjLTQwMjAwOTU0MDQyOSIsImlhdCI6MTczNjIzNDI0MywiZXhwIjoxNzQ2MjM0MjQzfQ.o5YF_XqfaxsB3lAIenjHcfWDpZtBO6G9rHy_syTs3mM',
            'actual-file-name': 'this is file',
            'file-name': fileId,
            "file-size": "2",
            "chunk-index": chunkIndex.toString(),
            'total-chunks': totalChunks.toString(),
            'number': "0"
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              ((chunkIndex + progressEvent.loaded / progressEvent.total) / totalChunks) * 100
            );
            setUploadProgress(progress);
          },
        });
      } catch (error) {
        console.error('Chunk upload failed:', error);
        setServerMessage('Error uploading file.');
        return;
      }
    }

    setServerMessage('File uploaded successfully. Waiting for processing...');

  };

  const listenToServerEvents = (userId) => {

    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNzUxZDliNi02OGVmLTQzNzgtODdlZi1iMWJmM2Y0NzZjNTkiLCJuYW1lIjoiR3Vlc3QgVXNlciIsImVtYWlsIjoicGFua2FqQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0MjYzODg0OSwiZXhwIjoxNzQyNjgyMDQ5fQ.xaxj9ZROkYcJ2a1GbmTbptUgNMZqZlSzz8-sxtCOs6Y'
    };

    const eventSource = new EventSource(`http://localhost:7000/v1/api/event/${userId}`, { withCredentials: true });

    eventSource.onmessage = (event) => {
      console.log("message received finally");

      const data = JSON.parse(event.data);
      if (data) {
        setServerMessage('File processed successfully!');
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setServerMessage('Error receiving updates.');
      eventSource.close();
    };
  };

  const handleConnection = async () => {
    listenToServerEvents('4386d5c5-4420-483e-86cc-402009540429');
  }

  const handleConnection2 = async () => {
    const userId = "4386d5c5-4420-483e-86cc-402009540429"
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMwOSwidXNlcklkIjozNzAsImVtYWlsIjoiZXh0LWJoYXJhdC5zYXJkYUBpbml6aW9hZHZpc29yeS5vbm1pY3Jvc29mdC5jb20iLCJuYW1lIjoiYmhhcmF0IHNhcmRhIiwidXNlcl9pZCI6IjQzODZkNWM1LTQ0MjAtNDgzZS04NmNjLTQwMjAwOTU0MDQyOSIsImlhdCI6MTczNjIzNDI0MywiZXhwIjoxNzQ2MjM0MjQzfQ.o5YF_XqfaxsB3lAIenjHcfWDpZtBO6G9rHy_syTs3mM'
    };

    createEventSource(`http://localhost:8000/clarity-nav/api/event/${userId}`, headers);
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/launch-nav/api/file/public/download/6878f7b46ca57411060f2c08`, // Replace with your actual API route
        {
          responseType: 'arraybuffer',
          headers: {
            
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE3NTEsInVzZXJJZCI6Mzc3LCJlbWFpbCI6ImV4dC12aWthcy5yYW5hQGluaXppb2Fkdmlzb3J5Lm9ubWljcm9zb2Z0LmNvbSIsIm5hbWUiOiJWaWthcyBSYW5hIiwidXNlcl9pZCI6IjM5NjdiNTNmLTVjMWQtNGNjNC1iOTQzLWRkMzZkNWY4YWNkNCIsImFwcHMiOnsiYXB0Ijp0cnVlLCJpcHQiOnRydWUsInZvYyI6dHJ1ZSwicXVhbnQiOnRydWUsImxhdW5jaF9uYXYiOnRydWV9LCJpYXQiOjE3NTI4MzUxNDgsImV4cCI6MTc1MjgzNjA0OH0.CSrpD8n3ygwjipUj7UKFBJ13LM7NEXCAeRWVH4hK_6Q',
          },
        }
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Optional: Get filename from response headers if your backend sends it
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'Launch_Plan.xlsx';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) {
          fileName = match[1];
        }
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Chunked File Upload</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFileChunks} disabled={!file}>
            Upload File
          </button>
          <button onClick={handleConnection}>
            Create Connection
          </button>
          <button onClick={handleConnection2}>
            Create Connection 2
          </button>
          <button onClick={handleDownload} className="btn btn-primary">
            Download Excel
          </button>
          <div style={{ margin: '20px 0' }}>
            <progress value={uploadProgress} max="100" style={{ width: '100%' }} />
            <p>{uploadProgress}%</p>
          </div>
          <p>{serverMessage}</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

import { kafka } from './client';

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  console.log('Producer connected');

  await producer.send({
    topic: 'file-upload',
    messages: [
      {
        value: JSON.stringify({
          fileId: '12345',
          fileName: 'profile-picture.jpg',
          status: 'uploaded',
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });

  console.log('Messages sent successfully');

  await producer.disconnect();
  console.log('Producer disconnected');
};

run().catch(console.error);
